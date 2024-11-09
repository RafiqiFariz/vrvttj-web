<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { DocumentData } from 'firebase/firestore'
import { deleteUser, fetchUserList } from '@/service/api/system'
import * as _ from 'lodash'

// Pagination controls
const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getUserList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getUserList()
  },
})

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const initialModel = {
  condition_1: '',
  condition_2: '',
  condition_3: '',
}

const model = ref({ ...initialModel })

const formRef = ref<FormInst | null>()

const columns: DataTableColumns<Entity.User> = [
  {
    title: 'Nama',
    align: 'center',
    key: 'name',
  },
  {
    title: 'Jenis Kelamin',
    align: 'center',
    key: 'gender',
    render: (row) => {
      const tagType = {
        0: 'primary',
        1: 'success',
      } as const
      return (
        <NTag type={tagType[(row?.gender ?? 0) as 0 | 1]}>
          {row.gender ? 'Wanita' : 'Pria'}
        </NTag>
      )
    },
  },
  {
    title: 'Email',
    align: 'center',
    key: 'email',
  },
  {
    title: 'No. Telp',
    align: 'center',
    key: 'phone',
  },
  {
    title: 'Peran',
    align: 'center',
    key: 'role.name',
    render: (row) => {
      return _.startCase(row.role?.name!)
    },
  },
  {
    title: 'Alamat',
    align: 'center',
    key: 'address',
    render: (row) => {
      return row.address ?? '-'
    },
  },
  {
    title: 'Aksi',
    align: 'center',
    key: 'actions',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => handleEditTable(row)}
          >
            Edit
          </NButton>
          {row.role?.id != '1' && (
            <NPopconfirm onPositiveClick={() => {
              deleteUser(row.id!).then((res) => {
                window.$message.success(res.data.message)
                getUserList()
              })
            }}>
              {{
                default: () => 'Yakin ingin menghapus?',
                trigger: () => <NButton size="small">Hapus</NButton>,
              }}
            </NPopconfirm>
          )}
        </NSpace>
      )
    },
  },
]

const listData = ref<DocumentData[]>([])

onMounted(() => {
  getUserList()
})

async function getUserList() {
  startLoading()

  const response: any = await fetchUserList({ pageSize: pagination.pageSize })

  if (response.data.length > 0) {
    listData.value = response.data
  } else {
    listData.value = []
  }

  endLoading()
}

function handleResetSearch() {
  model.value = { ...initialModel }
}

type ModalType = 'add' | 'edit'
const modalType = ref<ModalType>('add')
function setModalType(type: ModalType) {
  modalType.value = type
}

const editData = ref<Entity.User | null>(null)
function setEditData(data: Entity.User | null) {
  editData.value = data
}

function handleEditTable(row: Entity.User) {
  setEditData(row)
  setModalType('edit')
  openModal()
}

function handleAddTable() {
  openModal()
  setModalType('add')
}
</script>

<template>
  <NSpace vertical size="large">
    <n-card>
      <n-form ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
        <n-flex>
          <n-form-item label="Nama" path="condition_1">
            <n-input v-model:value="model.condition_1" placeholder="Masukkan nama" />
          </n-form-item>
          <n-form-item label="Email" path="condition_2">
            <n-input v-model:value="model.condition_2" placeholder="Masukkan email" />
          </n-form-item>
          <n-form-item label="No. Telp" path="condition_3">
            <n-input v-model:value="model.condition_3" placeholder="Masukkan nomor telepon" />
          </n-form-item>
          <n-flex class="ml-auto">
            <NButton type="primary" @click="getUserList">
              <template #icon>
                <icon-park-outline-search />
              </template>
              Cari
            </NButton>
            <NButton strong secondary @click="handleResetSearch">
              <template #icon>
                <icon-park-outline-redo />
              </template>
              Reset
            </NButton>
          </n-flex>
        </n-flex>
      </n-form>
    </n-card>
    <n-card>
      <NSpace vertical size="large">
        <div class="flex gap-4">
          <NButton type="primary" @click="handleAddTable">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            Tambah
          </NButton>
          <NButton strong secondary>
            <template #icon>
              <icon-park-outline-afferent />
            </template>
            Impor Batch
          </NButton>
          <NButton strong secondary class="ml-a">
            <template #icon>
              <icon-park-outline-download />
            </template>
            Download
          </NButton>
        </div>
        <n-data-table :columns="columns" :data="listData" :loading="loading" :pagination="pagination" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData" @updateSuccess="getUserList" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import { Gender } from '@/constants'
import { useBoolean } from '@/hooks'
import { fetchUserList } from '@/service'
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui'
import TableModal from './components/TableModal.vue'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const initialModel = {
  condition_1: '',
  condition_2: '',
  condition_3: '',
}
const model = ref({ ...initialModel })

const formRef = ref<FormInst | null>()
function sendMail(id?: number) {
  window.$message.success(`Hapus pengguna id :${id}`)
}
const columns: DataTableColumns<Entity.User> = [
  {
    title: 'ID',
    align: 'center',
    key: 'id',
  },
  {
    title: 'Nama',
    align: 'center',
    key: 'userName',
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
      if (row.gender) {
        // return (
        //   <NTag type={tagType[row.gender]}>
        //     {Gender[row.gender]}
        //   </NTag>
        // )
      }
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
    key: 'tel',
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
          <NPopconfirm onPositiveClick={() => sendMail(row.id)}>
            {{
              default: () => 'Yakin ingin menghapus?',
              trigger: () => <NButton size="small">Hapus</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

const listData = ref<Entity.User[]>([])
// function handleUpdateDisabled(value: 0 | 1, id: number) {
//   const index = listData.value.findIndex(item => item.id === id)
//   if (index > -1)
//     listData.value[index].status = value
// }

onMounted(() => {
  getUserList()
})
async function getUserList() {
  startLoading()
  await fetchUserList().then((res: any) => {
    listData.value = res.data.list
    endLoading()
  })
}
function changePage(page: number, size: number) {
  window.$message.success(`paginator:${page},${size}`)
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
        <n-data-table :columns="columns" :data="listData" :loading="loading" />
        <Pagination :count="100" @change="changePage" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

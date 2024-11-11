<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NPopconfirm, NSpace } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { useDanceStore } from '@/store/dance'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const API_URL = import.meta.env.VITE_API_URL
const danceStore = useDanceStore()
const { dances } = storeToRefs(danceStore)

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getDanceList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getDanceList()
  },
})

const initialModel = {
  condition_1: '',
  condition_2: '',
  condition_3: '',
}
const model = ref({ ...initialModel })

const formRef = ref<FormInst | null>()
const columns: DataTableColumns<Entity.Dance> = [
  {
    title: 'ID',
    align: 'left',
    key: 'id',
  },
  {
    title: 'Nama',
    align: 'center',
    key: 'name',
  },
  {
    title: 'Gambar',
    align: 'center',
    key: 'picture',
    render: (row) => {
      return (<>
        {
          row.picture ?
            <n-image width="50" src={`${API_URL}/storage/${row.picture}`}
            /> : '-'
        }
      </>)
    },
  },
  {
    title: 'Deskripsi',
    align: 'center',
    key: 'description',
    ellipsis: true,
    render: (row) => row.description ?? '-',
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
          <NPopconfirm onPositiveClick={async () => {
            const res = await danceStore.destroy(row.id!)
            window.$message.success(res?.data.message)
            getDanceList()
          }}>
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

onMounted(() => {
  getDanceList()
})

const getDanceList = async () => {
  startLoading()
  await danceStore.all({ page: pagination.page, pageSize: pagination.pageSize })
  endLoading()
}

const handleResetSearch = () => {
  model.value = { ...initialModel }
}

type ModalType = 'add' | 'edit'
const modalType = ref<ModalType>('add')
const setModalType = (type: ModalType) => {
  modalType.value = type
}

const editData = ref<Entity.Dance | null>(null)
const setEditData = (data: Entity.Dance | null) => {
  editData.value = data
}

const handleEditTable = (row: Entity.Dance) => {
  setEditData(row)
  setModalType('edit')
  openModal()
}
const handleAddTable = () => {
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
          <n-flex class="ml-auto">
            <NButton type="primary" @click="getDanceList">
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
        <n-data-table :columns="columns" :data="dances" :loading="loading" :pagination="pagination" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData" @fetch-data="getDanceList"/>
      </NSpace>
    </n-card>
  </NSpace>
</template>

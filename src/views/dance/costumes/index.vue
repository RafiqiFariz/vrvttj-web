<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NPopconfirm, NSpace } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { useDanceCostumeStore } from '@/store/dance-costume';

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const API_URL = import.meta.env.VITE_API_URL
const danceCostumeStore = useDanceCostumeStore()
const { danceCostumes } = storeToRefs(danceCostumeStore)

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getDanceCostumeList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getDanceCostumeList()
  },
})

// const initialModel = {
//   condition_1: '',
//   condition_2: '',
//   condition_3: '',
// }
// const model = ref({ ...initialModel })

// const formRef = ref<FormInst | null>()

const columns: DataTableColumns<Entity.DanceCostume> = [
  {
    title: 'ID',
    align: 'left',
    key: 'id',
    render: (_, rowIndex) => {
      return (pagination.page - 1) * pagination.pageSize + rowIndex + 1;
    },
  },
  {
    title: 'Nama',
    align: 'center',
    key: 'name',
  },
  {
    title: 'Nama Tarian',
    align: 'center',
    key: 'dance.name',
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
    title: 'Path Asset',
    align: 'center',
    key: 'asset_path',
  },
  {
    title: 'Deskripsi',
    align: 'center',
    key: 'description',
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
            const res = await danceCostumeStore.destroy(row.id!)
            window.$message.success(res?.data.message)
            getDanceCostumeList()
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
  getDanceCostumeList()
  console.log(danceCostumes.value, 'danceCostumes')
})

const getDanceCostumeList = async () => {
  startLoading()
  await danceCostumeStore.all({ page: pagination.page, pageSize: pagination.pageSize })
  endLoading()
}

// const handleResetSearch = () => {
//   model.value = { ...initialModel }
// }

type ModalType = 'add' | 'edit'
const modalType = ref<ModalType>('add')
const setModalType = (type: ModalType) => {
  modalType.value = type
}

const editData = ref<Entity.DanceCostume | null>(null)
const setEditData = (data: Entity.DanceCostume | null) => {
  editData.value = data
}

const handleEditTable = (row: Entity.DanceCostume) => {
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
    <!-- <n-card>
      <n-form ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
        <n-flex>
          <n-form-item label="Nama" path="condition_1">
            <n-input v-model:value="model.condition_1" placeholder="Masukkan nama" />
          </n-form-item>
          <n-flex class="ml-auto">
            <NButton type="primary" @click="getDanceCostumeList">
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
    </n-card> -->
    <n-card>
      <NSpace vertical size="large">
        <div class="flex gap-4">
          <NButton type="primary" @click="handleAddTable">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            Tambah
          </NButton>
          <!-- <NButton strong secondary>
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
          </NButton> -->
        </div>
        <n-data-table :columns="columns" :data="danceCostumes" :loading="loading" :pagination="pagination" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData"
          @fetch-data="getDanceCostumeList" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

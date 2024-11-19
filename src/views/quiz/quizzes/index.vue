<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NPopconfirm, NSpace } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { useQuizStore } from '@/store/quiz'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const quizStore = useQuizStore()
const { quizzes } = storeToRefs(quizStore)

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getQuizList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getQuizList()
  },
})

const columns: DataTableColumns<Entity.Quiz> = [
  {
    title: 'ID',
    align: 'center',
    key: 'id',
  },
  {
    title: 'Judul',
    align: 'center',
    key: 'title',
  },
  {
    title: 'Deskripsi',
    align: 'center',
    key: 'description',
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
            const res = await quizStore.destroy(row.id!)
            window.$message.success(res?.data.message)
            getQuizList()
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
  getQuizList()
})

const getQuizList = async () => {
  startLoading()
  await quizStore.all({ page: pagination.page, pageSize: pagination.pageSize })
  endLoading()
}

type ModalType = 'add' | 'edit'
const modalType = ref<ModalType>('add')
const setModalType = (type: ModalType) => {
  modalType.value = type
}

const editData = ref<Entity.Quiz | null>(null)
const setEditData = (data: Entity.Quiz | null) => {
  editData.value = data
}

const handleEditTable = (row: Entity.Quiz) => {
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
        <n-data-table :columns="columns" :data="quizzes" :loading="loading" :pagination="pagination" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData" @fetch-data="getQuizList" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

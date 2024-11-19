<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { useQuizOptionStore } from '@/store/quiz_option';

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const quizOptionStore = useQuizOptionStore()
const { quizOptions } = storeToRefs(quizOptionStore)

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getQuizOptionList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getQuizOptionList()
  },
})

const columns: DataTableColumns<Entity.QuizOption> = [
  {
    title: 'ID',
    align: 'center',
    key: 'id',
  },
  {
    title: 'Pertanyaan',
    align: 'center',
    key: 'quiz_question.question',
  },
  {
    title: 'Jawaban',
    align: 'center',
    key: 'answer',
    ellipsis: true,
  },
  {
    title: 'Status Kebenaran',
    align: 'center',
    key: 'is_correct',
    render: (row) => {
      return (
        <NTag type={row.is_correct ? 'success' : 'error'}>
          {row.is_correct ? 'Benar' : 'Salah'}
        </NTag>
      )
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
          <NPopconfirm onPositiveClick={async () => {
            const res = await quizOptionStore.destroy(row.id!)
            window.$message.success(res?.data.message)
            getQuizOptionList()
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
  getQuizOptionList()
})

const getQuizOptionList = async () => {
  startLoading()
  await quizOptionStore.all({
    page: pagination.page, includeQuizQuestion: true,
    pageSize: pagination.pageSize
  })
  endLoading()
}

type ModalType = 'add' | 'edit'
const modalType = ref<ModalType>('add')
const setModalType = (type: ModalType) => {
  modalType.value = type
}

const editData = ref<Entity.QuizOption | null>(null)
const setEditData = (data: Entity.QuizOption | null) => {
  editData.value = data
}

const handleEditTable = (row: Entity.QuizOption) => {
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
        <n-data-table :columns="columns" :data="quizOptions" :loading="loading" :pagination="pagination" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData"
          @fetch-data="getQuizOptionList" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

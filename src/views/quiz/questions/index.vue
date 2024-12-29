<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NPopconfirm, NSpace } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { useQuizQuestionStore } from '@/store/quiz_question'
import { useQuizStore } from '@/store/quiz'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const quizStore = useQuizStore()
const quizQuestionStore = useQuizQuestionStore()
// const { quizzesOptions } = storeToRefs(quizStore)
const { quizQuestions } = storeToRefs(quizQuestionStore)

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getQuizQuestionList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getQuizQuestionList()
  },
})

// const initialModel = {
//   condition_1: 1,
//   condition_2: '',
// }
// const model = ref({ ...initialModel })

// const formRef = ref<FormInst | null>()

const columns: DataTableColumns<Entity.QuizQuestion> = [
  {
    title: 'ID',
    align: 'center',
    key: 'id',
    render: (_, rowIndex) => {
      return (pagination.page - 1) * pagination.pageSize + rowIndex + 1;
    },
  },
  {
    title: 'Judul Quiz',
    align: 'center',
    key: 'quiz.title',
  },
  {
    title: 'Pertanyaan',
    align: 'center',
    key: 'question',
  },
  {
    title: 'Bobot',
    align: 'center',
    key: 'weight',
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
            const res = await quizQuestionStore.destroy(row.id!)
            window.$message.success(res?.data.message)
            getQuizQuestionList()
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
  quizStore.all({ paginate: false })
  getQuizQuestionList()
})

const getQuizQuestionList = async () => {
  startLoading()
  await quizQuestionStore.all({ page: pagination.page, includeQuiz: true, includeOptions: true, pageSize: pagination.pageSize })
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

const editData = ref<Entity.QuizQuestion | null>(null)
const setEditData = (data: Entity.QuizQuestion | null) => {
  editData.value = data
}

const handleEditTable = (row: Entity.QuizQuestion) => {
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
          <n-form-item label="Quiz" path="condition_1">
            <n-select :options="quizzesOptions" v-model:value="model.condition_1" placeholder="Pilih Quiz" />
          </n-form-item>
          <n-form-item label="Bobot" path="condition_2">
            <n-input v-model:value="model.condition_2" placeholder="Masukkan bobot" />
          </n-form-item>
          <n-flex class="ml-auto">
            <NButton type="primary" @click="getQuizQuestionList">
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
        <n-data-table :columns="columns" :data="quizQuestions" :loading="loading" :pagination="pagination" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData"
          @fetch-data="getQuizQuestionList" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

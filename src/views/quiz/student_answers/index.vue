<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NSpace, NTag } from 'naive-ui'
import { useStudentAnswerStore } from '@/store/student_answer'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const studentAnswerStore = useStudentAnswerStore()
const { studentAnswers } = storeToRefs(studentAnswerStore)

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getStudentAnswerList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getStudentAnswerList()
  },
})

const columns: DataTableColumns<Entity.StudentAnswer> = [
  {
    title: 'ID',
    align: 'center',
    key: 'id',
  },
  {
    title: 'ID Percobaan Kuis',
    align: 'center',
    key: 'quiz_attempt_id',
  },
  {
    title: 'Pertanyaan',
    align: 'center',
    key: 'question.question',
  },
  {
    title: 'Jawaban',
    align: 'center',
    key: 'option.answer',
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
]

onMounted(() => {
  getStudentAnswerList()
})

const getStudentAnswerList = async () => {
  startLoading()
  await studentAnswerStore.all({
    page: pagination.page,
    includeQuizAttempt: true,
    includeQuizQuestion: true,
    includeQuizOption: true,
    pageSize: pagination.pageSize
  })
  endLoading()
}
</script>

<template>
  <NSpace vertical size="large">
    <n-card>
      <NSpace vertical size="large">
        <div class="flex gap-4">
          <NButton strong secondary class="ml-a">
            <template #icon>
              <icon-park-outline-download />
            </template>
            Download
          </NButton>
        </div>
        <n-data-table :columns="columns" :data="studentAnswers" :loading="loading" :pagination="pagination" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

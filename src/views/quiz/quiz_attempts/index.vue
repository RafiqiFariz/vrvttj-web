<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NSpace } from 'naive-ui'
import { useQuizAttemptStore } from '@/store/quiz_attempt';

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const quizAttemptStore = useQuizAttemptStore()
const { quizAttempts } = storeToRefs(quizAttemptStore)

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getQuizAttemptList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getQuizAttemptList()
  },
})

const columns: DataTableColumns<Entity.QuizResult> = [
  {
    title: 'ID',
    align: 'center',
    key: 'id',
  },
  {
    title: 'Judul Kuis',
    align: 'center',
    key: 'quiz.title',
  },
  {
    title: 'Nama Mahasiswa',
    align: 'center',
    key: 'student.user.name',
  },
  {
    title: 'Skor',
    align: 'center',
    key: 'score',
  },
]

onMounted(() => {
  getQuizAttemptList()
})

const getQuizAttemptList = async () => {
  startLoading()
  await quizAttemptStore.all({
    page: pagination.page,
    includeQuiz: true,
    includeStudent: true,
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
        <n-data-table :columns="columns" :data="quizAttempts" :loading="loading" :pagination="pagination" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

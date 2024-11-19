<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NSpace } from 'naive-ui'
import { useQuizResultStore } from '@/store/quiz_result'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const quizResultStore = useQuizResultStore()
const { quizResults } = storeToRefs(quizResultStore)

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getQuizResultList()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getQuizResultList()
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
    title: 'Total Pertanyaan',
    align: 'center',
    key: 'total_questions',
  },
  {
    title: 'Total Benar',
    align: 'center',
    key: 'correct_answers',
  },
  {
    title: 'Total Salah',
    align: 'center',
    key: 'wrong_answers',
  },
  {
    title: 'Skor Akhir',
    align: 'center',
    key: 'final_score',
  },
  {
    title: 'Waktu Selesai',
    align: 'center',
    key: 'completed_at',
  },
]

onMounted(() => {
  getQuizResultList()
})

const getQuizResultList = async () => {
  startLoading()
  await quizResultStore.all({
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
        <n-data-table :columns="columns" :data="quizResults" :loading="loading" :pagination="pagination" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

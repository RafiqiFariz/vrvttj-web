<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
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

const initialModel = {
  condition_1: '',
  condition_2: '1',
  condition_3: '',
}
const model = ref({ ...initialModel })

const formRef = ref<FormInst | null>()
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

const handleResetSearch = () => {
  model.value = { ...initialModel }
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
      <n-form ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
        <n-flex>
          <n-form-item label="Nama" path="condition_1">
            <n-input v-model:value="model.condition_1" placeholder="Masukkan nama mahasiswa" />
          </n-form-item>
          <n-form-item label="Quiz" path="condition_2">
            <n-select :options="[{ label: 'Quiz 1', value: '1' }]" v-model:value="model.condition_2"
              placeholder="Pilih Quiz" />
          </n-form-item>
          <n-form-item label="Skor" path="condition_3">
            <n-input v-model:value="model.condition_3" placeholder="Masukkan skor" />
          </n-form-item>
          <n-flex class="ml-auto">
            <NButton type="primary" @click="getQuizOptionList">
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
        <n-data-table :columns="columns" :data="quizOptions" :loading="loading" :pagination="pagination" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData"
          @fetch-data="getQuizOptionList" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

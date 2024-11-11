<script setup lang="ts">
import { useQuizStore } from '@/store/quiz';

interface Props {
  visible: boolean
  type?: ModalType
  modalData?: any
}
const {
  visible,
  type = 'add',
  modalData = null,
} = defineProps<Props>()

const emit = defineEmits<Emits>()
const quizStore = useQuizStore()
const { quizzes } = storeToRefs(quizStore)

const defaultFormModal: Entity.QuizOption = {
  quiz_question_id: null,
  answer: '',
}
const formModel = ref({ ...defaultFormModal })

interface Emits {
  (e: 'update:visible', visible: boolean): void
  (e: 'fetchData'): void
}

const modalVisible = computed({
  get() {
    return visible
  },
  set(visible) {
    closeModal(visible)
  },
})

const closeModal = (visible = false) => {
  emit('update:visible', visible)
}

type ModalType = 'add' | 'edit'
const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: 'Tambah Jawaban Kuis',
    edit: 'Edit Jawaban Kuis',
  }
  return titles[type]
})

const UpdateFormModelByModalType = () => {
  const handlers = {
    add: () => {
      formModel.value = { ...defaultFormModal }
    },
    edit: () => {
      if (modalData)
        formModel.value = { ...modalData }
    },
  }
  handlers[type]()
}

watch(
  () => visible,
  (newValue) => {
    if (newValue)
      UpdateFormModelByModalType()
  },
)
</script>

<template>
  <n-modal v-model:show="modalVisible" :mask-closable="false" preset="card" :title="title" class="w-700px" :segmented="{
    content: true,
    action: true,
  }">
    <n-form label-placement="left" :model="formModel" label-align="left" :label-width="80">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="Tempat Lahir" path="tempat_lahir">
          <n-input placeholder="Masukkan tempat lahir" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Tanggal Lahir" path="tanggal_lahir">
          <n-date-picker type="date" class="w-full" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Alamat" path="alamat">
          <n-input type="textarea" placeholder="Masukkan alamat" :autosize="{
            minRows: 3,
            maxRows: 5,
          }" />
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal()">
          Batal
        </n-button>
        <n-button type="primary">
          Kirim
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>

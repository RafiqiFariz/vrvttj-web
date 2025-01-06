<script setup lang="ts">
import { useQuizOptionStore } from '@/store/quiz_option';
import { useQuizQuestionStore } from '@/store/quiz_question';

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
const quizQuestionStore = useQuizQuestionStore()
const quizOptionStore = useQuizOptionStore()
const { errors } = storeToRefs(quizOptionStore)
const { quizQuestionOptions } = storeToRefs(quizQuestionStore)

const defaultFormModal: Entity.QuizOption = {
  quiz_question_id: null,
  answer: '',
  is_correct: false,
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
  errors.value = {}
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

const createQuizOptionData = async () => {
  const res = await quizOptionStore.create(formModel.value)

  if (res?.status === 200) {
    emit('fetchData')
    closeModal()
  }
}

const updateQuizOptionData = async () => {
  const payload = {
    ...formModel.value,
    _method: 'PUT',
  }

  const res = await quizOptionStore.update(modalData.id, payload)

  if (res?.status === 200) {
    emit('fetchData')
    closeModal()
  }
}

const handleSubmit = async () => {
  if (type === 'add') {
    await createQuizOptionData()
  } else {
    await updateQuizOptionData()
  }
}

const error = (path: string) => {
  return errors.value[path] ? 'error' : undefined
}

const feedback = (path: string) => {
  return errors.value[path] ? errors.value[path][0] : ''
}

onMounted(() => {
  quizQuestionStore.all({ paginate: false })
})

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
        <n-form-item-grid-item :span="24" label="Question" path="quiz_question_id"
          :feedback="feedback('quiz_question_id')" :validation-status="error('quiz_question_id')">
          <n-select :options="quizQuestionOptions" v-model:value="formModel.quiz_question_id"
            placeholder="Pilih Pertanyaan" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Jawaban" path="answer" :feedback="feedback('answer')"
          :validation-status="error('answer')">
          <n-input v-model:value="formModel.answer" placeholder="Masukkan pilihan jawaban" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Status Kebenaran" path="is_correct" :feedback="feedback('is_correct')"
          :validation-status="error('is_correct')">
          <n-space>
            <n-switch v-model:value="formModel.is_correct" :checked-value="1" :unchecked-value="0">
              <template #checked>
                True
              </template>
              <template #unchecked>
                False
              </template>
            </n-switch>
          </n-space>
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal()">
          {{ $t('common.cancel') }}
        </n-button>
        <n-button type="primary" @click="handleSubmit">
          {{ $t('common.submit') }}
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>

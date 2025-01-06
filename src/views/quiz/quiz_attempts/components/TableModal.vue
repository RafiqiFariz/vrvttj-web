<script setup lang="ts">
import { useQuizAttemptStore } from '@/store/quiz_attempt';
import { useQuizQuestionStore } from '@/store/quiz_question';
import { useStudentAnswerStore } from '@/store/student_answer';

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
const studentAnswerStore = useStudentAnswerStore()
const quizAttemptStore = useQuizAttemptStore()
const quizQuestionStore = useQuizQuestionStore()
const { errors, studentAnswers } = storeToRefs(studentAnswerStore)
const { quizAttemptOptions } = storeToRefs(quizAttemptStore)
const { quizQuestionOptions } = storeToRefs(quizQuestionStore)

const defaultFormModal: Entity.StudentAnswer = {
  quiz_attempt_id: null,
  quiz_question_id: null,
  quiz_option_id: null,
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
}

type ModalType = 'add' | 'edit'
const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: 'Tambah Jawaban Mahasiswa',
    edit: 'Edit Jawaban Mahasiswa',
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

const createStudentAnswerData = async () => {
  console.log(formModel.value)
  const res = await studentAnswerStore.create(formModel.value)

  if (res?.status === 200) {
    emit('fetchData')
    closeModal()
  }
}

const updateStudentAnswerData = async () => {
  const payload = {
    ...formModel.value,
    _method: 'PUT',
  }

  const res = await studentAnswerStore.update(modalData.id, payload)

  if (res?.status === 200) {
    emit('fetchData')
    closeModal()
  }
}

const handleSubmit = async () => {
  if (type === 'add') {
    await createStudentAnswerData()
  } else {
    await updateStudentAnswerData()
  }
}

const error = (path: string) => {
  return errors.value[path] ? 'error' : undefined
}

const feedback = (path: string) => {
  return errors.value[path] ? errors.value[path][0] : ''
}

onMounted(() => {
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
    <n-form label-placement="top" :model="formModel" label-align="left" :label-width="80">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="24" label="Percobaan Kuis" path="quiz_attempt_id" :feedback="feedback('quiz_attempt_id')"
          :validation-status="error('quiz_attempt_id')">
          <n-select :options="quizAttemptOptions" v-model:value="formModel.quiz_attempt_id" placeholder="Pilih Quiz" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Pertanyaan Kuis" path="quiz_question_id" :feedback="feedback('quiz_question_id')"
          :validation-status="error('quiz_question_id')">
          <n-select :options="quizAttemptOptions" v-model:value="formModel.quiz_attempt_id" placeholder="Pilih Quiz" />
        </n-form-item-grid-item>
        <!-- <n-form-item-grid-item :span="24" label="Pertanyaan" path="question" :feedback="feedback('question')"
          :validation-status="error('question')">
          <n-input v-model:value="formModel.question" placeholder="Masukkan pertanyaan" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Bobot" path="weight" :feedback="feedback('weight')"
          :validation-status="error('weight')">
          <n-input-number class="w-100" v-model:value="formModel.weight" placeholder="Masukkan bobot"
            button-placement="both" :min="0" :precision="1" :step="0.5" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" v-for="(item, index) in formModel.options" :key="index"
          :label="`Opsi ke-${index + 1}`" :path="`options[${index}].answer`" :rule="{
            required: true,
            message: `Masukkan opsi ke-${index + 1}`,
            trigger: ['input', 'blur'],
          }">
          <n-input v-model:value="item.answer" clearable :placeholder="`Masukkan opsi ke-${index + 1}`" />
          <n-switch class="ml-4 w-25" v-model:value="item.is_correct" :checked-value="1" :unchecked-value="0">
            <template #checked>
              True
            </template>
            <template #unchecked>
              False
            </template>
          </n-switch>
          <n-button class="ml-4" @click="removeItem(index)">
            Remove
          </n-button>
        </n-form-item-grid-item>
        <n-form-item-grid-item>
          <n-button attr-type="button" @click="addItem" :disabled="formModel.options?.length === 5">
            Tambah Pilihan
          </n-button>
        </n-form-item-grid-item> -->
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

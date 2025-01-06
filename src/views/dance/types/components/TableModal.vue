<script setup lang="ts">
import { createDanceType, updateDanceType } from '@/service/api/dance_type';

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
const errors = ref<Record<string, string[]>>({})

const defaultFormModal: Entity.DanceType = {
  name: '',
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
    add: 'Tambah Jenis Tari',
    edit: 'Edit Jenis Tari',
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

const createDanceTypePayload = () => ({
  name: formModel.value.name,
})

const createDanceTypeData = async () => {
  try {
    const response = await createDanceType(createDanceTypePayload())

    if (response.status === 200) {
      window.$message.success(response.data.message)
      emit('fetchData')
      closeModal()
    }
  } catch (error: any) {
    errors.value = error.response.data.errors
    console.error("Error storing document: ", error)
  }
}

const updateDanceTypeData = async () => {
  if (!modalData?.id) return

  try {
    const payload = {
      ...createDanceTypePayload(),
      _method: 'PUT',
    }

    const response = await updateDanceType(modalData.id, payload)

    if (response.status === 200) {
      emit('fetchData')
      window.$message.success(response.data.message)
      closeModal()
    }
  } catch (error) {
    console.error("Error updating document: ", error)
  }
}

const handleSubmit = async () => {
  if (type === 'add') {
    await createDanceTypeData()
  } else {
    await updateDanceTypeData()
  }
}

watch(
  () => visible,
  (newValue) => {
    if (newValue)
      UpdateFormModelByModalType()
  },
)

const isError = (path: string) => {
  return errors.value[path] ? 'error' : undefined
}

const createFeedback = (path: string) => {
  return errors.value[path] ? errors.value[path][0] : ''
}
</script>

<template>
  <n-modal v-model:show="modalVisible" :mask-closable="false" preset="card" :title="title" class="w-700px" :segmented="{
    content: true,
    action: true,
  }">
    <n-form label-placement="left" :model="formModel" label-align="left" :label-width="80">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="24" label="Nama" path="name" :feedback="createFeedback('name')"
          :validation-status="isError('name')">
          <n-input v-model:value="formModel.name" placeholder="Masukkan nama" />
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal()">
          {{ $t('common.cancel') }}
        </n-button>
        <n-button type="primary" @click="handleSubmit()">
          {{ $t('common.submit') }}
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>

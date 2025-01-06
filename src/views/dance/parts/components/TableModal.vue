<script setup lang="ts">
import { useDancePartStore } from '@/store/dance_part';
import { UploadFileInfo } from 'naive-ui';

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
const API_URL = import.meta.env.VITE_API_URL
const dancePartStore = useDancePartStore()
const { errors } = storeToRefs(dancePartStore)

const defaultFormModal: Entity.DancePart = {
  name: '',
  picture: '',
  description: '',
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
    add: 'Tambah Bagian Tari',
    edit: 'Edit Bagian Tari',
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

const handleUploadChange = (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => {
  const { file } = options
  if (file.file) {
    formModel.value.picture = file.file
  }
}

const createDancePartData = async () => {
  const res = await dancePartStore.create(formModel.value)
  console.log(errors.value)

  if (res?.status === 200) {
    emit('fetchData')
    closeModal()
  }
}

const updateDancePartData = async () => {
  const payload = {
    ...formModel.value,
    _method: 'PUT',
  }

  const res = await dancePartStore.update(modalData.id, payload)

  if (res?.status === 200) {
    emit('fetchData')
    closeModal()
  }
}

const handleSubmit = async () => {
  if (type === 'add') {
    await createDancePartData()
  } else {
    await updateDancePartData()
  }
}

const error = (path: string) => {
  return errors.value[path] ? 'error' : undefined
}

const feedback = (path: string) => {
  return errors.value[path] ? errors.value[path][0] : ''
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
        <n-form-item-grid-item :span="24" label="Nama" path="name" :feedback="feedback('name')"
          :validation-status="error('name')">
          <n-input v-model:value="formModel.name" placeholder="Masukkan nama" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Gambar" path="picture" :feedback="feedback('picture')"
          :validation-status="error('picture')">
          <n-space vertical>
            <n-image width="100" :src="`${API_URL}/storage/${formModel.picture}`" v-if="type === 'edit'" />
            <n-upload accept=".jpg,.png,.jpeg" :default-upload="false" :max="1" @change="handleUploadChange">
              <n-button>Select File</n-button>
            </n-upload>
          </n-space>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Deskripsi" path="description" :feedback="feedback('description')"
          :validation-status="error('description')">
          <n-input v-model:value="formModel.description" type="textarea" placeholder="Masukkan deskripsi" :autosize="{
            minRows: 3,
            maxRows: 5,
          }" />
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

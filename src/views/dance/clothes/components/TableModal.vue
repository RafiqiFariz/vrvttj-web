<script setup lang="ts">
import { useDanceStore } from '@/store/dance';
import { useDanceClothesStore } from '@/store/dance-clothes';
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
const danceClothesStore = useDanceClothesStore()
const danceStore = useDanceStore()
const { errors } = storeToRefs(danceClothesStore)
const { danceOptions } = storeToRefs(danceStore)

const defaultFormModal: Entity.DanceClothes = {
  dance_id: null,
  name: '',
  picture: '',
  asset_path: '',
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
    add: 'Tambah Busana Tari',
    edit: 'Edit Busana Tari',
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

const handlePictureChange = (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => {
  const { file } = options
  if (file.file) {
    formModel.value.picture = file.file
  }
}

const handleAssetChange = (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => {
  const { file } = options
  if (file.file) {
    formModel.value.asset_path = file.file
  }
}

const createDanceClothesData = async () => {
  console.log(formModel.value)
  const res = await danceClothesStore.create(formModel.value)

  if (res?.status === 200) {
    emit('fetchData')
    closeModal()
  }
}

const updateDanceClothesData = async () => {
  const payload = {
    ...formModel.value,
    _method: 'PUT',
  }
  delete payload.dance

  const res = await danceClothesStore.update(modalData.id, payload)

  if (res?.status === 200) {
    emit('fetchData')
    closeModal()
  }
}

const handleSubmit = async () => {
  if (type === 'add') {
    await createDanceClothesData()
  } else {
    await updateDanceClothesData()
  }
}

const error = (path: string) => {
  return errors.value[path] ? 'error' : undefined
}

const feedback = (path: string) => {
  return errors.value[path] ? errors.value[path][0] : ''
}

onMounted(() => {
  danceStore.all({ paginate: false })
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
        <n-form-item-grid-item :span="24" label="Nama Tarian" path="dance_id" :feedback="feedback('dance_id')"
          :validation-status="error('dance_id')">
          <n-select :options="danceOptions" v-model:value="formModel.dance_id"
            placeholder="Pilih Tarian" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Gambar" path="picture" :feedback="feedback('picture')"
          :validation-status="error('picture')">
          <n-space vertical>
            <n-image width="100" :src="`${API_URL}/storage/${formModel.picture}`" v-if="type === 'edit'" />
            <n-upload class="w-100" accept=".jpg,.png,.jpeg" :default-upload="false" :max="1" @change="handlePictureChange">
              <n-button class="w-100">Select File</n-button>
            </n-upload>
          </n-space>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Asset" path="asset_path" :feedback="feedback('asset_path')"
          :validation-status="error('asset_path')">
          <n-space vertical>
            <n-image width="100" :src="`${API_URL}/storage/${formModel.asset_path}`" v-if="type === 'edit'" />
            <n-upload class="w-100" accept=".obj,.fbx,.glb,.glTF" :default-upload="false" :max="1" @change="handleAssetChange">
              <n-button class="w-100">Select File</n-button>
            </n-upload>
          </n-space>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Nama" path="name">
          <n-input v-model:value="formModel.name" placeholder="Masukkan nama" />
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
          Batal
        </n-button>
        <n-button type="primary" @click="handleSubmit">
          Kirim
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>

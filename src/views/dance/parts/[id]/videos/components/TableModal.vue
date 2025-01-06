<script setup lang="ts">
import { useDancePartVideoStore } from '@/store/dance_part_video';
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
const dancePartVideoStore = useDancePartVideoStore()
const { errors } = storeToRefs(dancePartVideoStore)
const route = useRoute()
const dancePartId = ref<number>(Number(route.params.id))

const defaultFormModal: Entity.DancePartVideo = {
  dance_part_id: dancePartId.value,
  thumbnail_path: '',
  video_path: '',
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
    add: 'Tambah Video Bagian Tari',
    edit: 'Edit Video Bagian Tari',
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
        formModel.value = {
          ...modalData,
          dance_part_id: dancePartId.value,
        }
    },
  }
  handlers[type]()
}

const handleUploadThumbnailChange = (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => {
  const { file } = options
  if (file.file) {
    formModel.value.thumbnail_path = file.file
  }
}

const handleUploadVideoChange = (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => {
  const { file } = options
  if (file.file) {
    formModel.value.video_path = file.file
  }
}

const createDancePartData = async () => {
  const res = await dancePartVideoStore.create(dancePartId.value, formModel.value)
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

  const res = await dancePartVideoStore.update(dancePartId.value, modalData.id, payload)

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
        <n-form-item-grid-item :span="24" label="Thumbnail" path="thumbnail_path" :feedback="feedback('thumbnail_path')"
          :validation-status="error('thumbnail_path')">
          <n-space vertical>
            <n-image width="100" :src="typeof formModel.thumbnail_path === 'string' ? formModel.thumbnail_path : ''"
              v-if="type === 'edit'" />
            <n-upload accept=".jpg,.png,.jpeg" :default-upload="false" :max="1" @change="handleUploadThumbnailChange">
              <n-button>Select File</n-button>
            </n-upload>
          </n-space>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="Video" path="video_path" :feedback="feedback('video_path')"
          :validation-status="error('video_path')">
          <n-space vertical>
            <video width="200" :src="typeof formModel.video_path === 'string' ? formModel.video_path : ''"
              v-if="type === 'edit'" controls />
            <n-upload accept=".mp4" :default-upload="false" :max="1" @change="handleUploadVideoChange">
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

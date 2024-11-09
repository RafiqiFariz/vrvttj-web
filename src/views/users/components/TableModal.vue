<script setup lang="ts">
import { createUser, fetchRoleList, updateUser } from '@/service'
import axios from 'axios'
import * as _ from 'lodash'
import { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { Option } from 'naive-ui/es/transfer/src/interface'
import moment from 'moment'

interface Props {
  visible: boolean
  type?: ModalType
  modalData?: any
}

interface LocalUser extends Entity.User {
  old_role_id?: string | null
}

const API_URL = import.meta.env.VITE_API_URL

const {
  visible,
  type = 'add',
  modalData = null,
} = defineProps<Props>()

const emit = defineEmits<Emits>()

const defaultFormModal: LocalUser = {
  nim: null,
  nrp: null,
  name: '',
  gender: null,
  email: '',
  password: '',
  password_confirmation: '',
  phone: null,
  religion: null,
  place_of_birth: '',
  date_of_birth: null,
  address: null,
  role_id: '',
  role: {
    id: null,
    name: null,
  },
  old_role_id: null,
}

const formModel = ref({ ...defaultFormModal })

interface Emits {
  (e: 'update:visible', visible: boolean): void
  (e: 'updateSuccess'): void
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
  formModel.value = { ...defaultFormModal }
}

type ModalType = 'add' | 'edit'
const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: 'Tambah Pengguna',
    edit: 'Edit Pengguna',
  }
  return titles[type]
})

const defaultPhoto = ref<UploadFileInfo[]>()
const previewImageUrl = ref('')

const UpdateFormModelByModalType = () => {
  const handlers = {
    add: () => {
      defaultPhoto.value = []
      formModel.value = { ...defaultFormModal }
    },
    edit: () => {
      if (modalData) {
        formModel.value = {
          ...modalData,
          nim: modalData.student?.nim,
          nrp: modalData.lecturer?.nrp,
          student: modalData.student || { nim: '' },
          lecturer: modalData.lecturer || { nrp: '' },
          old_role_id: modalData.role_id,
        }
      }
    },
  }
  handlers[type]()
}

const errors = ref<Record<string, string[]>>({})

const getUserPayload = async () => {
  let photoUrl = _.replace(previewImageUrl.value, `${API_URL}/`, '')

  if (previewImageUrl.value.toString().includes('storage/tmp')) {
    photoUrl = await handlePersistentUpload(photoUrl)
  } else {
    photoUrl = _.replace(photoUrl, `storage/`, '')
  }

  let payload: any = {
    ...formModel.value,
    photo: photoUrl,
    role_id: formModel.value.role?.id!,
    date_of_birth: moment(formModel.value.date_of_birth).format('YYYY-MM-DD'),
    gender: formModel.value.gender?.toString(),
  }

  if (formModel.value.role?.name === 'student') {
    delete payload.nrp
  } else {
    delete payload.nim
  }

  return payload
}

const updateUserData = async () => {
  if (!modalData?.id) return

  try {
    const payload = {
      ...(await getUserPayload()),
      _method: 'PUT',
    }

    const response = await updateUser(modalData.id, payload)

    if (response.status === 200) {
      emit('updateSuccess')
      errors.value = {}
      closeModal()
    }
  } catch (error) {
    console.error("Error updating document: ", error)
  }
}

const createUserData = async () => {
  try {
    const response = await createUser(await getUserPayload())

    if (response.status === 200) {
      emit('updateSuccess')
      errors.value = {}
      closeModal()
    }
  } catch (error: any) {
    errors.value = error.response.data.errors
    console.error("Error storing document: ", error)
  }
}

const showModal = ref(false)

const handleUpload = (options: UploadCustomRequestOptions) => {
  const { file, data, action, headers, onFinish, onError, onProgress } = options

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(
        key,
        data[key as keyof UploadCustomRequestOptions['data']]
      )
    })
  }

  if (!file.file) return

  formData.append('photo', file.file as File)
  formData.append('id', modalData?.id || '')
  axios.post(action as string, formData, {
    headers: headers as Record<string, string>,
    onUploadProgress: (progressEvent) => {
      onProgress({ percent: (progressEvent.loaded / progressEvent.total!) * 100 })
    },
  })
    .then((response) => {
      previewImageUrl.value = response.data
      onFinish()
    })
    .catch((error) => {
      onError()
    })
}

const handlePersistentUpload = async (tempUrl: string) => {
  try {
    const formData = new FormData()
    formData.append('photo', tempUrl)
    const response = await axios.post(`${API_URL}/api/v1/upload`, formData)
    return response.data
  } catch (error) {
    console.error('Error uploading image: ', error)
  }
}

const handleSubmit = async () => {
  if (type === 'add') {
    await createUserData()
  } else {
    await updateUserData()
  }
}

const handlePreview = () => showModal.value = true

const religions = [
  { label: 'Islam', value: 'islam' },
  { label: 'Kristen', value: 'kristen' },
  { label: 'Katolik', value: 'katolik' },
  { label: 'Hindu', value: 'hindu' },
  { label: 'Budha', value: 'budha' },
  { label: 'Konghucu', value: 'konghucu' },
]

const roles = ref<Option[]>([])

onMounted(() => {
  fetchRoleList().then((response) => {
    roles.value = response.data.map((role: Entity.Role) => ({
      label: _.startCase(role.name!),
      value: role.id,
      disabled: role.name === 'admin',
    }))
  })

  if (modalData && modalData.photo) {
    setDefaultPhoto()
  }
})

watch(
  () => visible,
  (newValue) => {
    if (newValue)
      UpdateFormModelByModalType()
  },
)

watch(
  () => formModel.value.role?.id,
  (newRoleId) => {
    const selectedRole = roles.value.find((role) => role.value === newRoleId)

    if (formModel.value.role) {
      formModel.value.role.name = selectedRole ? _.lowerCase(selectedRole.label) : ''
    }
  }
)

watch(
  () => modalData,
  (newModalData) => {
    if (newModalData && newModalData.photo) {
      setDefaultPhoto()
      previewImageUrl.value = `${API_URL}/storage/${newModalData.photo}`
    } else {
      defaultPhoto.value = [] // Kosongkan jika modalData tidak berisi foto
      previewImageUrl.value = ''
    }
  },
  { immediate: true }
)

// Fungsi untuk mengatur gambar default berdasarkan modalData
const setDefaultPhoto = () => {
  defaultPhoto.value = [
    {
      id: '1',
      name: 'photo',
      status: 'finished',
      url: `${API_URL}/storage/${modalData.photo}`,
    } as UploadFileInfo,
  ]
}

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
        <n-form-item-grid-item :span="12" label="Nama" path="name" :feedback="createFeedback('name')"
          :validation-status="isError('name')">
          <n-input v-model:value="formModel.name" placeholder="Masukkan nama" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Email" path="email" :feedback="createFeedback('email')"
          :validation-status="isError('email')">
          <n-input v-model:value="formModel.email" placeholder="Masukkan email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="No. Telp" path="phone" :feedback="createFeedback('phone')"
          :validation-status="isError('phone')">
          <n-input v-model:value="formModel.phone" placeholder="Masukkan nomor telepon" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Agama" path="religion" :feedback="createFeedback('religion')"
          :validation-status="isError('religion')">
          <n-select :options="religions" v-model:value="formModel.religion" placeholder="Pilih agama" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Tempat Lahir" path="place_of_birth"
          :feedback="createFeedback('place_of_birth')" :validation-status="isError('place_of_birth')">
          <n-input v-model:value="formModel.place_of_birth" placeholder="Masukkan tempat lahir" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Tanggal Lahir" path="date_of_birth"
          :feedback="createFeedback('date_of_birth')" :validation-status="isError('date_of_birth')">
          <n-date-picker type="date" class="w-full" v-model:value="formModel.date_of_birth" format="dd-MM-yyyy" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Alamat" path="address" :feedback="createFeedback('address')"
          :validation-status="isError('address')">
          <n-input v-model:value="formModel.address" type="textarea" placeholder="Masukkan alamat" :autosize="{
            minRows: 3,
            maxRows: 5,
          }" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Jenis Kelamin" path="gender" :feedback="createFeedback('gender')"
          :validation-status="isError('gender')">
          <n-radio-group v-model:value="formModel.gender">
            <n-space>
              <n-radio :value="0">
                Pria
              </n-radio>
              <n-radio :value="1">
                Wanita
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Password" path="password" :feedback="createFeedback('password')"
          :validation-status="isError('password')">
          <n-input v-model:value="formModel.password" type="password" placeholder="Masukkan password" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Re-enter Password" path="password_confirmation"
          :feedback="createFeedback('password_confirmation')" :validation-status="isError('password_confirmation')">
          <n-input v-model:value="formModel.password_confirmation" type="password"
            placeholder="Masukkan konfirmasi password" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Peran" path="role" :feedback="createFeedback('role')"
          :validation-status="isError('role')">
          <n-select :options="roles" v-model:value="formModel.role.id" placeholder="Pilih peran"
            :disabled="formModel.role?.name === 'admin'" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Foto" :feedback="createFeedback('photo')"
          :validation-status="isError('photo')">
          <n-upload :action="`${API_URL}/api/v1/upload`" :custom-request="handleUpload" :with-credentials="true"
            list-type="image-card" @preview="handlePreview" name="photo" :max="1" show-preview-button
            :default-file-list="defaultPhoto" />
          <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="Foto">
            <img :src="previewImageUrl" style="width: 100%">
          </n-modal>
        </n-form-item-grid-item>
        <n-form-item-grid-item v-if="formModel.role?.name === 'student'" :span="12" label="NIM" path="nim"
          :feedback="createFeedback('nim')" :validation-status="isError('nim')">
          <n-input v-model:value="formModel.nim" placeholder="Masukkan NIM" />
        </n-form-item-grid-item>
        <n-form-item-grid-item v-if="formModel.role?.name === 'lecturer'" :span="12" label="NRP" path="nrp"
          :feedback="createFeedback('nrp')" :validation-status="isError('nrp')">
          <n-input v-model:value="formModel.nrp" placeholder="Masukkan NRP" />
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal()">
          Batal
        </n-button>
        <n-button type="primary" @click="handleSubmit()">
          Kirim
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>

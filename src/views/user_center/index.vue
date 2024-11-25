<script setup lang="ts">
import { useAuthStore } from '@/store'
import { useUserStore } from '@/store/user';
import moment from 'moment'

const authStore = useAuthStore()
const userStore = useUserStore()

const { user } = storeToRefs(authStore)
const { errors } = storeToRefs(userStore)

const rules = {
  name: [
    { required: true, message: 'Nama harus diisi', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Email harus diisi', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: 'No. Telp harus diisi', trigger: 'blur' },
  ],
}

const formRef = ref()
const formValue = ref({
  id: user?.value?.id ?? null,
  name: user?.value?.name ?? '',
  email: user?.value?.email ?? '',
  phone: user?.value?.phone ?? '',
  gender: user?.value?.gender ?? null,
  password: '',
  password_confirmation: '',
  religion: user?.value?.religion ?? null,
  place_of_birth: user?.value?.place_of_birth ?? '',
  date_of_birth: moment(user?.value?.date_of_birth).format('YYYY-MM-DD') ?? '',
  role_id: user?.value?.role_id ?? null,
  address: user?.value?.address ?? '',
})

const religions = [
  { label: 'Islam', value: 'islam' },
  { label: 'Kristen', value: 'kristen' },
  { label: 'Katolik', value: 'katolik' },
  { label: 'Hindu', value: 'hindu' },
  { label: 'Budha', value: 'budha' },
  { label: 'Konghucu', value: 'konghucu' },
]

const handleSubmit = () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const payload = {
        ...formValue.value,
        gender: formValue.value.gender?.toString(),
        _method: 'PUT',
      }

      await userStore.update(user?.value?.id!, payload).then(async () => {
        await authStore.fetchUser()
      })
    }
  })
}

const isError = (path: string) => {
  return errors.value[path] ? 'error' : undefined
}

const createFeedback = (path: string) => {
  return errors.value[path] ? errors.value[path][0] : ''
}
</script>

<template>
  <n-space vertical>
    <n-card title="Informasi Pribadi">
      <n-space size="large">
        <n-avatar round :size="128" :src="user?.photo!" />

        <n-descriptions label-placement="left" :column="2" :title="`Welcome, ${user?.name}`" class="w-100">
          <n-descriptions-item label="Tempat Lahir">
            {{ user?.place_of_birth }}
          </n-descriptions-item>
          <n-descriptions-item label="Email">
            {{ user?.email }}
          </n-descriptions-item>
          <n-descriptions-item label="No. Telp">
            {{ user?.phone }}
          </n-descriptions-item>
          <n-descriptions-item label="Peran">
            {{ user?.role?.name }}
          </n-descriptions-item>
        </n-descriptions>
      </n-space>
    </n-card>
    <n-card title="Ubah Data">
      <n-space justify="center">
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
          <n-grid :cols="24" :x-gap="18">
            <n-form-item-grid-item :span="12" label="Nama" path="name">
              <n-input v-model:value="formValue.name" placeholder="Masukkan nama" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="12" label="Email" path="email" :feedback="createFeedback('email')"
              :validation-status="isError('email')">
              <n-input v-model:value="formValue.email" placeholder="Masukkan email" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="12" label="No. Telp" path="phone">
              <n-input v-model:value="formValue.phone" placeholder="Masukkan No. Telp" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="12" label="Agama" path="religion" :feedback="createFeedback('religion')"
              :validation-status="isError('religion')">
              <n-select :options="religions" v-model:value="formValue.religion" placeholder="Pilih agama" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="12" label="Tempat Lahir" path="place_of_birth"
              :feedback="createFeedback('place_of_birth')" :validation-status="isError('place_of_birth')">
              <n-input v-model:value="formValue.place_of_birth" placeholder="Masukkan tempat lahir" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="12" label="Tanggal Lahir" path="date_of_birth"
              :feedback="createFeedback('date_of_birth')" :validation-status="isError('date_of_birth')">
              <n-date-picker type="date" class="w-full" v-model:value="formValue.date_of_birth" format="dd-MM-yyyy" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="12" label="Alamat" path="address" :feedback="createFeedback('address')"
              :validation-status="isError('address')">
              <n-input v-model:value="formValue.address" type="textarea" placeholder="Masukkan alamat" :autosize="{
                minRows: 3,
                maxRows: 5,
              }" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="12" label="Jenis Kelamin" path="gender" :feedback="createFeedback('gender')"
              :validation-status="isError('gender')">
              <n-radio-group v-model:value="formValue.gender">
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
              <n-input v-model:value="formValue.password" type="password" placeholder="Masukkan password" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="12" label="Konfirmasi Password" path="password_confirmation"
              :feedback="createFeedback('password_confirmation')" :validation-status="isError('password_confirmation')">
              <n-input v-model:value="formValue.password_confirmation" type="password"
                placeholder="Masukkan konfirmasi password" />
            </n-form-item-grid-item>
            <n-form-item-grid-item :span="24">
              <n-button type="primary" attr-type="button" block @click="handleSubmit">
                Submit
              </n-button>
            </n-form-item-grid-item>
          </n-grid>
        </n-form>
      </n-space>
    </n-card>
  </n-space>
</template>

<style scoped></style>

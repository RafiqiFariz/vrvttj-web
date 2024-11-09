<script setup lang="ts">
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
const defaultFormModal: Entity.User = {
  userName: '',
  gender: 0,
  email: '',
  role: [],
}
const formModel = ref({ ...defaultFormModal })

interface Emits {
  (e: 'update:visible', visible: boolean): void
}

const modalVisible = computed({
  get() {
    return visible
  },
  set(visible) {
    closeModal(visible)
  },
})
function closeModal(visible = false) {
  emit('update:visible', visible)
}
type ModalType = 'add' | 'edit'
const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: 'Tambah Pengguna',
    edit: 'Edit Pengguna',
  }
  return titles[type]
})

function UpdateFormModelByModalType() {
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

const religions = [
  { label: 'Islam', value: 'islam' },
  { label: 'Kristen', value: 'kristen' },
  { label: 'Katolik', value: 'katolik' },
  { label: 'Hindu', value: 'hindu' },
  { label: 'Budha', value: 'budha' },
  { label: 'Konghucu', value: 'konghucu' },
]

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
        <n-form-item-grid-item :span="12" label="Nama" path="name">
          <n-input v-model:value="formModel.userName" placeholder="Masukkan nama" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Email" path="email">
          <n-input v-model:value="formModel.email" placeholder="Masukkan email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="No. Telp" path="tel">
          <n-input v-model:value="formModel.tel" placeholder="Masukkan nomor telepon" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Agama" path="agama">
          <n-select :options="religions" />
        </n-form-item-grid-item>
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
        <n-form-item-grid-item :span="12" label="Gender" path="gender">
          <n-radio-group v-model:value="formModel.gender">
            <n-space>
              <n-radio :value="1">
                Pria
              </n-radio>
              <n-radio :value="0">
                Wanita
              </n-radio>
            </n-space>
          </n-radio-group>
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

<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { NButton, NPopconfirm, NSpace } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { useDancePartVideoStore } from '@/store/dance_part_video';

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const dancePartVideoStore = useDancePartVideoStore()
const { dancePartVideos } = storeToRefs(dancePartVideoStore)
const route = useRoute()
const dancePartId = ref<number>(Number(route.params.id))

const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
    getDancePartVideoList(dancePartId.value)
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getDancePartVideoList(dancePartId.value)
  },
})

// const initialModel = {
//   condition_1: '',
//   condition_2: '',
//   condition_3: '',
// }
// const model = ref({ ...initialModel })

// const formRef = ref<FormInst | null>()
const columns: DataTableColumns<Entity.DancePartVideo> = [
  {
    title: 'ID',
    align: 'left',
    key: 'id',
    render: (_, rowIndex) => {
      return (pagination.page - 1) * pagination.pageSize + rowIndex + 1;
    },
  },
  {
    title: 'Thumbnail',
    align: 'center',
    key: 'thumbnail_path',
    render: (row) => {
      return (<>
        {
          row.thumbnail_path ?
            <n-image width="200" src={row.thumbnail_path}
            /> : '-'
        }
      </>)
    },
  },
  {
    title: 'Video',
    align: 'center',
    key: 'video_path',
    render: (row) => {
      return (<>
        {
          row.video_path ?
            <video width="200" src={typeof row.video_path === 'string' ? row.video_path : ''} controls /> : '-'
        }
      </>)
    },
  },
  {
    title: 'Deskripsi',
    align: 'center',
    key: 'description',
    ellipsis: true,
    render: (row) => row.description ?? '-',
  },
  {
    title: 'Aksi',
    align: 'center',
    key: 'actions',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => handleEditTable(row)}
          >
            Edit
          </NButton>
          <NPopconfirm onPositiveClick={async () => {
            console.log(row.id!, 'test')
            const res = await dancePartVideoStore.destroy(dancePartId.value, row.id!)
            window.$message.success(res?.data.message)
            getDancePartVideoList(dancePartId.value)
          }}>
            {{
              default: () => 'Yakin ingin menghapus?',
              trigger: () => <NButton size="small">Hapus</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

onMounted(() => {
  getDancePartVideoList(dancePartId.value)
})

const getDancePartVideoList = async (dancePartId: number) => {
  startLoading()
  await dancePartVideoStore.all({ dancePartId, page: pagination.page, pageSize: pagination.pageSize })
  endLoading()
}

// const handleResetSearch = () => {
//   model.value = { ...initialModel }
// }

type ModalType = 'add' | 'edit'
const modalType = ref<ModalType>('add')
const setModalType = (type: ModalType) => {
  modalType.value = type
}

const editData = ref<Entity.DancePartVideo | null>(null)
const setEditData = (data: Entity.DancePartVideo | null) => {
  editData.value = data
}

const handleEditTable = (row: Entity.DancePartVideo) => {
  setEditData(row)
  setModalType('edit')
  openModal()
}
const handleAddTable = () => {
  openModal()
  setModalType('add')
}
</script>

<template>
  <NSpace vertical size="large">
    <!-- <n-card>
      <n-form ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
        <n-flex>
          <n-form-item label="Nama" path="condition_1">
            <n-input v-model:value="model.condition_1" placeholder="Masukkan nama" />
          </n-form-item>
          <n-flex class="ml-auto">
            <NButton type="primary" @click="getDancePartVideoList">
              <template #icon>
                <icon-park-outline-search />
              </template>
Cari
</NButton>
<NButton strong secondary @click="handleResetSearch">
  <template #icon>
                <icon-park-outline-redo />
              </template>
  Reset
</NButton>
</n-flex>
</n-flex>
</n-form>
</n-card> -->
    <n-card>
      <NSpace vertical size="large">
        <div class="flex gap-4">
          <NButton type="primary" @click="handleAddTable">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            Tambah
          </NButton>
          <!-- <NButton strong secondary>
            <template #icon>
              <icon-park-outline-afferent />
            </template>
            Impor Batch
          </NButton>
          <NButton strong secondary class="ml-a">
            <template #icon>
              <icon-park-outline-download />
            </template>
            Download
          </NButton> -->
        </div>
        <n-data-table :columns="columns" :data="dancePartVideos" :loading="loading" :pagination="pagination" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData"
          @fetch-data="getDancePartVideoList(dancePartId)" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

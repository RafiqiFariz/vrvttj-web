<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import { Gender } from '@/constants'
import { useBoolean } from '@/hooks'
import { fetchUserList } from '@/service'
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui'
import TableModal from './components/TableModal.vue'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const { bool: visible, setTrue: openModal } = useBoolean(false)

const initialModel = {
  condition_1: '',
  condition_2: '',
  condition_3: '',
  condition_4: '',
}
const model = ref({ ...initialModel })

const formRef = ref<FormInst | null>()
function sendMail(id?: number) {
  window.$message.success(`删除用户id:${id}`)
}
const columns: DataTableColumns<Entity.User> = [
  {
    title: '姓名',
    align: 'center',
    key: 'userName',
  },
  {
    title: '年龄',
    align: 'center',
    key: 'age',
  },
  {
    title: '性别',
    align: 'center',
    key: 'gender',
    render: (row: Entity.User) => {
      const tagType = {
        0: 'primary',
        1: 'success',
      } as const
      if (row.gender) {
        // return (
        //   <NTag type={tagType[row.gender]}>
        //     {Gender[row.gender]}
        //   </NTag>
        // )
      }
    },
  },
  {
    title: '邮箱',
    align: 'center',
    key: 'email',
  },
  {
    title: '状态',
    align: 'center',
    key: 'status',
    render: (row) => {
      // return (
      //   <NSwitch
      //     value={row.id}
      //     checked-value={1}
      //     unchecked-value={0}
      //     onUpdateValue={(value: 0 | 1) =>
      //       handleUpdateDisabled(value, row.id!)}
      //   >
      //     {{ checked: () => '启用', unchecked: () => '禁用' }}
      //   </NSwitch>
      // )
    },
  },
  {
    title: '操作',
    align: 'center',
    key: 'actions',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => handleEditTable(row)}
          >
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => sendMail(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size="small">删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

const listData = ref<Entity.User[]>([])
// function handleUpdateDisabled(value: 0 | 1, id: number) {
//   const index = listData.value.findIndex(item => item.id === id)
//   if (index > -1)
//     listData.value[index].status = value
// }

onMounted(() => {
  getUserList()
})
async function getUserList() {
  startLoading()
  await fetchUserList().then((res: any) => {
    listData.value = res.data.list
    endLoading()
  })
}
function changePage(page: number, size: number) {
  window.$message.success(`分页器:${page},${size}`)
}
function handleResetSearch() {
  model.value = { ...initialModel }
}

  type ModalType = 'add' | 'edit'
const modalType = ref<ModalType>('add')
function setModalType(type: ModalType) {
  modalType.value = type
}

const editData = ref<Entity.User | null>(null)
function setEditData(data: Entity.User | null) {
  editData.value = data
}

function handleEditTable(row: Entity.User) {
  setEditData(row)
  setModalType('edit')
  openModal()
}
function handleAddTable() {
  openModal()
  setModalType('add')
}
</script>

<template>
  <NSpace vertical size="large">
    <n-card>
      <n-form ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
        <n-flex>
          <n-form-item label="姓名" path="condition_1">
            <n-input v-model:value="model.condition_1" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="年龄" path="condition_2">
            <n-input v-model:value="model.condition_2" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="性别" path="condition_3">
            <n-input v-model:value="model.condition_3" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="地址" path="condition_4">
            <n-input v-model:value="model.condition_4" placeholder="请输入" />
          </n-form-item>
          <n-flex class="ml-auto">
            <NButton type="primary" @click="getUserList">
              <template #icon>
                <icon-park-outline-search />
              </template>
              搜索
            </NButton>
            <NButton strong secondary @click="handleResetSearch">
              <template #icon>
                <icon-park-outline-redo />
              </template>
              重置
            </NButton>
          </n-flex>
        </n-flex>
      </n-form>
    </n-card>
    <n-card>
      <NSpace vertical size="large">
        <div class="flex gap-4">
          <NButton type="primary" @click="handleAddTable">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            新建
          </NButton>
          <NButton strong secondary>
            <template #icon>
              <icon-park-outline-afferent />
            </template>
            批量导入
          </NButton>
          <NButton strong secondary class="ml-a">
            <template #icon>
              <icon-park-outline-download />
            </template>
            下载
          </NButton>
        </div>
        <n-data-table :columns="columns" :data="listData" :loading="loading" />
        <Pagination :count="100" @change="changePage" />
        <TableModal v-model:visible="visible" :type="modalType" :modal-data="editData" />
      </NSpace>
    </n-card>
  </NSpace>
</template>

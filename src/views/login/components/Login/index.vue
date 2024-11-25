<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { useAuthStore } from '@/store'
import { local } from '@/utils'

const emit = defineEmits(['update:modelValue'])

const authStore = useAuthStore()
const { errors } = storeToRefs(authStore)

function toOtherForm(type: any) {
  emit('update:modelValue', type)
}

const { t } = useI18n()
const rules = computed(() => {
  return {
    email: {
      required: true,
      trigger: 'blur',
      message: t('login.accountRuleTip'),
    },
    password: {
      required: true,
      trigger: 'blur',
      message: t('login.passwordRuleTip'),
    },
  }
})

const formValue = ref({
  email: 'admin@gmail.com',
  password: '12345678',
})

const isRemember = ref(false)
const isLoading = ref(false)

const formRef = ref<FormInst | null>(null)
function handleLogin() {
  formRef.value?.validate(async (errors) => {
    if (errors)
      return

    isLoading.value = true
    const { email, password } = formValue.value

    if (isRemember.value)
      local.set('loginAccount', { email, password })
    else local.remove('loginAccount')

    await authStore.login(email, password)
    isLoading.value = false
  })
}

const error = (path: string) => {
  return errors.value[path] ? 'error' : undefined
}

const feedback = (path: string) => {
  return errors.value[path] ? errors.value[path][0] : ''
}

onMounted(() => {
  checkUserAccount()
})

function checkUserAccount() {
  const loginAccount = local.get('loginAccount')
  if (!loginAccount)
    return

  formValue.value = loginAccount
  isRemember.value = true
}
</script>

<template>
  <div>
    <n-h2 depth="3" class="text-center">
      {{ $t('login.signInTitle') }}
    </n-h2>
    <n-form ref="formRef" :rules="rules" :model="formValue" :show-label="false" size="large">
      <n-form-item path="email" :feedback="feedback('email')" :validation-status="error('email')">
        <n-input v-model:value="formValue.email" clearable :placeholder="$t('login.emailPlaceholder')" />
      </n-form-item>
      <n-form-item path="password" :feedback="feedback('password')" :validation-status="error('password')">
        <n-input v-model:value="formValue.password" type="password" :placeholder="$t('login.passwordPlaceholder')"
          clearable show-password-on="click">
          <template #password-invisible-icon>
            <icon-park-outline-preview-close-one />
          </template>
          <template #password-visible-icon>
            <icon-park-outline-preview-open />
          </template>
        </n-input>
      </n-form-item>
      <n-space vertical :size="20">
        <div class="flex-y-center justify-between">
          <n-checkbox v-model:checked="isRemember">
            {{ $t('login.rememberMe') }}
          </n-checkbox>
          <n-button type="primary" text @click="toOtherForm('resetPwd')">
            {{ $t('login.forgotPassword') }}
          </n-button>
        </div>
        <n-button block type="primary" size="large" :loading="isLoading" :disabled="isLoading" @click="handleLogin">
          {{ $t('login.signIn') }}
        </n-button>
        <!-- <n-flex>
          <n-text>{{ $t('login.noAccountText') }}</n-text>
          <n-button type="primary" text @click="toOtherForm('register')">
            {{ $t('login.signUp') }}
          </n-button>
        </n-flex> -->
      </n-space>
    </n-form>
  </div>
</template>

<style scoped></style>

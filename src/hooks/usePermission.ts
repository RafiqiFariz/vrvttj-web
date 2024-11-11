import { useAuthStore } from '@/store'
import { isArray, isString } from 'radash'

/** 权限判断 */
export function usePermission() {
  const authStore = useAuthStore()

  function hasPermission(
    permission: Entity.RoleType | Entity.RoleType[] | undefined,
  ) {
    if (!permission)
      return true

    if (!authStore.user)
      return false
    const { role } = authStore.user

    let has = role === 'super'
    if (!has) {
      if (isArray(permission))
        has = permission.includes(role)

      if (isString(permission))
        has = permission === role
    }
    return has
  }

  return {
    hasPermission,
  }
}

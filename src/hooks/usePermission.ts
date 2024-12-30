import { useAuthStore } from '@/store'
import { isArray, isString } from 'radash'

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

    let has = role?.name === 'admin'
    if (!has && role?.name) {
      if (isArray(permission))
        has = permission.includes(role.name as Entity.RoleType)

      if (isString(permission))
        has = permission === role.name
    }
    return has
  }

  return {
    hasPermission,
  }
}

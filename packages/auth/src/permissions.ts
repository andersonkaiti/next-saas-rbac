import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '.'
import type { User } from './models/user'

type Role = 'ADMIN' | 'MEMBER'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

// by default, CASL removes all permissions, so there is no need to configure 'cannot'.
export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(_, { can }) {
    can('invite', 'User')
    can('manage', 'Project')
  },
}

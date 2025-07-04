import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

// by default, CASL removes all permissions, so there is no need to configure 'cannot'.
export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    // when CASL grants all permissions, it is necessary to remove a specific permission and then grant it back with more limited conditions, rather than only granting a single specific permission.
    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: {
        $eq: user.id,
      },
    })
  },
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', {
      ownerId: {
        $eq: user.id,
      },
    })
  },
  BILLING(_, { can }) {
    can('manage', 'Billing')
  },
}

import {
  AbilityBuilder,
  type CreateAbility,
  createMongoAbility,
  type ForcedSubject,
  type MongoAbility,
} from '@casl/ability'

// action: 'manage' means to manage all permissions
const actions = ['manage', 'invite', 'delete'] as const
// entity: 'all' means permission on all entities
const subjects = ['User', 'all'] as const

type AppAbilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
]

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

const { build, can, cannot } = new AbilityBuilder(createAppAbility)

can('invite', 'User')
cannot('delete', 'User')

export const ability = build()

import { ability, getCurrentOrg } from '@auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@components/ui/table'
import { getMembers } from '@http/get-members'
import { getMembership } from '@http/get-membership'
import { getOrganization } from '@http/get-organization'
import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown } from 'lucide-react'
import { RemoveMemberButton } from './remove-member-button'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(currentOrg as string),
    getMembers(currentOrg as string),
    getOrganization(currentOrg as string),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="w-[48px] py-2.5">
                  <Avatar>
                    <AvatarFallback />
                    {member.avatarUrl && (
                      <AvatarImage
                        src={member.avatarUrl}
                        width={32}
                        height={32}
                        alt=""
                        className="aspect-square size-full"
                      ></AvatarImage>
                    )}
                  </Avatar>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center gap-2 font-medium">
                      {member.name}
                      {member.userId === membership.userId && ' (me)'}
                      {member.userId === organization.ownerId && (
                        <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                          <Crown className="size-3" />
                          Owner
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {member.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {permissions?.can(
                      'transfer_ownership',
                      authOrganization
                    ) && (
                      <Button size="sm" variant="ghost">
                        <ArrowLeftRight className="mr-2 size-4" />
                        Transfer ownership
                      </Button>
                    )}

                    <UpdateMemberRoleSelect
                      memberId={member.id}
                      disabled={
                        member.userId === membership.userId ||
                        member.userId === organization.ownerId ||
                        permissions?.cannot('update', 'User')
                      }
                      value={member.role}
                    />

                    {permissions?.can('delete', 'User') && (
                      <RemoveMemberButton
                        memberId={member.id}
                        disabled={
                          member.userId === membership.userId ||
                          member.userId === organization.ownerId
                        }
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

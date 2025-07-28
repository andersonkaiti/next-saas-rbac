import rocketseatIcon from '@assets/rocketseat-icon.svg'
import { ability } from '@auth/auth'
import { Slash } from 'lucide-react'
import Image from 'next/image'
import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvites } from './pending-invites/pending-invites'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-8 px-8 lg:flex-row">
      <div className="flex flex-col items-center sm:flex-row sm:gap-3">
        <Image
          src={rocketseatIcon}
          className="size-6 dark:invert"
          alt="Rocketseat"
        />

        <Slash className="text-border invisible size-3 -rotate-[24deg] sm:visible" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="text-border invisible size-3 -rotate-[24deg] sm:visible" />
            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />

        <ThemeSwitcher />

        <Separator orientation="vertical" className="!h-5" />

        <ProfileButton />
      </div>
    </div>
  )
}

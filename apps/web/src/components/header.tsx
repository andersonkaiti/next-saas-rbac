import rocketseatIcon from '@assets/rocketseat-icon.svg'
import { ability } from '@auth/auth'
import { Slash } from 'lucide-react'
import Image from 'next/image'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={rocketseatIcon}
          className="size-6 dark:invert"
          alt="Rocketseat"
        />

        <Slash className="text-border size-3 -rotate-[24deg]" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <p>Projetos</p>}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <Separator orientation="vertical" className="!h-5" />

        <ProfileButton />
      </div>
    </div>
  )
}

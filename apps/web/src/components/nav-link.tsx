'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

interface INavLinkProps extends ComponentProps<typeof Link> {}

export function NavLink(props: INavLinkProps) {
  const pathname = usePathname()

  const isCurrent = props.href.toString() === pathname

  return <Link data-current={isCurrent} {...props} />
}

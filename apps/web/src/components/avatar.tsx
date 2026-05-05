import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@lib/utils'
import Image from 'next/image'

interface OptimizedAvatarImageProps {
  src: string
  alt?: string
  width: number
  height: number
  className?: string
}

export function OptimizedAvatarImage({
  src,
  alt = '',
  width,
  height,
  className,
}: OptimizedAvatarImageProps) {
  return (
    <AvatarPrimitive.Image asChild>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('aspect-square size-full', className)}
      />
    </AvatarPrimitive.Image>
  )
}

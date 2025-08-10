import type { LocalImageProps, RemoteImageProps } from 'astro:assets'
import type { UnresolvedImageTransform } from 'astro'

export const alignClass = {
  top: {
    wrapper: 'bg-top',
    image: 'object-top'
  },
  center: {
    wrapper: 'bg-center',
    image: 'object-center'
  }
}

export type CustomImageProps = {
  wrapperProps?: astroHTML.JSX.HTMLAttributes
  ambientMode?: boolean
  align?: keyof typeof alignClass
  fit?: 'cover' | 'contain'
  inferSize?: boolean
} & (LocalImageProps | RemoteImageProps | UnresolvedImageTransform)

import { exactRoutes, trackUuidPattern } from '../@types/routing.ts'

export const isKnownRoute = (pathname: string): boolean => {
  const cleanPathname = pathname.split('?')[0].split('#')[0]

  return exactRoutes.includes(cleanPathname) || trackUuidPattern.test(cleanPathname)
}

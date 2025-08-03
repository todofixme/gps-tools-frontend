import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Language } from '../@types/language.ts'

export const Route = createFileRoute('/$lang')({
  params: {
    parse: (params) => ({
      lang: params.lang as Language,
    }),
    stringify: (params) => ({
      lang: params.lang,
    }),
  },
  component: () => <Outlet />, // This is just a layout route
})

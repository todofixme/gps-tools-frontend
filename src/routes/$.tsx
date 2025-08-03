import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: () => {
    // This should never render as the __root.tsx will handle it
    return null
  },
})

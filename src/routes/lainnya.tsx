import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lainnya')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/lainnya"!</div>
}

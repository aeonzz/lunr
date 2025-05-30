import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/$userName/inbox')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/$userName/inbox"!</div>
}

import { Outlet, redirect } from 'react-router'

import { getUserFromRequest } from '~/lib/auth.server.ts'

import type { LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromRequest(request)
  if (!user) {
    throw redirect('/login')
  }
  return { user }
}

export default function AuthGuard() {
  return <Outlet />
}


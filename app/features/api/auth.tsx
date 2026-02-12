import { data, redirect } from 'react-router'

import { prisma } from '~/lib/db.server.ts'
import { createAuthCookie, createLogoutCookie, createToken, getUserFromRequest, verifyPassword } from '~/lib/auth.server.ts'

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return data({ authenticated: false, user: null }, { status: 401 })
  }
  return { authenticated: true, user: { email: user.email } }
}

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method

  if (method === 'POST') {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      return data({ error: '이메일과 비밀번호를 입력해주세요.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return data({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 })
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return data({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 })
    }

    const token = await createToken(user.id, user.email)

    return redirect('/admin', {
      headers: {
        'Set-Cookie': createAuthCookie(token),
      },
    })
  }

  if (method === 'DELETE') {
    return redirect('/login', {
      headers: {
        'Set-Cookie': createLogoutCookie(),
      },
    })
  }

  return data({ error: 'Method not allowed' }, { status: 405 })
}


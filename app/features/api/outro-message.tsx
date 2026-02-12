import { data } from 'react-router'

import { prisma } from '~/lib/db.server.ts'

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    let outroMessage = await prisma.outroMessage.findUnique({
      where: { id: 1 },
    })

    if (!outroMessage) {
      outroMessage = await prisma.outroMessage.create({
        data: {
          id: 1,
          title: '',
          subtitle: '',
        },
      })
    }

    return {
      outroMessage: {
        id: outroMessage.id.toString(),
        title: outroMessage.title,
        subtitle: outroMessage.subtitle,
      },
    }
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'
    return data({ error: message, outroMessage: null }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method

  try {
    if (method === 'PUT') {
      const formData = await request.formData()
      const outroMessageData = formData.get('data') as string

      if (!outroMessageData) {
        return data({ error: '데이터가 없습니다.' }, { status: 400 })
      }

      const body = JSON.parse(outroMessageData) as {
        title: string
        subtitle: string
      }

      const result = await prisma.outroMessage.upsert({
        where: { id: 1 },
        create: {
          id: 1,
          title: body.title || '',
          subtitle: body.subtitle || '',
        },
        update: {
          title: body.title || '',
          subtitle: body.subtitle || '',
        },
      })

      return {
        outroMessage: {
          id: result.id.toString(),
          title: result.title,
          subtitle: result.subtitle,
        },
      }
    }

    return data({ error: 'Method not allowed' }, { status: 405 })
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '작업에 실패했습니다.'
    return data({ error: message }, { status: 500 })
  }
}

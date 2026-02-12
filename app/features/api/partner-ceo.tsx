import { data } from 'react-router'

import { prisma } from '~/lib/db.server.ts'

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    let partnerCeo = await prisma.partnerCeo.findUnique({
      where: { id: 1 },
    })

    if (!partnerCeo) {
      partnerCeo = await prisma.partnerCeo.create({
        data: {
          id: 1,
          position: '',
          name: '',
          englishName: '',
          description: '',
          image: null,
        },
      })
    }

    return {
      partnerCeo: {
        id: partnerCeo.id.toString(),
        position: partnerCeo.position,
        name: partnerCeo.name,
        nameEn: partnerCeo.englishName,
        image: partnerCeo.image || '',
        description: partnerCeo.description.split('\n').filter((line) => line.trim() !== ''),
      },
    }
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'
    return data({ error: message, partnerCeo: null }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method

  try {
    if (method === 'PUT') {
      const formData = await request.formData()
      const partnerCeoData = formData.get('data') as string

      if (!partnerCeoData) {
        return data({ error: '데이터가 없습니다.' }, { status: 400 })
      }

      const body = JSON.parse(partnerCeoData) as {
        position: string
        name: string
        nameEn: string
        description: string[]
        image?: string
      }

      const result = await prisma.partnerCeo.upsert({
        where: { id: 1 },
        create: {
          id: 1,
          position: body.position || '',
          name: body.name || '',
          englishName: body.nameEn || '',
          description: body.description.join('\n') || '',
          image: body.image || null,
        },
        update: {
          position: body.position || '',
          name: body.name || '',
          englishName: body.nameEn || '',
          description: body.description.join('\n') || '',
          image: body.image || null,
        },
      })

      return {
        partnerCeo: {
          id: result.id.toString(),
          position: result.position,
          name: result.name,
          nameEn: result.englishName,
          image: result.image || '',
          description: result.description.split('\n').filter((line) => line.trim() !== ''),
        },
      }
    }

    return data({ error: 'Method not allowed' }, { status: 405 })
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '작업에 실패했습니다.'
    return data({ error: message }, { status: 500 })
  }
}

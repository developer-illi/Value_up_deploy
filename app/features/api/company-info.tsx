import { data } from 'react-router'

import { prisma } from '~/lib/db.server.ts'

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    let companyInfo = await prisma.companyInfo.findUnique({
      where: { id: 1 },
    })

    if (!companyInfo) {
      companyInfo = await prisma.companyInfo.create({
        data: {
          id: 1,
          address: '',
          phone: '',
          fax: null,
          mail: '',
          latitude: null,
          longitude: null,
        },
      })
    }

    return {
      companyInfo: {
        id: companyInfo.id.toString(),
        address: companyInfo.address,
        phone: companyInfo.phone,
        fax: companyInfo.fax || '',
        email: companyInfo.mail,
        latitude: companyInfo.latitude ? Number(companyInfo.latitude) : null,
        longitude: companyInfo.longitude ? Number(companyInfo.longitude) : null,
      },
    }
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'
    return data({ error: message, companyInfo: null }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method

  try {
    if (method === 'PUT') {
      const formData = await request.formData()
      const companyInfoData = formData.get('data') as string

      if (!companyInfoData) {
        return data({ error: '데이터가 없습니다.' }, { status: 400 })
      }

      const body = JSON.parse(companyInfoData) as {
        address: string
        phone: string
        fax?: string
        email: string
        latitude?: number | null
        longitude?: number | null
      }

      const result = await prisma.companyInfo.upsert({
        where: { id: 1 },
        create: {
          id: 1,
          address: body.address || '',
          phone: body.phone || '',
          fax: body.fax || null,
          mail: body.email || '',
          latitude: body.latitude ? body.latitude : null,
          longitude: body.longitude ? body.longitude : null,
        },
        update: {
          address: body.address || '',
          phone: body.phone || '',
          fax: body.fax || null,
          mail: body.email || '',
          latitude: body.latitude ? body.latitude : null,
          longitude: body.longitude ? body.longitude : null,
        },
      })

      return {
        companyInfo: {
          id: result.id.toString(),
          address: result.address,
          phone: result.phone,
          fax: result.fax || '',
          email: result.mail,
          latitude: result.latitude ? Number(result.latitude) : null,
          longitude: result.longitude ? Number(result.longitude) : null,
        },
      }
    }

    return data({ error: 'Method not allowed' }, { status: 405 })
  } catch (error: any) {
    const message = error instanceof Error ? error.message : '작업에 실패했습니다.'
    return data({ error: message }, { status: 500 })
  }
}

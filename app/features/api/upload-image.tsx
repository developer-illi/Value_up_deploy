import { data } from 'react-router'

import { uploadImage } from '~/utils/upload.server.ts'

import type { ActionFunctionArgs } from 'react-router'

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return data({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File | null

    if (!imageFile || imageFile.size === 0) {
      return data({ error: '이미지를 선택해주세요.' }, { status: 400 })
    }

    const imageUrl = await uploadImage(imageFile)

    return { imageUrl, success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.'
    return data({ error: message }, { status: 500 })
  }
}

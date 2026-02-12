import { uploadToSupabase, deleteFromSupabase } from '~/lib/supabase-storage.server'

const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('허용되지 않은 이미지 형식입니다. JPEG, PNG, GIF, WebP만 업로드 가능합니다.')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('파일 크기는 5MB를 초과할 수 없습니다.')
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const imageUrl = await uploadToSupabase(buffer, sanitizedName, file.type)

  return imageUrl
}

export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.includes('supabase')) return
  await deleteFromSupabase(imageUrl)
}

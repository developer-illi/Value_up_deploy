import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const BUCKET_NAME = 'images'

const s3Client = new S3Client({
  forcePathStyle: true,
  region: import.meta.env.VITE_SUPABASE_S3_REGION,
  endpoint: import.meta.env.VITE_SUPABASE_S3_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.VITE_SUPABASE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_SUPABASE_SECRET_KEY,
  },
})

function getPublicUrl(key: string): string {
  const endpoint = import.meta.env.VITE_SUPABASE_S3_ENDPOINT || ''
  const baseUrl = endpoint.replace('/storage/v1/s3', '')
  return `${baseUrl}/storage/v1/object/public/${BUCKET_NAME}/${key}`
}

export async function uploadToSupabase(file: Buffer, fileName: string, contentType: string): Promise<string> {
  const key = `uploads/${Date.now()}-${fileName}`

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  })

  await s3Client.send(command)

  return getPublicUrl(key)
}

export async function deleteFromSupabase(fileUrl: string): Promise<void> {
  const key = fileUrl.split(`/${BUCKET_NAME}/`)[1]
  if (!key) return

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  await s3Client.send(command)
}

export { s3Client, BUCKET_NAME }

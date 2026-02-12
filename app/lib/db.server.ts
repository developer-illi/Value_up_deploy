import { PrismaClient } from '../../prisma/generated/prisma/client'

const globalForPrisma = globalThis as unknown as {
  __prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const databaseUrl =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_DATABASE_URL
      ? import.meta.env.VITE_DATABASE_URL
      : process.env.VITE_DATABASE_URL

  return new PrismaClient({
    accelerateUrl: databaseUrl,
  })
}

function getPrismaClient() {
  if (!globalForPrisma.__prisma) {
    globalForPrisma.__prisma = createPrismaClient()
  }
  return globalForPrisma.__prisma
}

export const prisma = getPrismaClient()
export default prisma

import 'dotenv/config'
import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  // 설정을 최소화하여 빌드 시점의 의존성을 제거합니다.
  datasource: {
    url: process.env.DATABASE_URL,
  },
})

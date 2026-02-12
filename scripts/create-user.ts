import bcrypt from 'bcryptjs'
import 'dotenv/config'

import { prisma } from '~/lib/db.server.ts'

async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: { email, password: hashedPassword },
  })

  console.log(`User created/updated: ${user.email} (ID: ${user.id})`)
  return user
}

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.log('Usage: pnpm tsx scripts/create-user.ts <email> <password>')
  console.log('Example: pnpm tsx scripts/create-user.ts admin@example.com mypassword123')
  process.exit(1)
}

createUser(email, password)
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })

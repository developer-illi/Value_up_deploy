import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// 1. 데이터베이스 커넥션 풀 설정
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL || process.env.VITE_DIRECT_DATABASE_URL 
});

// 2. PostgreSQL 어댑터 생성
const adapter = new PrismaPg(pool);

// 3. PrismaClient 인스턴스 생성 시 어댑터 주입 (가장 중요!)
export const prisma = new PrismaClient({ adapter });

# 1단계: 의존성 설치 및 빌드 환경
FROM node:24-alpine AS build-env
WORKDIR /app

# pnpm 사용을 위한 설정
RUN npm install -g pnpm

# 의존성 파일 복사 및 설치
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# 전체 소스 복사 및 빌드
COPY . .
# Prisma 클라이언트를 먼저 생성하고 React Router를 빌드합니다.
RUN pnpm prisma generate
RUN pnpm run build

# 2단계: 실제 실행 환경
FROM node:24-alpine
WORKDIR /app

RUN npm install -g pnpm

# 실행에 필요한 파일들만 빌드 단계에서 복사
COPY --from=build-env /app/package.json ./
COPY --from=build-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
# [중요] Prisma가 생성한 클라이언트 바이너리 폴더를 반드시 복사해야 합니다.
COPY --from=build-env /app/node_modules/.prisma ./node_modules/.prisma

# 환경 변수 설정
ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "run", "start"]

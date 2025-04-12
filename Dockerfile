# 基础镜像
FROM oven/bun:slim AS base

# 依赖安装阶段
FROM base AS deps
WORKDIR /app

# 只复制包管理相关文件
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 构建阶段
FROM base AS builder
WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
RUN bun run build

# 运行阶段
FROM base AS runner
WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制公共资源
COPY --from=builder /app/public ./public

# 复制构建产物，使用 standalone 输出
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 复制环境变量文件
COPY --chown=nextjs:nodejs .env ./

# 切换到非 root 用户
USER nextjs

# 设置环境变量
EXPOSE 3000
ENV PORT=3000


# 启动服务
CMD ["bun", "server.js"]
# 使用 Node LTS 版本作为基础镜像
FROM oven/bun:slim

# 设置工作目录
WORKDIR /app

# 复制 package 文件并安装依赖（生产环境）
COPY package.json bun.lockb ./
RUN bun install --production

# 复制构建产物（本地构建产物上传）
COPY .next .next
COPY public public
COPY .env .env

# 监听端口（默认 Next.js 端口）
EXPOSE 3000

# 启动命令
CMD ["bun", "start"]

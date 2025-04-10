# 🔧 构建阶段
FROM oven/bun:latest AS builder
# 设置工作目录
WORKDIR /usr/src/blog
# 复制项目文件
COPY . .
# 安装依赖
RUN bun install
# 构建应用
RUN bun run build

# 🚀 运行阶段
FROM oven/bun:slim
# 设置工作目录
WORKDIR /usr/src/blog
# 创建用户并赋权
RUN adduser --disabled-password --gecos "" appuser \
  && chown -R appuser:appuser /usr/src/blog
# 切换为非 root 用户
USER appuser
# 复制构建产物
COPY --from=builder /usr/src/blog ./
# 暴露端口
EXPOSE 3000
# 运行应用
CMD ["bun", "run", "start"]


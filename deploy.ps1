# 设置变量
$remoteUser = "root"
$remoteHost = "8.138.192.207"
$remotePath = "/usr/blog"
$localAppPath = "D:\Code\React\blog"
$imageName = "blog"
$registry = "$remoteHost`:5000"
$imageTag = "latest"
$fullImageName = "${registry}/${imageName}:${imageTag}"

# 在构建 Docker 镜像之前，添加调试信息
Write-Host "当前目录: $(Get-Location)"

# 确保在正确的目录下执行 Docker 构建
Set-Location -Path $localAppPath
Write-Host "切换到目录: $(Get-Location)"

Write-Host "🧹 清理本地旧镜像..."
docker images --filter=reference="$fullImageName*" | ForEach-Object {
    $imageLine = $_ -split '\s+'
    if ($imageLine.Length -ge 2) {
        $imageTag = "$($imageLine[0]):$($imageLine[1])"
        Write-Host "删除镜像: $imageTag"
        docker rmi -f $imageTag 2>$null
    }
}
docker image prune -f --filter "label=app=$fullImageName"

# 构建 Docker 镜像
Write-Host "🐳 正在构建 Docker 镜像..."
docker build -t $fullImageName .
if ($LASTEXITCODE -ne 0) { Write-Error "Docker 镜像构建失败"; exit 1 }

# 推送 Docker 镜像到 Registry
Write-Host "⬆️ 正在推送 Docker 镜像..."
docker push $fullImageName
if ($LASTEXITCODE -ne 0) { Write-Error "Docker 镜像推送失败"; exit 1 }

# 创建远程部署脚本（使用双引号以允许变量替换）
$deployScript = @"
#!/bin/bash
set -e

echo '检查 Docker 环境...'
if ! command -v docker >/dev/null 2>&1; then
    echo '错误：Docker 未安装'
    exit 1
fi

echo '清理旧容器...'
docker rm -f $imageName 2>/dev/null || true

echo '清理旧镜像...'
# 删除带有 tag 的旧镜像
docker images --filter=reference='localhost:5000/blog*' -q | xargs -r docker rmi -f

# 删除没有 tag 的旧镜像（dangling images）
docker image prune -f --filter "label=app=localhost:5000/blog"

echo '拉取最新镜像...'
docker pull localhost:5000/blog

echo '检查端口占用...'
if ss -tuln | grep -q ':3000'; then
    echo '警告：端口 3000 已被占用'
    exit 1
fi

echo '启动新容器...'
docker run -d \
    -p 3000:3000 \
    --name $imageName \
    --restart unless-stopped \
    -e RESEND_API_KEY=re_cQV2EkBJ_LdtiP8iaW6C75KGeTxw8tZSS \
    -e EMAIL_TO=shen353824385@gmail.com \
    localhost:5000/blog
"@

# 确保使用 LF 换行符
$deployScript = $deployScript.Replace("`r`n", "`n")

# 创建远程目录
Write-Host "📁 创建远程目录..."
ssh "$remoteUser@$remoteHost" "mkdir -p $remotePath"
if ($LASTEXITCODE -ne 0) { Write-Error "远程目录创建失败"; exit 1 }

# 将脚本保存为本地临时文件（使用 UTF8 编码且不带 BOM）
$tempDeployScriptPath = "$env:TEMP\deploy_remote.sh"
[System.IO.File]::WriteAllText(
    $tempDeployScriptPath,
    $deployScript,
    [System.Text.UTF8Encoding]::new($false)
)

# 上传部署脚本
Write-Host "📤 正在上传部署脚本..."
scp "$tempDeployScriptPath" "$remoteUser@${remoteHost}:$remotePath/deploy.sh"
if ($LASTEXITCODE -ne 0) { Write-Error "脚本上传失败"; exit 1 }

# 执行远程部署
Write-Host "🚀 正在远程部署..."
ssh "$remoteUser@$remoteHost" "chmod +x $remotePath/deploy.sh && bash $remotePath/deploy.sh"
if ($LASTEXITCODE -ne 0) { Write-Error "远程部署失败"; exit 1 }

# 清理本地临时文件
Remove-Item "$tempDeployScriptPath" -Force

Write-Host "✅ 部署成功，你可以访问：https://xiaoshen.site"
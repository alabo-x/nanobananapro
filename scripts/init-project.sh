#!/bin/bash

# NanoBanana2 项目初始化脚本（轻量版）
# 用途: 快速替换品牌信息

set -e

echo "🚀 NanoBanana2 项目初始化"
echo "=========================="
echo ""

# 1. 收集信息
read -p "项目名称 (如: my-ai-app): " PROJECT_NAME
read -p "项目显示名称 (如: My AI App): " PROJECT_DISPLAY_NAME
read -p "作者名称 (如: Your Name): " AUTHOR_NAME
read -p "项目 URL (如: https://myapp.com): " PROJECT_URL
read -p "Git 仓库 (如: https://github.com/user/repo.git): " GIT_REPO

echo ""
echo "📝 应用配置..."

# 2. 替换基础配置文件
echo "📝 替换基础配置文件..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" package.json
    sed -i '' "s/{{AUTHOR_NAME}}/$AUTHOR_NAME/g" package.json
    sed -i '' "s|{{PROJECT_URL}}|$PROJECT_URL|g" package.json
    sed -i '' "s|{{GIT_REPOSITORY}}|$GIT_REPO|g" package.json
    sed -i '' "s/{{PROJECT_DISPLAY_NAME}}/$PROJECT_DISPLAY_NAME/g" .env.example
    sed -i '' "s/{{PROJECT_DISPLAY_NAME}}/$PROJECT_DISPLAY_NAME/g" src/config/index.ts
    sed -i '' "s/{{PROJECT_NAME}}/$PROJECT_DISPLAY_NAME/g" README.md
else
    # Linux
    sed -i "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" package.json
    sed -i "s/{{AUTHOR_NAME}}/$AUTHOR_NAME/g" package.json
    sed -i "s|{{PROJECT_URL}}|$PROJECT_URL|g" package.json
    sed -i "s|{{GIT_REPOSITORY}}|$GIT_REPO|g" package.json
    sed -i "s/{{PROJECT_DISPLAY_NAME}}/$PROJECT_DISPLAY_NAME/g" .env.example
    sed -i "s/{{PROJECT_DISPLAY_NAME}}/$PROJECT_DISPLAY_NAME/g" src/config/index.ts
    sed -i "s/{{PROJECT_NAME}}/$PROJECT_DISPLAY_NAME/g" README.md
fi

# 3. 替换国际化文件
echo "🌍 替换国际化文件中的品牌名..."

# 需要替换的 i18n 文件列表
I18N_FILES=(
    "src/config/locale/messages/en/common.json"
    "src/config/locale/messages/zh/common.json"
    "src/config/locale/messages/en/landing.json"
    "src/config/locale/messages/zh/landing.json"
    "src/config/locale/messages/en/pricing.json"
    "src/config/locale/messages/zh/pricing.json"
    "src/config/locale/messages/en/blog.json"
    "src/config/locale/messages/zh/blog.json"
    "src/config/locale/messages/en/showcases.json"
    "src/config/locale/messages/zh/showcases.json"
    "src/config/locale/messages/en/admin/sidebar.json"
    "src/config/locale/messages/zh/admin/sidebar.json"
)

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    for file in "${I18N_FILES[@]}"; do
        if [ -f "$file" ]; then
            sed -i '' "s/{{PROJECT_DISPLAY_NAME}}/$PROJECT_DISPLAY_NAME/g" "$file"
        fi
    done
else
    # Linux
    for file in "${I18N_FILES[@]}"; do
        if [ -f "$file" ]; then
            sed -i "s/{{PROJECT_DISPLAY_NAME}}/$PROJECT_DISPLAY_NAME/g" "$file"
        fi
    done
fi

# 4. 创建 .env.local
echo ""
echo "📋 创建 .env.local..."
cp .env.example .env.local

# 5. 配置 Git
echo ""
echo "🔧 配置 Git 仓库..."
git remote remove upstream 2>/dev/null || true
git remote set-url origin "$GIT_REPO" 2>/dev/null || true

# 6. 删除初始化脚本自身
echo ""
echo "🧹 清理..."
rm -f scripts/init-project.sh

# 7. 提示下一步
echo ""
echo "✅ 初始化完成！"
echo ""
echo "下一步："
echo "1. 编辑 .env.local 填入真实配置（数据库、API 密钥等）"
echo "2. pnpm install"
echo "3. pnpm db:migrate"
echo "4. pnpm rbac:init --admin-email=your@email.com"
echo "5. pnpm dev"
echo ""
echo "📖 详细文档: ./CLAUDE.md"

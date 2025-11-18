# NanoBanana2 轻量级模板化方案

## 文档版本
- **创建日期**: 2025-11-18
- **最后更新**: 2025-11-18
- **方案类型**: 最小化改造（仅品牌信息替换）
- **执行时间**: 约 45 分钟（基础文件 10 分钟 + i18n 文件 15 分钟 + 脚本创建 10 分钟 + 测试 10 分钟）

---

## 核心原则

### ✅ 保留（不改动）
- ✅ 所有示例页面（AI 生成器、聊天等）
- ✅ 所有示例内容（博客文章、落地页）
- ✅ 所有功能代码
- ✅ Built-with 组件
- ✅ 营销文案内容（保留作为参考）

### ✏️ 仅替换（最小改动）
- ✏️ `package.json` - 项目名称、作者、仓库地址
- ✏️ `README.md` - 基础说明
- ✏️ `.env.example` - 默认应用名称
- ✏️ `src/config/index.ts` - 默认应用名称
- ✏️ **国际化文件中的 "ShipAny" 品牌名** → `{{PROJECT_DISPLAY_NAME}}`

### 🎯 目标
**下次创建新项目时，运行一个脚本，5 分钟内把 ShipAny 品牌替换成新项目信息。**

---

## 改造内容

### 一、基础配置文件（4 个）

#### 1. package.json

**当前**:
```json
{
  "name": "shipany-template-two",
  "version": "1.2.0",
  "author": "ShipAny.ai",
  "homepage": "https://shipany.ai",
  "repository": {
    "type": "git",
    "url": "https://github.com/shipanyai/shipany-template-two"
  }
}
```

**改为**:
```json
{
  "name": "{{PROJECT_NAME}}",
  "version": "0.1.0",
  "author": "{{AUTHOR_NAME}}",
  "homepage": "{{PROJECT_URL}}",
  "repository": {
    "type": "git",
    "url": "{{GIT_REPOSITORY}}"
  }
}
```

---

#### 2. README.md

**改为简单的模板说明**:
```markdown
# {{PROJECT_NAME}}

> 基于 NanoBanana2 模板的项目

## 快速开始

\`\`\`bash
# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入真实配置

# 数据库迁移
pnpm db:migrate

# 初始化 RBAC
pnpm rbac:init --admin-email=admin@example.com

# 启动开发
pnpm dev
\`\`\`

## 文档

- [开发指南](./CLAUDE.md)
- [Git 工作流](./docs/GIT_WORKFLOW.md)

## 许可证

基于 [ShipAny LICENSE](./LICENSE)
```

---

#### 3. .env.example

**当前**:
```bash
NEXT_PUBLIC_APP_NAME = "Your App Name"
```

**改为**:
```bash
NEXT_PUBLIC_APP_NAME = "{{PROJECT_DISPLAY_NAME}}"
```

---

#### 4. src/config/index.ts

**当前 (第 22 行)**:
```typescript
app_name: process.env.NEXT_PUBLIC_APP_NAME ?? 'ShipAny App',
```

**改为**:
```typescript
app_name: process.env.NEXT_PUBLIC_APP_NAME ?? '{{PROJECT_DISPLAY_NAME}}',
```

---

### 二、国际化文件（12 个）

所有 i18n 文件中的 "ShipAny" 品牌名替换为 `{{PROJECT_DISPLAY_NAME}}`

#### 5. src/config/locale/messages/en/common.json

**替换内容**:
```json
{
  "metadata": {
    "title": "{{PROJECT_DISPLAY_NAME}}",
    "description": "{{PROJECT_DISPLAY_NAME}} is a NextJS boilerplate for building AI SaaS startups...",
    "keywords": "{{项目关键词}}"
  }
}
```

#### 6. src/config/locale/messages/zh/common.json

**替换内容**:
```json
{
  "metadata": {
    "title": "{{PROJECT_DISPLAY_NAME}}",
    "description": "{{PROJECT_DISPLAY_NAME}} 是用于构建 AI SaaS 创业项目的 NextJS 脚手架...",
    "keywords": "{{项目关键词}}"
  }
}
```

#### 7-8. landing.json (中英文)

**替换位置**:
- `header.brand.title`: "ShipAny Two" → `{{PROJECT_DISPLAY_NAME}}`
- `header.brand.logo.alt`: "ShipAny Two" → `{{PROJECT_DISPLAY_NAME}}`
- `hero.description`: 描述中的 "ShipAny" → `{{PROJECT_DISPLAY_NAME}}`
- `hero.announcement.title`: "ShipAny Template Two" → `{{PROJECT_DISPLAY_NAME}}`
- `introduce.title`: "What is ShipAny" → "What is {{PROJECT_DISPLAY_NAME}}"
- `benefits.title`: "Why Choose ShipAny" → "Why Choose {{PROJECT_DISPLAY_NAME}}"
- `usage.title`: "How to Launch with ShipAny" → "How to Launch with {{PROJECT_DISPLAY_NAME}}"
- `features.title`: "Key Features of ShipAny" → "Key Features of {{PROJECT_DISPLAY_NAME}}"
- `testimonials.title`: "People Love ShipAny" → "People Love {{PROJECT_DISPLAY_NAME}}"
- `testimonials.subtitle`: "What Users Say About ShipAny" → "What Users Say About {{PROJECT_DISPLAY_NAME}}"
- `faq.title`: "Frequently Asked Questions About ShipAny" → "Frequently Asked Questions About {{PROJECT_DISPLAY_NAME}}"
- 所有 FAQ 内容中的 "ShipAny" → `{{PROJECT_DISPLAY_NAME}}`
- Footer 中的 "ShipAny Two" → `{{PROJECT_DISPLAY_NAME}}`

**注意**: 保留营销文案内容，只替换品牌名称

#### 9-10. pricing.json (中英文)

**替换位置**:
- `metadata.sr_only_title`: "ShipAny Pricing" → `{{PROJECT_DISPLAY_NAME}} Pricing`
- `metadata.description`: "Get all features of ShipAny..." → "Get all features of {{PROJECT_DISPLAY_NAME}}..."
- 所有 `pricing.plans[].cta.title`: "Get ShipAny" → "Get {{PROJECT_DISPLAY_NAME}}"
- 所有 `pricing.plans[].product_name`: "ShipAny Boilerplate..." → "{{PROJECT_DISPLAY_NAME}} Boilerplate..."

#### 11-12. blog.json (中英文)

**替换位置**:
- `metadata.sr_only_title`: "ShipAny Blog" → `{{PROJECT_DISPLAY_NAME}} Blog`

#### 13-14. showcases.json (中英文)

**替换位置**:
- `metadata.description`: "Awesome projects built with ShipAny" → "Awesome projects built with {{PROJECT_DISPLAY_NAME}}"
- `showcases.title`: "AI SaaS Startups built with ShipAny" → "AI SaaS Startups built with {{PROJECT_DISPLAY_NAME}}"

#### 15-16. admin/sidebar.json (中英文)

**替换位置**:
- `sidebar.brand.title`: "ShipAny Two" → `{{PROJECT_DISPLAY_NAME}}`
- `sidebar.brand.logo.alt`: "ShipAny Two" → `{{PROJECT_DISPLAY_NAME}}`

---

## 创建初始化脚本

**文件**: `scripts/init-project.sh`

```bash
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
```

**使用方式**:
```bash
# 克隆模板
git clone https://github.com/alabo-x/nanobanana2.git my-new-project
cd my-new-project

# 运行初始化
chmod +x scripts/init-project.sh
./scripts/init-project.sh

# 按提示输入信息，脚本自动完成替换
```

---

## 执行步骤（预计 45 分钟）

### 步骤 1: 准备占位符 - 基础文件 (10 分钟)

```bash
# 1.1 修改 package.json
# 将以下字段改为占位符
"name": "{{PROJECT_NAME}}"
"version": "0.1.0"
"author": "{{AUTHOR_NAME}}"
"homepage": "{{PROJECT_URL}}"
"repository": {
  "url": "{{GIT_REPOSITORY}}"
}
```

```bash
# 1.2 修改 src/config/index.ts (第 22 行)
app_name: process.env.NEXT_PUBLIC_APP_NAME ?? '{{PROJECT_DISPLAY_NAME}}'
```

```bash
# 1.3 修改 .env.example (第 2 行)
NEXT_PUBLIC_APP_NAME = "{{PROJECT_DISPLAY_NAME}}"
```

```bash
# 1.4 重写 README.md
# 复制上面提供的模板内容
```

---

### 步骤 1.5: 准备占位符 - 国际化文件 (15 分钟)

使用全局查找替换功能，在以下 12 个 i18n 文件中将 "ShipAny" 替换为 `{{PROJECT_DISPLAY_NAME}}`：

```bash
# 使用 VS Code 或其他编辑器的全局替换功能
# 搜索: "ShipAny"
# 替换为: "{{PROJECT_DISPLAY_NAME}}"
# 范围: src/config/locale/messages/**/*.json

# 或使用命令行（macOS）:
find src/config/locale/messages -name "*.json" -type f -exec sed -i '' 's/ShipAny/{{PROJECT_DISPLAY_NAME}}/g' {} +

# Linux:
find src/config/locale/messages -name "*.json" -type f -exec sed -i 's/ShipAny/{{PROJECT_DISPLAY_NAME}}/g' {} +
```

**检查替换结果**:
```bash
# 验证替换是否成功
grep -r "ShipAny" src/config/locale/messages/
# 应该没有任何结果

# 验证占位符已添加
grep -r "{{PROJECT_DISPLAY_NAME}}" src/config/locale/messages/ | wc -l
# 应该显示大约 40+ 处
```

---

### 步骤 2: 创建初始化脚本 (10 分钟)

```bash
# 创建脚本文件
touch scripts/init-project.sh
chmod +x scripts/init-project.sh

# 复制上面提供的脚本内容到文件中
```

---

### 步骤 3: 测试验证 (5 分钟)

```bash
# 3.1 验证基础文件占位符
grep -r "{{PROJECT" package.json .env.example src/config/index.ts

# 应该看到 5 个占位符:
# - {{PROJECT_NAME}}
# - {{PROJECT_DISPLAY_NAME}}
# - {{AUTHOR_NAME}}
# - {{PROJECT_URL}}
# - {{GIT_REPOSITORY}}

# 3.2 验证 i18n 文件
grep -r "ShipAny" src/config/locale/messages/
# 应该没有结果（全部已替换）

grep -r "{{PROJECT_DISPLAY_NAME}}" src/config/locale/messages/ | wc -l
# 应该显示 40+ 处占位符
```

---

### 步骤 4: 提交 (5 分钟)

```bash
git add package.json README.md .env.example src/config/index.ts \
  src/config/locale/messages/ scripts/init-project.sh

git commit -m "feat: add minimal template placeholders and init script

- Replace brand info with placeholders in 4 basic files
- Replace 'ShipAny' with placeholders in 12 i18n files
- Add init-project.sh for quick project setup
- Keep all functionality and examples intact

Modified files:
  - package.json (metadata)
  - README.md (template intro)
  - .env.example (app name)
  - src/config/index.ts (default app name)
  - src/config/locale/messages/**/*.json (brand names)

Usage:
  git clone <template-repo> my-project
  cd my-project
  ./scripts/init-project.sh"

git push origin dev
```

---

## 对比：完整方案 vs 轻量方案

| 项目 | 完整方案 | 轻量方案 ⭐ |
|------|----------|-----------|
| **修改文件数** | 20+ 个 | 16 个 (4基础+12国际化) |
| **删除内容** | 示例页面、文章 | 无 |
| **执行时间** | 2.5 小时 | 45 分钟 |
| **保留功能** | ✅ | ✅ |
| **保留示例** | ❌ | ✅ |
| **保留营销文案** | ❌ | ✅ |
| **初始化时间** | 5 分钟 | 5 分钟 |

---

## 使用流程

### 第一次：改造模板（只做一次）

```bash
# 在 NanoBanana2 项目中
cd nanobanana2

# 执行改造（45 分钟）
# 1. 修改 4 个基础文件为占位符
# 2. 替换 12 个 i18n 文件中的 ShipAny
# 3. 创建 init-project.sh
# 4. 提交推送

# 完成！
```

### 以后：创建新项目（每次 5 分钟）

```bash
# 1. 克隆模板
git clone https://github.com/alabo-x/nanobanana2.git my-new-project
cd my-new-project

# 2. 运行初始化脚本
./scripts/init-project.sh
# 输入:
# - 项目名称: my-ai-app
# - 显示名称: My AI App
# - 作者: Your Name
# - URL: https://myapp.com
# - 仓库: https://github.com/you/my-ai-app.git

# 3. 完成！所有品牌信息已替换
```

---

## 占位符说明

| 占位符 | 说明 | 示例 |
|--------|------|------|
| `{{PROJECT_NAME}}` | 包名称 (kebab-case) | `my-ai-app` |
| `{{PROJECT_DISPLAY_NAME}}` | 显示名称 | `My AI App` |
| `{{AUTHOR_NAME}}` | 作者名称 | `Your Name` / `alabo-x` |
| `{{PROJECT_URL}}` | 项目主页 | `https://myapp.com` |
| `{{GIT_REPOSITORY}}` | Git 仓库地址 | `https://github.com/you/repo.git` |

---

## 修改文件清单

### 必改文件 - 基础配置（4 个）
- ✏️ `package.json` - 项目元信息
- ✏️ `README.md` - 全文替换为模板说明
- ✏️ `.env.example` - 默认应用名称
- ✏️ `src/config/index.ts` - 默认应用名称 fallback

### 必改文件 - 国际化（12 个）
- ✏️ `src/config/locale/messages/en/common.json` - 元数据
- ✏️ `src/config/locale/messages/zh/common.json` - 元数据
- ✏️ `src/config/locale/messages/en/landing.json` - 品牌名
- ✏️ `src/config/locale/messages/zh/landing.json` - 品牌名
- ✏️ `src/config/locale/messages/en/pricing.json` - 品牌名
- ✏️ `src/config/locale/messages/zh/pricing.json` - 品牌名
- ✏️ `src/config/locale/messages/en/blog.json` - 品牌名
- ✏️ `src/config/locale/messages/zh/blog.json` - 品牌名
- ✏️ `src/config/locale/messages/en/showcases.json` - 品牌名
- ✏️ `src/config/locale/messages/zh/showcases.json` - 品牌名
- ✏️ `src/config/locale/messages/en/admin/sidebar.json` - 品牌名
- ✏️ `src/config/locale/messages/zh/admin/sidebar.json` - 品牌名

### 需要创建的文件（1 个）
- ✅ `scripts/init-project.sh` - 初始化脚本（已提供完整代码，包含 i18n 处理）

### 不改动的内容
- ✅ 所有示例页面保留
- ✅ 所有示例文章保留
- ✅ Built-with 组件保留
- ✅ 所有营销文案保留（只替换品牌名）
- ✅ 所有功能代码保留

---

## 优势

### 相比完整方案
- ✅ **改动精准**: 只改 16 个文件（全是配置文件）
- ✅ **执行快速**: 45 分钟完成（vs 2.5 小时）
- ✅ **功能完整**: 保留所有示例和功能
- ✅ **营销文案保留**: 作为参考示例
- ✅ **易于维护**: 改动少，合并上游更新容易

### 相比手动替换
- ✅ **自动化**: 一个脚本搞定
- ✅ **不遗漏**: 所有占位符都会被替换
- ✅ **可重复**: 每次创建项目都一致
- ✅ **快速**: 5 分钟 vs 20 分钟

---

## 示例：创建新项目

```bash
$ git clone https://github.com/alabo-x/nanobanana2.git awesome-ai-tool
$ cd awesome-ai-tool
$ ./scripts/init-project.sh

🚀 NanoBanana2 项目初始化
==========================

项目名称 (如: my-ai-app): awesome-ai-tool
项目显示名称 (如: My AI App): Awesome AI Tool
作者名称 (如: Your Name): John Doe
项目 URL (如: https://myapp.com): https://awesome-ai-tool.com
Git 仓库 (如: https://github.com/user/repo.git): https://github.com/johndoe/awesome-ai-tool.git

📝 应用配置...
📋 创建 .env.local...
🔧 配置 Git 仓库...
🧹 清理...

✅ 初始化完成！

下一步：
1. 编辑 .env.local 填入真实配置（数据库、API 密钥等）
2. pnpm install
3. pnpm db:migrate
4. pnpm rbac:init --admin-email=john@example.com
5. pnpm dev

📖 详细文档: ./CLAUDE.md
```

---

## 验证清单

改造完成后，检查：

**基础文件**:
- [ ] `package.json` 包含 5 个占位符
- [ ] `src/config/index.ts` 包含 `{{PROJECT_DISPLAY_NAME}}`
- [ ] `.env.example` 包含 `{{PROJECT_DISPLAY_NAME}}`
- [ ] `README.md` 是新的模板内容
- [ ] `scripts/init-project.sh` 存在且可执行

**国际化文件**:
- [ ] `grep -r "ShipAny" src/config/locale/messages/` 没有结果
- [ ] `grep -r "{{PROJECT_DISPLAY_NAME}}" src/config/locale/messages/ | wc -l` 显示 40+ 处
- [ ] 所有 12 个 i18n 文件已修改

**其他**:
- [ ] 运行 `git status` 显示 17 个文件被修改（4基础+12国际化+1脚本）
- [ ] 所有示例内容保持原样
- [ ] 所有功能代码未修改

---

## 注意事项

### ✅ 推荐做法
1. 改造前创建备份分支: `git branch backup-before-template`
2. 小步提交，便于回滚
3. 测试脚本是否正常工作

### ⚠️ 注意
1. 不要删除任何示例内容
2. 不要修改功能代码
3. 保持 upstream 连接（可以继续获取 ShipAny 更新）

---

## 回滚方案

如果需要恢复：

```bash
# 方法 1: 撤销提交
git log --oneline  # 找到改造前的 commit
git reset --hard <commit-hash>

# 方法 2: 从备份恢复
git checkout backup-before-template

# 方法 3: 从上游重新同步
git fetch upstream
git reset --hard upstream/dev
```

---

## 总结

### 这个方案的特点

- ✅ **精准改动**: 只改 16 个配置文件（不动功能代码）
- ✅ **保留功能**: 所有功能和示例都保留
- ✅ **保留文案**: 营销文案作为参考示例
- ✅ **快速执行**: 45 分钟完成改造
- ✅ **自动初始化**: 创建新项目只需 5 分钟
- ✅ **易于维护**: 改动少，冲突少

### 适合你，因为

- 你不想大改代码
- 你想保留所有示例作为参考
- 你只需要替换品牌信息
- 你想快速创建新项目

---

## 立即行动

准备好开始了吗？只需要：

1. **修改 4 个基础文件** (10 分钟)
2. **替换 12 个 i18n 文件** (15 分钟)
3. **创建 1 个脚本** (10 分钟)
4. **测试并提交** (10 分钟)

**总共 45 分钟！**

之后每次创建新项目只需 5 分钟！🚀

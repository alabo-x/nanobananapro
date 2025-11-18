# NanoBanana2 模板化改造方案

## 文档版本
- **创建日期**: 2025-11-18
- **当前状态**: 规划阶段
- **执行状态**: 未开始

---

## 目标

将 NanoBanana2 从"ShipAny 模板的副本"改造为"你的个人 AI SaaS 项目模板"，使其成为未来所有类似项目的基础。

### 核心原则

1. **保留框架能力**: 认证、支付、RBAC、AI 集成等核心功能
2. **移除具体实现**: 示例页面、演示内容、特定业务逻辑
3. **清理品牌信息**: 所有 ShipAny 品牌替换为可配置的占位符
4. **添加初始化工具**: 自动化新项目创建流程
5. **保持上游连接**: 仍可获取 ShipAny 官方更新

---

## 三层架构设计

```
┌─────────────────────────────────────────────────────┐
│  ShipAny 官方模板 (upstream)                         │
│  - 官方功能更新                                      │
│  - 安全补丁                                          │
│  - 框架升级                                          │
└────────────────┬────────────────────────────────────┘
                 │ git fetch upstream
                 │ git merge upstream/dev
                 ↓
┌─────────────────────────────────────────────────────┐
│  NanoBanana2 基础模板 (origin)                      │
│  - 清理后的干净模板                                 │
│  - 你的通用定制                                      │
│  - 初始化脚本                                        │
│  - 可复用组件                                        │
└────────────────┬────────────────────────────────────┘
                 │ git clone
                 │ scripts/init-new-project.sh
                 ↓
┌─────────────────────────────────────────────────────┐
│  具体项目 (ProjectX, ProjectY, ProjectZ...)        │
│  - 项目特定功能                                      │
│  - 业务逻辑                                          │
│  - 无 upstream 连接                                  │
└─────────────────────────────────────────────────────┘
```

---

## 详细改造计划

### 阶段 1: 品牌信息清理 (预计 30 分钟)

#### 1.1 package.json
**当前状态**:
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

**改造后**:
```json
{
  "name": "{{PROJECT_NAME}}",
  "version": "0.1.0",
  "author": "alabo-x",
  "homepage": "{{PROJECT_URL}}",
  "repository": {
    "type": "git",
    "url": "{{GIT_REPOSITORY}}"
  }
}
```

**操作步骤**:
```bash
# 使用占位符替换
sed -i '' 's/"shipany-template-two"/"{{PROJECT_NAME}}"/g' package.json
sed -i '' 's/"ShipAny.ai"/"alabo-x"/g' package.json
sed -i '' 's/"1.2.0"/"0.1.0"/g' package.json
```

#### 1.2 src/config/index.ts
**文件位置**: `src/config/index.ts:22`

**当前代码**:
```typescript
app_name: process.env.NEXT_PUBLIC_APP_NAME ?? 'ShipAny App',
```

**改造后**:
```typescript
app_name: process.env.NEXT_PUBLIC_APP_NAME ?? '{{PROJECT_DISPLAY_NAME}}',
```

#### 1.3 README.md
**当前状态**: 完全是 ShipAny 的介绍

**改造后**: 创建模板 README
```markdown
# {{PROJECT_NAME}}

> 基于 ShipAny Template Two 的 AI SaaS 项目

## 快速开始

参考 [SETUP.md](./docs/SETUP.md) 完成项目初始化

## 技术栈

- Next.js 16.0.0
- React 19.2.0
- TypeScript 5
- PostgreSQL + Drizzle ORM
- Better Auth
- Tailwind CSS 4

## 文档

- [开发指南](./CLAUDE.md)
- [Git 工作流](./docs/GIT_WORKFLOW.md)
- [模板化方案](./docs/TEMPLATE_PLAN.md)

## 许可证

本项目基于 ShipAny Template Two 开发，遵循 [ShipAny LICENSE](./LICENSE)
```

#### 1.4 .env.example
**当前状态**:
```bash
NEXT_PUBLIC_APP_NAME = "Your App Name"
```

**改造后**:
```bash
NEXT_PUBLIC_APP_NAME = "{{PROJECT_DISPLAY_NAME}}"
```

#### 1.5 国际化文件
**需要修改的文件**:
- `src/config/locale/messages/zh/common.json`
- `src/config/locale/messages/en/common.json`
- `src/config/locale/messages/zh/landing.json`
- `src/config/locale/messages/en/landing.json`

**操作**:
```bash
# 查找并替换所有品牌相关的翻译
grep -r "ShipAny\|shipany" src/config/locale/messages/
# 手动审查并替换为通用描述
```

#### 1.6 Built-with 组件
**文件位置**: `src/shared/blocks/common/built-with.tsx`

**处理方式**:
- **选项 A**: 删除此组件（推荐）
- **选项 B**: 修改为 "Built with {{PROJECT_NAME}}"
- **选项 C**: 改为 "Powered by Next.js"

**推荐操作**:
```bash
# 删除组件文件
rm src/shared/blocks/common/built-with.tsx

# 查找并移除所有引用
grep -r "built-with" src/
# 手动删除 import 和使用
```

---

### 阶段 2: 内容清理 (预计 30 分钟)

#### 2.1 移除示例页面
**需要评估的内容**:

1. **落地页示例**:
   - `src/app/[locale]/(landing)/page.tsx` - 保留框架，清空具体内容
   - `src/app/[locale]/(landing)/showcases/page.tsx` - 评估是否需要

2. **AI 功能示例页**:
   ```
   src/app/[locale]/(landing)/(ai)/
   ├── ai-audio-generator/page.tsx
   ├── ai-chatbot/page.tsx
   ├── ai-image-generator/page.tsx
   ├── ai-music-generator/page.tsx
   └── ai-video-generator/page.tsx
   ```

   **处理方式**:
   - **保留**: 作为功能示例（标注为 demo）
   - **简化**: 只保留基础框架，移除具体实现
   - **移除**: 让用户根据需求自己添加

3. **博客示例内容**:
   ```
   content/posts/
   └── what-is-xxx.mdx
   └── what-is-xxx.zh.mdx
   ```

   **操作**:
   ```bash
   # 删除示例文章
   rm content/posts/what-is-xxx.mdx
   rm content/posts/what-is-xxx.zh.mdx

   # 创建占位符文章
   echo "# 示例文章" > content/posts/example.mdx
   ```

#### 2.2 清理示例数据
**需要检查的地方**:
- 数据库迁移文件中的示例数据
- Seed 脚本（如果有）
- 配置文件中的示例值

#### 2.3 移除/简化落地页组件
**评估这些组件**:
```
src/shared/blocks/
├── chat/          # 聊天功能 - 保留
├── generator/     # 生成器 - 简化或移除
├── payment/       # 支付 - 保留
├── sign/          # 认证 - 保留
└── dashboard/     # 仪表盘 - 保留
```

---

### 阶段 3: 创建初始化工具 (预计 45 分钟)

#### 3.1 项目初始化脚本
**文件**: `scripts/init-new-project.sh`

```bash
#!/bin/bash

# NanoBanana2 项目初始化脚本
# 用途: 从模板创建新项目

set -e

echo "🚀 NanoBanana2 项目初始化向导"
echo "================================"

# 1. 收集项目信息
read -p "项目名称 (如: my-ai-app): " PROJECT_NAME
read -p "项目显示名称 (如: My AI App): " PROJECT_DISPLAY_NAME
read -p "项目 URL (如: https://myapp.com): " PROJECT_URL
read -p "Git 仓库地址 (如: git@github.com:user/repo.git): " GIT_REPO

# 2. 替换占位符
echo ""
echo "📝 更新项目配置..."

# package.json
sed -i '' "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" package.json
sed -i '' "s|{{PROJECT_URL}}|$PROJECT_URL|g" package.json
sed -i '' "s|{{GIT_REPOSITORY}}|$GIT_REPO|g" package.json

# .env.example
sed -i '' "s/{{PROJECT_DISPLAY_NAME}}/$PROJECT_DISPLAY_NAME/g" .env.example
sed -i '' "s|{{PROJECT_URL}}|$PROJECT_URL|g" .env.example

# src/config/index.ts
sed -i '' "s/{{PROJECT_DISPLAY_NAME}}/$PROJECT_DISPLAY_NAME/g" src/config/index.ts

# README.md
sed -i '' "s/{{PROJECT_NAME}}/$PROJECT_DISPLAY_NAME/g" README.md

# 3. 创建 .env.local
echo ""
echo "📋 创建环境变量文件..."
cp .env.example .env.local

# 4. 清理模板相关文件
echo ""
echo "🧹 清理模板文件..."
rm -f scripts/init-new-project.sh
rm -f docs/TEMPLATE_PLAN.md

# 5. Git 配置
echo ""
echo "🔧 配置 Git 仓库..."
git remote remove upstream 2>/dev/null || true
git remote set-url origin "$GIT_REPO"

# 6. 初始提交
echo ""
read -p "是否创建初始提交? (y/n): " CREATE_COMMIT
if [ "$CREATE_COMMIT" = "y" ]; then
    git add .
    git commit -m "chore: initialize project from NanoBanana2 template

Project: $PROJECT_DISPLAY_NAME
Template: NanoBanana2 v1.0.0"

    read -p "是否推送到远程仓库? (y/n): " PUSH_REPO
    if [ "$PUSH_REPO" = "y" ]; then
        git push -u origin dev
    fi
fi

# 7. 下一步提示
echo ""
echo "✅ 项目初始化完成！"
echo ""
echo "下一步:"
echo "1. 配置数据库: 编辑 .env.local 中的 DATABASE_URL"
echo "2. 运行迁移: pnpm db:migrate"
echo "3. 初始化 RBAC: pnpm rbac:init --admin-email=your@email.com"
echo "4. 启动开发: pnpm dev"
echo ""
echo "📖 详细文档: ./CLAUDE.md"
```

**使用方式**:
```bash
# 从模板创建新项目
git clone https://github.com/alabo-x/nanobanana2.git my-new-project
cd my-new-project
chmod +x scripts/init-new-project.sh
./scripts/init-new-project.sh
```

#### 3.2 配置验证脚本
**文件**: `scripts/verify-setup.sh`

```bash
#!/bin/bash

# 项目配置验证脚本
# 检查所有必要的配置是否完成

echo "🔍 验证项目配置..."
echo ""

ERRORS=0

# 检查环境变量文件
if [ ! -f .env.local ]; then
    echo "❌ 缺少 .env.local 文件"
    echo "   运行: cp .env.example .env.local"
    ERRORS=$((ERRORS + 1))
fi

# 检查数据库配置
if [ -f .env.local ]; then
    if ! grep -q "DATABASE_URL=\"postgresql://" .env.local; then
        echo "⚠️  DATABASE_URL 未配置"
        ERRORS=$((ERRORS + 1))
    fi

    if ! grep -q "AUTH_SECRET=\"[a-zA-Z0-9]" .env.local; then
        echo "⚠️  AUTH_SECRET 未配置"
        echo "   运行: openssl rand -base64 32"
        ERRORS=$((ERRORS + 1))
    fi
fi

# 检查依赖安装
if [ ! -d node_modules ]; then
    echo "⚠️  依赖未安装"
    echo "   运行: pnpm install"
    ERRORS=$((ERRORS + 1))
fi

# 检查占位符是否被替换
if grep -q "{{PROJECT_NAME}}" package.json 2>/dev/null; then
    echo "❌ package.json 仍包含占位符"
    echo "   运行: scripts/init-new-project.sh"
    ERRORS=$((ERRORS + 1))
fi

echo ""
if [ $ERRORS -eq 0 ]; then
    echo "✅ 所有配置检查通过！"
    echo ""
    echo "可以运行: pnpm dev"
else
    echo "❌ 发现 $ERRORS 个配置问题"
    echo ""
    echo "参考文档: ./CLAUDE.md"
fi
```

#### 3.3 占位符配置文件
**文件**: `template.config.json`

```json
{
  "version": "1.0.0",
  "template": "NanoBanana2",
  "placeholders": {
    "PROJECT_NAME": {
      "description": "项目包名称 (kebab-case)",
      "example": "my-ai-app",
      "files": [
        "package.json",
        "README.md"
      ]
    },
    "PROJECT_DISPLAY_NAME": {
      "description": "项目显示名称",
      "example": "My AI App",
      "files": [
        ".env.example",
        "src/config/index.ts",
        "README.md"
      ]
    },
    "PROJECT_URL": {
      "description": "项目主页 URL",
      "example": "https://myapp.com",
      "files": [
        "package.json",
        ".env.example"
      ]
    },
    "GIT_REPOSITORY": {
      "description": "Git 仓库地址",
      "example": "git@github.com:user/repo.git",
      "files": [
        "package.json"
      ]
    }
  },
  "removableFiles": [
    "docs/TEMPLATE_PLAN.md",
    "scripts/init-new-project.sh",
    "template.config.json"
  ],
  "removableContent": {
    "examples": [
      "content/posts/what-is-xxx.mdx"
    ],
    "demos": [
      "src/app/[locale]/(landing)/(ai)/ai-audio-generator/",
      "src/app/[locale]/(landing)/(ai)/ai-music-generator/",
      "src/app/[locale]/(landing)/(ai)/ai-video-generator/"
    ]
  }
}
```

---

### 阶段 4: 文档更新 (预计 15 分钟)

#### 4.1 创建 SETUP.md
**文件**: `docs/SETUP.md`

```markdown
# 项目初始化指南

本文档说明如何从 NanoBanana2 模板创建新项目。

## 方式 1: 自动初始化（推荐）

\`\`\`bash
git clone https://github.com/alabo-x/nanobanana2.git my-project
cd my-project
./scripts/init-new-project.sh
\`\`\`

按提示输入项目信息，脚本会自动完成配置。

## 方式 2: 手动初始化

### 1. 克隆模板
\`\`\`bash
git clone https://github.com/alabo-x/nanobanana2.git my-project
cd my-project
\`\`\`

### 2. 更新项目信息
编辑以下文件，替换占位符:
- \`package.json\`: 项目名称、作者、仓库地址
- \`.env.example\`: 应用名称、URL
- \`src/config/index.ts\`: 默认应用名称
- \`README.md\`: 项目说明

### 3. 配置 Git
\`\`\`bash
# 创建新仓库并关联
git remote remove upstream
git remote set-url origin git@github.com:user/my-project.git
\`\`\`

### 4. 环境配置
\`\`\`bash
cp .env.example .env.local
# 编辑 .env.local 填入真实配置
\`\`\`

### 5. 数据库初始化
\`\`\`bash
pnpm install
pnpm db:migrate
pnpm rbac:init --admin-email=admin@example.com
\`\`\`

### 6. 启动开发
\`\`\`bash
pnpm dev
\`\`\`

## 验证配置

\`\`\`bash
./scripts/verify-setup.sh
\`\`\`

## 常见问题

参考 [FAQ.md](./FAQ.md)
```

#### 4.2 创建模板使用指南
**文件**: `docs/TEMPLATE_USAGE.md`

```markdown
# 模板使用指南

## 模板定位

NanoBanana2 是一个基于 ShipAny Template Two 的 AI SaaS 项目模板:
- ✅ 保留: 框架能力（认证、支付、RBAC、AI 集成）
- ✅ 清理: 品牌信息、示例内容
- ✅ 添加: 初始化脚本、项目文档

## 适用场景

适合以下类型的项目:
- AI 生成类 SaaS（图片、音频、视频、文本）
- 需要用户系统和订阅管理的应用
- 多语言国际化项目
- 基于 PostgreSQL 的 Web 应用

## 模板架构

\`\`\`
ShipAny 官方 (upstream)
    ↓ 同步更新
NanoBanana2 模板 (你的基础模板)
    ↓ 克隆创建
具体项目 (ProjectX, ProjectY...)
\`\`\`

## 更新策略

### 同步 ShipAny 更新
\`\`\`bash
cd nanobanana2
git fetch upstream
git log upstream/dev --oneline -10  # 查看更新
git merge upstream/dev              # 合并更新
pnpm install && pnpm dev            # 测试
git push origin dev                 # 推送
\`\`\`

### 将改进应用到现有项目
\`\`\`bash
cd my-project
git remote add template https://github.com/alabo-x/nanobanana2.git
git fetch template
git cherry-pick <commit-hash>
\`\`\`

## 定制建议

### 保留的内容
- 认证系统 (better-auth)
- RBAC 权限管理
- 支付集成 (Stripe, PayPal, 微信支付, 支付宝)
- AI SDK 集成框架
- 国际化系统
- 管理后台框架

### 可移除的内容
- AI 生成器示例页面
- 示例博客文章
- 落地页示例内容
- "Built with" 组件

### 建议添加的内容
- 你的常用 UI 组件库
- 项目特定的工具函数
- 团队的 ESLint/Prettier 配置
- CI/CD 配置文件
- 部署脚本

## 版本管理

### 模板版本
- \`v1.0.0-template\`: 初始模板版本
- \`v1.1.0-template\`: 添加新的通用功能
- \`v1.2.0-template\`: 同步 ShipAny 重大更新

### 项目版本
- \`v0.1.0\`: 项目初始化
- \`v0.2.0\`: 第一个功能完成
- \`v1.0.0\`: 正式发布

## 最佳实践

1. **定期同步**: 每月检查 ShipAny 更新
2. **改进回流**: 通用改进提交到模板
3. **文档更新**: 重要变更更新 CLAUDE.md
4. **版本标记**: 重要里程碑打 tag
5. **私有保持**: 所有仓库保持 Private

## 技术支持

- 模板问题: 参考本项目文档
- ShipAny 问题: https://shipany.ai/docs
- Next.js 问题: https://nextjs.org/docs
```

#### 4.3 更新 CLAUDE.md
在现有 CLAUDE.md 中添加模板化章节（稍后执行）

---

### 阶段 5: 测试与验证 (预计 15 分钟)

#### 5.1 创建测试项目
```bash
# 1. 模拟从模板创建新项目
cd ..
git clone nanobanana2 test-project
cd test-project

# 2. 运行初始化脚本
./scripts/init-new-project.sh
# 输入测试数据:
# - PROJECT_NAME: test-ai-app
# - PROJECT_DISPLAY_NAME: Test AI App
# - PROJECT_URL: https://test.com
# - GIT_REPO: git@github.com:test/test.git

# 3. 验证配置
./scripts/verify-setup.sh

# 4. 检查占位符是否全部替换
grep -r "{{PROJECT" .

# 5. 测试构建
pnpm install
pnpm build

# 6. 清理测试项目
cd ..
rm -rf test-project
```

#### 5.2 检查清单
```
✅ 所有占位符已替换
✅ package.json 配置正确
✅ README 内容适当
✅ 初始化脚本可用
✅ 验证脚本工作正常
✅ 项目可以构建
✅ 无明显的 ShipAny 品牌残留
```

---

## 执行时间线

### 立即执行（本次会话）
- [x] 创建模板化方案文档（本文件）
- [ ] 更新 CLAUDE.md 记录计划
- [ ] 分析所有需要修改的文件
- [ ] 提交规划文档

### 下次会话执行
1. **第 1 天** (1 小时):
   - 执行阶段 1: 品牌信息清理
   - 执行阶段 2: 内容清理
   - 提交: "refactor: clean up brand info and example content"

2. **第 2 天** (1 小时):
   - 执行阶段 3: 创建初始化工具
   - 执行阶段 4: 文档更新
   - 提交: "feat: add template initialization tools"

3. **第 3 天** (30 分钟):
   - 执行阶段 5: 测试与验证
   - 打标签: v1.0.0-template
   - 提交: "chore: mark as template v1.0.0"

---

## 文件清单

### 需要修改的文件
```
package.json                          # 项目元信息
.env.example                          # 环境变量模板
README.md                             # 项目说明
src/config/index.ts                   # 默认配置
src/config/locale/messages/**/*.json  # 国际化文本
src/shared/blocks/common/built-with.tsx  # 品牌组件（删除）
```

### 需要创建的文件
```
scripts/init-new-project.sh           # 初始化脚本
scripts/verify-setup.sh               # 验证脚本
template.config.json                  # 模板配置
docs/SETUP.md                         # 初始化指南
docs/TEMPLATE_USAGE.md                # 模板使用指南
```

### 需要删除的文件
```
content/posts/what-is-xxx.mdx         # 示例文章
content/posts/what-is-xxx.zh.mdx      # 示例文章（中文）
(可选) src/app/[locale]/(landing)/(ai)/*  # AI 示例页面
```

---

## 回滚方案

如果模板化后发现问题，可以回滚:

```bash
# 1. 回到模板化前的状态
git log --oneline  # 找到模板化前的 commit
git reset --hard <commit-hash>

# 2. 或者从上游重新同步
git fetch upstream
git reset --hard upstream/dev

# 3. 重新执行模板化
# 按本文档重新操作
```

---

## 注意事项

### ⚠️ 重要提醒

1. **保留许可证**: 不要删除或修改 LICENSE 文件
2. **私有仓库**: 确保所有仓库都是 Private
3. **upstream 保留**: NanoBanana2 要保留 upstream 连接
4. **测试充分**: 模板化后创建测试项目验证
5. **文档同步**: 修改后及时更新相关文档

### 💡 最佳实践

1. **小步提交**: 每个阶段单独提交
2. **保留历史**: 使用 git tag 标记版本
3. **文档优先**: 先完善文档再执行
4. **测试驱动**: 先想好如何验证再修改
5. **可逆操作**: 重要修改前先备份

---

## 后续优化方向

### 短期优化
- [ ] 添加更多项目模板变体（不同 AI 能力组合）
- [ ] 创建 GitHub Actions 工作流
- [ ] 添加 Docker 配置
- [ ] 创建部署脚本

### 长期优化
- [ ] 开发 CLI 工具（npx create-nanobanana-app）
- [ ] 建立模板市场（不同行业的预配置版本）
- [ ] 集成更多 AI 服务提供商
- [ ] 添加更多支付网关

---

## 问题追踪

### 已知问题
- 无

### 待决策问题
1. AI 示例页面是保留还是删除？
2. Built-with 组件如何处理？
3. 是否需要多个模板变体？

### 反馈收集
记录使用模板时遇到的问题，持续改进。

---

## 更新日志

- **2025-11-18**: 创建初始方案文档
- 待补充...

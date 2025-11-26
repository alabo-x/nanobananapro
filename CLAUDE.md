# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目快速概览

### 当前状态 (2025-11-26)
- **项目阶段**: 🎨 核心功能标题优化完成
- **最新变更**: 核心功能标题改为 "Try The AI Editor" + .gitignore 配置
- **开发服务器**: http://localhost:3000
- **管理员账户**: admin@nanobananapro.com (super_admin)
- **数据库表**: 16 个表
- **构建状态**: ✅ 生产构建成功（TypeScript 编译通过）
- **产品定位**: 专业图片编辑工具（高端市场 $19-129/月）

### 下一步工作

#### 当前阶段：核心功能测试
- [ ] **核心功能测试**
  - 测试 Image-to-Image 编辑功能
  - 验证 Replicate API 集成
  - 测试图片上传和积分扣除逻辑

### 部署上线待办事项

#### 必须完成（上线前）
- [x] 修复 sitemap.xml
- [ ] **配置 AI API 密钥**（Replicate API Key）
- [ ] **配置云存储服务**（Cloudflare R2 或 AWS S3）
- [ ] **配置生产环境变量**（AUTH_URL、NEXT_PUBLIC_APP_URL）
- [x] 更新社交媒体链接
- [x] 优化价格页面
- [ ] 性能监控和 SEO 优化

#### 重要但非阻塞（上线后优化）
- [ ] 支付网关配置（Stripe、PayPal）
- [ ] 补充案例图片
- [ ] 品牌资产更新（Logo、Favicon、OG 图片）

### 已完成事项
- [x] 核心功能标题优化 - "Professional Image Editor" → "Try The AI Editor"
- [x] .gitignore 配置 - 添加 .playwright-mcp 忽略规则
- [x] 代码清理 - 删除 10 个未使用 npm 依赖 + 博客残留代码
- [x] 调整 Hero/Features/Testimonials/FAQ 内容
- [x] Showcase 板块开发
- [x] 资源清理（~23MB）
- [x] 删除博客和文档功能
- [x] Footer 优化

---

## 项目定位

**NanoBananaPro** 是一个**专注于 Image-to-Image 编辑**的专业 AI 图片工具。

**核心定位**:
- **唯一功能**：AI Image-to-Image 编辑
- **AI 模型**：google/nano-banana-pro（Google Gemini 3 Pro 驱动）
- **定价**：1K-2K 图像 $0.12/张，4K 图像 $0.24/张

**差异化优势**:
- 他们：Text-to-Image + Image-to-Image（全功能）
- 我们：只专注 Image-to-Image（编辑专精）

**核心技术优势**：
- 角色一致性保持（Character Consistency）
- 场景完美保留（Scene Preservation）
- 自然语言编辑指令（Natural Language Editing）

**设计决策**:
- **页面留白设计**: Hero 和 Image Editor 之间的空白是故意设计，符合欧美用户审美。

---

## Cloudflare R2 配置步骤

### 配置步骤（约10分钟）

#### 1. 创建 R2 Bucket
1. 登录 Cloudflare Dashboard
2. 选择 **R2 Object Storage** → **Create bucket**
3. 输入名称（如：`nanobananapro-uploads`）

#### 2. 配置公共访问域名
1. 进入 bucket → **Settings** → **Public Access**
2. 点击 **Connect Domain**

#### 3. 生成 API Token
1. **Manage R2 API Tokens** → **Create API Token**
2. 权限：Object Read & Write
3. 保存：Access Key ID、Secret Access Key、Account ID

#### 4. 配置环境变量
```bash
# .env.local
R2_ACCOUNT_ID="your_account_id"
R2_ACCESS_KEY="your_access_key"
R2_SECRET_KEY="your_secret_key"
R2_BUCKET_NAME="nanobananapro-uploads"
R2_DOMAIN="https://r2.yourdomain.com"
```

**费用说明**：
- 免费额度：每月 10GB 存储 + 无出口流量费

---

## 目标用户定位

**目标市场**: 欧美国家的专业用户

**核心用户画像**:
1. **电商卖家/产品经理** - 产品图编辑
2. **内容创作者/社交媒体运营者** - 批量图片编辑、虚拟形象一致性
3. **摄影师/图片编辑** - 人像润色、背景调整

---

## 文案和 UI 指导原则

#### 原则 1：突出编辑能力
- 禁用词："生成"、"创建"、"制作"
- 推荐词："编辑"、"转换"、"优化"、"增强"

#### 原则 1.5：精准用词
- 禁用词："photos"（照片）
- 推荐词："images"（图片/图像）

#### 原则 2：强调核心优势
- 角色一致性、场景保留、自然语言

#### 原则 3：分层文案风格
- 电商卖家：强调商业价值和效率
- 内容创作者：强调效率和一致性
- 摄影师：强调品质和专业性

---

## 最近工作记录

> 完整历史记录请查看 [CHANGELOG.md](./CHANGELOG.md)

### 2025-11-26: 代码库全面清理 - 删除博客残留和未使用依赖
**变更类型**: Cleanup/Performance
**影响范围**: 全栈

**清理背景**:
- 之前删除了博客、文档功能，但残留代码和依赖未完全清理
- 存在未使用的 npm 依赖和 UI 组件，影响打包体积

**删除的 npm 依赖** (10个，约 500KB):
- `@dnd-kit/core`, `@dnd-kit/modifiers`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- `@tanstack/react-table`
- `github-markdown-css`
- `swiper`
- `embla-carousel-auto-scroll`, `embla-carousel-react`
- `recharts`

**删除的文件和目录**:
- `src/shared/components/ui/carousel.tsx` - 未使用的轮播组件
- `src/shared/components/ui/chart.tsx` - 未使用的图表组件
- `src/themes/default/blocks/blog.tsx` - 博客列表组件
- `src/themes/default/blocks/blog-detail.tsx` - 博客详情组件
- `src/themes/default/pages/blog.tsx` - 博客页面
- `src/themes/default/pages/blog-detail.tsx` - 博客详情页面
- `src/shared/types/blocks/blog.d.ts` - 博客类型定义
- `src/app/[locale]/(admin)/admin/posts/` - 后台文章管理
- `src/app/[locale]/(admin)/admin/categories/` - 后台分类管理
- `content/docs/` - 文档内容目录
- `content/posts/` - 博客内容目录
- `public/uploads/` - 本地上传目录（改用云存储）

**修改的文件**:
- `package.json` - 移除 10 个未使用依赖
- `source.config.ts` - 移除 docs 和 posts 配置，只保留 pages
- `src/core/docs/source.ts` - 移除 docsSource 和 postsSource，只保留 pagesSource
- `src/shared/models/post.tsx` - 精简为只保留 getLocalPage 和 PageContent 类型
- `src/themes/default/blocks/index.tsx` - 移除 blog 导出
- `src/themes/default/blocks/page-detail.tsx` - 更新类型引用
- `src/themes/default/pages/page-detail.tsx` - 更新类型引用
- `src/shared/blocks/common/markdown-preview.tsx` - 移除 github-markdown-css 导入
- `src/config/locale/messages/en/admin/sidebar.json` - 移除 Posts/Categories 菜单
- `src/config/locale/messages/es/admin/sidebar.json` - 移除 Posts/Categories 菜单

**保留的关键功能**:
- `content/pages/` - 隐私政策、服务条款等静态页面（使用 fumadocs）
- `pagesSource` - fumadocs 页面加载器
- `getLocalPage` - 获取静态页面内容的函数

**构建验证**: ✅ TypeScript 编译成功，12 个静态页面生成

---

### 2025-11-25: ImageGenerator 核心组件完整 UI/UX 优化
**变更类型**: Feature/UX/Content
**影响范围**: 前端 - ImageGenerator 组件 + ImageUploader 组件

**完成的优化** (共 9 项):
1. Prompt 标签专业化: "Prompt"
2. 生成按钮: "Create • {credits} Credits"
3. 空状态: "Ready to Create"
4. 图片限制修正: maxImages=8, maxSizeMB=30
5. 上传区域样式和动画增强

**修改的文件**:
- `src/config/locale/messages/en/ai/image.json`
- `src/config/locale/messages/es/ai/image.json`
- `src/shared/blocks/generator/image.tsx`
- `src/shared/blocks/common/image-uploader.tsx`

---

## 技术栈

### 核心框架
- **Next.js 16.0.0**: App Router + Turbopack + React 19.2
- **TypeScript 5**: 严格类型检查

### 数据层
- **Drizzle ORM 0.44.2**: 类型安全的数据库查询
- **PostgreSQL**: 默认数据库
- **单例模式**: `DB_SINGLETON_ENABLED=true`

### 认证与权限
- **better-auth 1.3.7**: OAuth + 邮箱验证码 + 密码登录
- **自定义 RBAC**: 资源-操作权限模型

### AI 集成
- **Vercel AI SDK 5.0**: 统一 AI 接口
- **Replicate + OpenRouter**: 多 AI 提供商支持

### 支付系统
- **Stripe, PayPal**: 多网关集成
- **订阅 + 积分**: 双计费模式

### UI/UX
- **Tailwind CSS 4 + shadcn/ui**: 组件系统
- **next-intl 4.3.4**: 国际化

### 包管理
- **pnpm**: 必须使用 pnpm

---

## 项目架构

### 核心目录结构

```
src/
├── app/
│   ├── [locale]/                    # 国际化路由根目录
│   │   ├── (admin)/                # 管理后台 - RBAC 保护
│   │   ├── (auth)/                 # 认证页面
│   │   └── (landing)/              # 落地页和用户功能
│   └── api/                        # API 路由
├── config/
│   ├── db/schema.ts                # Drizzle 数据库 Schema
│   ├── locale/messages/{en,es}/    # 国际化翻译文件
│   └── index.ts                    # 环境变量配置
├── core/                           # 核心系统模块（不要随意修改）
│   ├── auth/                       # 认证系统
│   ├── db/                         # 数据库连接
│   └── rbac/                       # 权限检查
├── shared/                         # 共享代码（可自由扩展）
│   ├── blocks/                     # 业务组件块
│   ├── components/                 # UI 组件
│   ├── models/                     # 数据查询抽象层
│   └── services/                   # 业务服务层
└── extensions/                     # 第三方服务集成
    ├── ai/                         # AI 服务适配器
    ├── payment/                    # 支付网关
    └── storage/                    # 对象存储
```

### 关键架构模式

#### 认证系统
- API 路由中使用 `const auth = await getAuth()` (src/core/auth/index.ts:7)
- 避免在模块顶层初始化

#### RBAC 权限系统
- 权限格式: `resource.action`（如 `admin.users.read`）
- 通配符支持: `admin.posts.*`
- 初始化: `pnpm rbac:init --admin-email=your@email.com`

#### AI 功能集成流程
1. 用户请求 → `/api/ai/generate`
2. 检查积分余额
3. 调用 AI SDK
4. 扣除积分 + 记录任务
5. 流式返回结果

---

## 常用命令

### 开发
```bash
pnpm dev                      # 启动开发服务器
pnpm build                    # 生产构建
pnpm lint                     # ESLint 检查
```

### 数据库
```bash
pnpm db:push                  # 推送 schema 到数据库
pnpm db:studio                # 启动 Drizzle Studio
```

### RBAC 系统
```bash
pnpm rbac:init --admin-email=your@email.com  # 初始化 RBAC
```

---

## 开发工作流

### 首次设置
```bash
pnpm install
cp .env.example .env.local
# 配置 DATABASE_URL、AUTH_SECRET
pnpm db:push
pnpm rbac:init --admin-email=your@email.com
pnpm dev
```

### 数据库变更流程
```bash
# 开发环境
pnpm db:push

# 生产环境
pnpm db:generate && pnpm db:migrate
```

### 添加新 API 路由
```typescript
// src/app/api/your-endpoint/route.ts
import { getAuth } from '@/core/auth'

export async function POST(request: Request) {
  const auth = await getAuth()  // 动态认证
  const session = await auth.api.getSession({ headers: request.headers })
  // ...
}
```

---

## 关键技术细节

### Path Aliases
```typescript
"@/*": ["./src/*"]
```

### 环境变量
- `DATABASE_URL`: 数据库连接字符串
- `AUTH_SECRET`: 认证密钥（`openssl rand -base64 32`）
- `AUTH_URL`: 认证回调 URL

### 数据库连接单例模式
```typescript
// 正确做法
import { db } from '@/core/db'

// 错误做法
const db = drizzle(...)
```

### RBAC 权限检查
```typescript
import { requirePermission, hasPermission } from '@/core/rbac'

// Server Component
await requirePermission('admin.users.read')

// Server Action
if (!(await hasPermission('admin.posts.delete'))) {
  return { error: 'Forbidden' }
}
```

---

## 重要注意事项

### 部署前检查清单
- [ ] 环境变量配置
- [ ] 数据库迁移
- [ ] RBAC 初始化
- [ ] 支付 Webhook 配置
- [ ] AI API 密钥验证

### 安全最佳实践
1. RBAC 保护: 所有管理接口必须调用权限检查
2. 输入验证: 使用 Zod schema
3. Webhook 验证: 支付 webhook 必须验证签名

### 性能优化策略
1. 数据库索引
2. 连接池管理: 单例模式 + `DB_SINGLETON_ENABLED=true`
3. 图片优化: 使用 `next/image`
4. AI 流式响应: 使用 `streamText()`

### 许可证与合规
- 基于 ShipAny Template Two
- 私有仓库: 必须保持 Private

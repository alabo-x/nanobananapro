# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目快速概览

### 当前状态 (2025-11-27)
- **项目阶段**: 🔧 定价重构完成（第三版）+ 存储架构文档化
- **最新变更**: 定价调整为 $19.90/月 + $191.04/年（20% off），特性文案优化
- **开发服务器**: http://localhost:3000
- **管理员账户**: admin@nano-banana2.pro (super_admin)
- **数据库表**: 16 个表
- **构建状态**: ✅ 生产构建成功（TypeScript 编译通过）
- **产品定位**: 专业图片编辑工具（$19.90-191.04）

### 下一步工作

#### 当前阶段：核心功能测试
- [ ] **核心功能测试**
  - 测试 Image-to-Image 编辑功能
  - 验证 Replicate API 集成
  - 测试图片上传和积分扣除逻辑
- [ ] **历史记录图片失效提示**
  - 在 UI 添加提示文案："历史记录仅保留元数据，图片可能 24h 后失效"
  - 位置：历史记录页面或生成结果页
  - 原因：Replicate 图片 URL 有效期 1-24 小时，当前未实现永久存储

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

#### 部署后验证（上线后立即执行）
- [ ] **检查 sitemap.xml 是否正常生成**
  ```bash
  curl https://nano-banana2.pro/sitemap.xml
  # 预期：返回包含 4 个 URL 的 XML（en/es 首页 + en/es 价格页）
  ```
- [ ] **检查 robots.txt 是否正确**
  ```bash
  curl https://nano-banana2.pro/robots.txt
  # 预期：包含 Sitemap 声明和 Disallow 规则
  ```
- [ ] **检查首页 hreflang 标签（HTML head 中）**
  ```bash
  # 英文首页
  curl -s https://nano-banana2.pro | grep -i hreflang
  # 预期：rel="alternate" hreflang="en"、hreflang="es"、hreflang="x-default"

  # 西班牙语首页
  curl -s https://nano-banana2.pro/es | grep -i hreflang
  # 预期：同样的三个 hreflang 标签
  ```
- [ ] **提交 sitemap 到 Google Search Console**
  - 登录 https://search.google.com/search-console
  - 添加站点 nano-banana2.pro（如尚未添加）
  - 进入 Sitemaps → 提交 `https://nano-banana2.pro/sitemap.xml`

### 已完成事项
- [x] Testimonials 评价修正 - 移除批量编辑虚假描述，改为自然语言编辑和专业品质输出
- [x] 定价页面 UI 优化 - 价格居中、按钮移到 Features 下方、Tab 强调色 (Save 20%)、标题改为 "Choose Your Plan"
- [x] 定价页面重构（对标 aiimageeditor.ai）- 无套餐名、统一 Features、年付显示月均价 $15.92
- [x] 定价 Features 文案优化 - 新增无水印、商用许可，移除分辨率技术描述，强调高质量图片
- [x] 定价卡片样式优化 - 移除标签（Most Popular/Best Value），限制卡片宽度（max-w-md）居中显示
- [x] 定价页面 Tabs 恢复 - Monthly/Yearly (Save 20%) 切换
- [x] 定价重构（第三版）- Starter $19.90/月 120积分、Premium $191.04/年 1440积分（20% off）
- [x] 存储架构文档化 - 记录 Replicate 图片 URL 过期问题和 R2 存储配置
- [x] 特性文案优化 - 突出图片数量、商用授权、客服支持，移除技术性描述
- [x] 积分逻辑恢复 - 恢复分辨率定价（1K=2积分, 2K=3积分, 4K=6积分），前后端同步更新
- [x] Features 功能描述修正 - "Multi-Format Support" → "One-Click Perfection"（移除误导性批量编辑文案）
- [x] SEO 技术优化 - sitemap 动态生成、hreflang 支持、canonical URL 统一
- [x] 品牌词全站替换 - NanoBananaPro → Nano Banana 2，邮箱 @nano-banana2.pro
- [x] 核心功能标题优化 - "Professional Image Editor" → "Try The AI Editor"
- [x] 代码清理 - 删除 10 个未使用 npm 依赖 + 博客残留代码
- [x] 调整 Hero/Features/Testimonials/FAQ 内容
- [x] Showcase 板块开发
- [x] 资源清理（~23MB）
- [x] 删除博客和文档功能

---

## 翻译文件修改规范（重要）

### ⚠️ 同名配置项区分原则

修改翻译文件时，**必须区分同名配置项的不同用途**：

| 文件类型 | 路径 | 用途 | 示例 |
|----------|------|------|------|
| **页面级配置** | `landing.json` | 页面板块的 section 标题 | `generator.title` → 板块大标题 |
| **组件级配置** | `ai/*.json` | 组件内部的标题和文案 | `generator.title` → 卡片内小标题 |

### 修改前必做检查

```bash
# 1. 检查所有出现位置
grep -rn "要修改的文案" src/config/locale/messages/

# 2. 理解每个文件的用途
# - landing.json → 页面级板块配置
# - ai/*.json → 组件级功能配置
# - 两者可能有同名字段但用途不同
```

### 修改后必做验证

- 用浏览器截图确认每个修改位置的实际效果
- 不同位置的同名字段可能需要不同的值

### 历史教训

- **错误案例**：修改 `generator.title` 时，同时改了 `landing.json` 和 `ai/image.json`，但它们分别控制板块标题和卡片内标题
- **正确做法**：先 grep 检查所有出现位置，理解用途后再针对性修改

---

## 积分系统规范（重要）

### ⚠️ 分辨率定价规则

**当前规则**（2025-11-27 恢复）：
- **1K 分辨率**: 2 积分/张
- **2K 分辨率**: 3 积分/张
- **4K 分辨率**: 6 积分/张

### 定价结构（重要）

**核心理解**：
- 只有 **1 个套餐**，无名字
- 用户通过 **Tab 切换**（Monthly / Yearly）选择付费周期
- **功能完全相同**，只是付费周期不同
- 没有人群区分，没有服务等级差异

### 价格显示逻辑（重要，支付时勿犯错）

| 付费方式 | 页面显示价格 | 实际扣费金额 |
|----------|--------------|--------------|
| 月付 | $19.90 / month | $19.90/月 |
| 年付 | ~~$19.90~~ $15.92 / month | $191.04/年 |

**关键**：年付显示月均价格 $15.92（$191.04 ÷ 12），方便用户对比，但实际扣费是 $191.04/年

### 积分数量

| 付费方式 | 积分 | 1K 图片 | 2K 图片 | 4K 图片 |
|----------|------|---------|---------|---------|
| 月付 | 120/月 | 60 张 | 40 张 | 20 张 |
| 年付 | 1440/年 | 720 张 | 480 张 | 240 张 |

### 套餐特性（统一显示）

- 120 credits, reset monthly
- Up to 60 images/month
- No watermarks
- Commercial license

### 成本分析

| 套餐 | 全部 1K | 全部 4K | 毛利率 |
|------|---------|---------|--------|
| Starter $19.90 | 60张×$0.12=$7.2 | 20张×$0.24=$4.8 | 64%-76% |
| Premium $191.04/年 | 720张×$0.12=$86.4 | 240张×$0.24=$57.6 | 55%-70% |

**设计原则**：年费降20%引导长期订阅，保持健康毛利率

### 代码位置

| 位置 | 文件 | 说明 |
|------|------|------|
| **前端** | `src/shared/blocks/generator/image.tsx:166,194-202` | `useState + useEffect` 动态计算 |
| **后端** | `src/app/api/ai/generate/route.ts:42-63` | `creditsMap` 查表计算 |
| **定价** | `src/config/locale/messages/en/pricing.json` | 套餐配置 |

### 修改积分规则时的检查清单

```bash
# 1. 检查前端积分逻辑
grep -n "creditsMap" src/shared/blocks/generator/image.tsx

# 2. 检查后端积分逻辑
grep -n "creditsMap" src/app/api/ai/generate/route.ts

# 3. 检查定价页面描述
grep -n "credits" src/config/locale/messages/en/pricing.json
```

**三处必须保持一致**：
- 前端 `creditsMap = { '1k': 2, '2k': 3, '4k': 6 }`
- 后端 `creditsMap = { '1k': 2, '2k': 3, '4k': 6 }`
- 定价页 `"1K: 2 credits, 2K: 3 credits, 4K: 6 credits"`

---

## 图片存储架构（重要）

### 当前架构

| 图片类型 | 存储位置 | 说明 |
|----------|----------|------|
| **AI 生成的图片** | Replicate 服务器 | URL 格式: `https://replicate.delivery/...` |
| **用户上传的参考图** | Cloudflare R2 / AWS S3 | 需配置环境变量 |

### ⚠️ 关键限制

**AI 生成图片的 URL 会过期**（约 1-24 小时）：
- 数据库 `aiTask.taskResult` 存储 Replicate 返回的 URL
- 用户生成后需要**立即下载**，否则图片会丢失
- 当前**没有**实现图片永久存储功能

### 存储服务配置

**Cloudflare R2 配置**（推荐）：
```bash
R2_ACCOUNT_ID="your_account_id"
R2_ACCESS_KEY="your_access_key"
R2_SECRET_KEY="your_secret_key"
R2_BUCKET_NAME="nanobananapro-uploads"
R2_DOMAIN="https://r2.yourdomain.com"
```

**费用**：
- 免费额度：10GB 存储 + 无出口流量费
- 超出：$0.015/GB/月

### 代码位置

| 功能 | 文件 |
|------|------|
| 存储服务接口 | `src/extensions/storage/index.ts` |
| R2 Provider | `src/extensions/storage/r2.ts` |
| S3 Provider | `src/extensions/storage/s3.ts` |
| 上传 API | `src/app/api/storage/upload-image/route.ts` |
| AI 生成结果 | `src/extensions/ai/replicate.ts:93-128` |

### 后续优化方向

如需实现**图片永久保存**功能：
1. 在 AI 生成完成后，下载图片到 R2
2. 修改 `query/route.ts`，返回 R2 URL 而非 Replicate URL
3. 预估成本：100 用户约 $0.03/月，1000 用户约 $1.65/月

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

### 2025-11-27: 定价重构（第三版）+ 存储架构文档化 + 卡片布局修复
**变更类型**: Feature + Documentation + Bugfix
**影响范围**: 定价页面、文档

**变更内容**:
- ✅ 定价调整: $19.90/月 120积分 → $191.04/年 1440积分（20% off）
- ✅ 特性文案优化: 突出图片数量、商用授权、客服支持
- ✅ 存储架构文档化: 记录 Replicate 图片 URL 过期限制（1-24小时）
- ✅ 添加 R2 存储配置说明和成本分析
- ✅ **修复定价卡片布局**: 移除 `groups` 和 `group` 字段，两张卡片并排显示

**修改文件**:
- `src/config/locale/messages/en/pricing.json`
- `src/config/locale/messages/es/pricing.json`
- `CLAUDE.md`（新增存储架构章节）

**定价卡片布局说明**:
- 移除 `groups` 配置（不需要 Monthly/Annually tabs 切换）
- 移除 items 中的 `group` 字段
- 组件自动根据 items 数量显示为 2 列布局

### 2025-11-27: 积分系统漏洞修复 + Features 功能描述修正
- **修复积分消耗前后端不一致漏洞**：后端 API 现在正确读取 `resolution` 参数计算积分
- 移除 Features 误导性"批量编辑"文案
- 修改文件: `generate/route.ts`, `landing.json` (en/es)

### 2025-11-26: 代码库全面清理 + SEO 技术优化
- 删除 10 个未使用 npm 依赖 + 博客残留代码
- sitemap 动态生成 + hreflang 支持 + canonical URL 统一
- 品牌词全站替换 (Nano Banana 2)

### 2025-11-25: ImageGenerator 核心组件 UI/UX 优化
- Prompt 标签、生成按钮、空状态文案专业化
- 图片限制修正: maxImages=8, maxSizeMB=30
- 上传区域样式和动画增强

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

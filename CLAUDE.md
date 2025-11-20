# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目快速概览

### 当前状态 (2025-11-19)
- **项目阶段**: 首页板块精简完成
- **最新变更**: 精简首页板块，参考 imgeditor.co 结构
- **开发服务器**: http://localhost:3000
- **管理员账户**: admin@nanobananapro.com (super_admin)
- **数据库表**: 16 个表（已删除 chat, chat_message）
- **待办事项**:
  - [ ] 调整 Hero 内容（文案、CTA，参考 imgeditor.co）
  - [ ] 调整 Features 内容（6个核心特性）
  - [ ] 调整 Testimonials 内容
  - [ ] 调整 FAQ 内容
  - [ ] **Showcase 板块** - 添加生成案例展示（需要准备案例图片素材，暂未完成）

### 项目定位

**NanoBananaPro** 是一个专注于 **AI 图片生成和编辑** 的在线工具网站。

**核心功能**:
- 唯一功能：AI 图片生成和编辑（首页 Hero 区块）
- 主要调用 google/nano-banana 模型的升级版本
- 可能的模型名称：google/nano-banana-pro

**不需要的功能** (已删除):
- ❌ 聊天/对话功能
- ❌ 音乐/视频/音频生成
- ❌ 任何与图片生成无关的 AI 功能

**目标市场**: 欧美普通用户

**用户画像**:
- 非专业设计师
- 社交媒体运营者、内容创作者
- 电商卖家、营销人员
- 普通用户（需要图片但不会 Photoshop）

**核心诉求**:
- 简单易用，不需要学习成本
- 快速出图，节省时间
- 专业质量，无需专业技能

**文案风格**:
- 简洁直接，一句话说清价值
- 强调"No design skills required"
- 降低用户心理门槛

**技术基础**:
- 基于 ShipAny Template Two (Next.js 16 + React 19)
- 完整的用户认证、支付、权限管理系统
- 集成 Vercel AI SDK 和 Replicate Provider

## 最近工作记录

### 2025-11-20: Hero 内容和样式优化 - 参考 imgeditor.co
**变更类型**: Content/UX/Style
**影响范围**: 前端
**Git commit**: 待提交

**变更内容**:
- ✅ 更新 Hero 标题为品牌名 "Nano Banana Pro"
- ✅ 更新描述和按钮内容
- ✅ 删除社交证明区域（tip、avatars）
- ✅ 保留 announcement 横幅，跳转到 #generator
- ✅ 添加功能标签组件（feature_tags）
- ✅ 更新类型定义支持 feature_tags
- ✅ 优化样式使 Hero 更大气

**Hero 新内容**:
- **标题**: "Nano Banana Pro"
- **描述**: "Turn your ideas into professional images with simple text prompts. No design skills required."
- **主按钮**: "Get Started" → #generator
- **次按钮**: "View Examples" → #showcase
- **功能标签**: 一键生成 / 自然语言 / 高清输出
- **横幅**: 跳转到 #generator

**样式优化**:
- 标题字体：`text-5xl sm:text-7xl` → `text-6xl sm:text-8xl`
- 区域 padding：`pb-8 md:pb-8` → `pb-16 md:pb-24`
- 描述间距：`mt-8 mb-8` → `mt-10 mb-10`
- 描述字体：`text-lg` → `text-xl`
- 按钮尺寸：`size="default"` → `size="lg"`
- 功能标签间距：`mt-8 gap-6` → `mt-12 gap-8`

**修改的文件**:
- `src/config/locale/messages/en/landing.json` - 英文 Hero 配置
- `src/config/locale/messages/zh/landing.json` - 中文 Hero 配置
- `src/themes/default/blocks/hero.tsx` - Hero 组件（feature_tags + 样式优化）
- `src/shared/types/blocks/landing.d.ts` - 添加 FeatureTag 类型定义

---

### 2025-11-19: 首页板块精简 - 参考 imgeditor.co
**变更类型**: Refactor/UX
**影响范围**: 前端
**Git commit**: 待提交

**变更内容**:
- ✅ 精简首页板块，只保留核心组件
- ✅ 参考对标网站 imgeditor.co 的结构
- ✅ 删除 Hero 图片展示区域代码
- ✅ 彻底删除无用组件代码和配置

**删除的板块**:
- ❌ Logos - 工具网站不需要
- ❌ FeaturesList (introduce) - 合并到 Features
- ❌ FeaturesAccordion (benefits) - 合并到 Features
- ❌ FeaturesStep (usage) - 合并到 Features
- ❌ Stats - 不需要数据统计
- ❌ Subscribe - 不需要邮件订阅
- ❌ CTA - Hero 已有 CTA
- ❌ Hero 图片区域 - 彻底移除代码

**保留的板块**:
```
Hero → ImageGenerator → Features → Testimonials → FAQ
```

**删除的组件文件** (7个):
- `src/themes/default/blocks/logos.tsx`
- `src/themes/default/blocks/features-list.tsx`
- `src/themes/default/blocks/features-accordion.tsx`
- `src/themes/default/blocks/features-step.tsx`
- `src/themes/default/blocks/stats.tsx`
- `src/themes/default/blocks/subscribe.tsx`
- `src/themes/default/blocks/cta.tsx`

**删除的配置内容**:
- `src/config/locale/messages/en/landing.json`: logos, introduce, benefits, usage, stats, cta, subscribe
- `src/config/locale/messages/zh/landing.json`: logos, introduce, benefits, usage, stats, cta, subscribe

**修改的文件**:
- `src/themes/default/pages/landing.tsx` - 精简板块引用
- `src/themes/default/blocks/hero.tsx` - 删除图片展示区域（第142-172行）、移除 LazyImage 导入
- `src/themes/default/blocks/index.tsx` - 更新导出（移除已删除组件）

**后续任务**:
- 调整各板块内容（Hero、Features、Testimonials、FAQ）
- **Showcase 板块** - 需要准备案例图片素材后开发

**决策理由**:
- 项目功能明确（AI 图片生成工具）
- 后期不会添加太多板块
- 需要时可从 ShipAny upstream 获取
- 减少代码量，提高可维护性

---

### 2025-11-19: 首页重构 - 图片生成器作为独立板块
**变更类型**: Refactor/UX
**影响范围**: 前端
**Git commit**: 待提交

**变更内容**:
- ✅ 将 ImageGenerator 作为独立板块放在 Hero 之后（不是嵌入 Hero 内部）
- ✅ 删除导航栏 "AI" 下拉菜单
- ✅ 更新首页 Meta 信息（SEO 优化）
- ✅ 删除 `/ai-image-generator` 页面
- ✅ 保留 `ai/image` 翻译文件（组件需要）

**修改的文件**:
- `src/themes/default/pages/landing.tsx` - 添加 ImageGenerator 独立板块
- `src/themes/default/blocks/hero.tsx` - 移除错误嵌入的 ImageGenerator
- `src/config/locale/messages/en/landing.json` - 删除 AI 菜单
- `src/config/locale/messages/zh/landing.json` - 删除 AI 菜单
- `src/config/locale/messages/en/common.json` - 更新 Meta 信息
- `src/config/locale/messages/zh/common.json` - 更新 Meta 信息

**删除的文件**:
- `src/app/[locale]/(landing)/(ai)/ai-image-generator/` - 整个目录
- `src/app/[locale]/(landing)/(ai)/` - 空目录

**保留的文件**（组件翻译需要）:
- `src/config/locale/messages/en/ai/image.json` - 只保留 generator 部分
- `src/config/locale/messages/zh/ai/image.json` - 只保留 generator 部分

**页面结构**:
```
Hero → ImageGenerator → Logos → Features → ...
```

**SEO 更新**:
- Title: "NanoBananaPro - AI Image Generator & Editor"
- Description: "Create stunning AI-generated images with NanoBananaPro..."
- Keywords: "AI image generator, AI image editor, image generation, AI art, text to image"

**构建状态**: ✅ 通过

---

### 2025-11-19: 代码清理 - 只保留图片生成功能
**变更类型**: Cleanup/Refactor
**影响范围**: 全栈
**Git commit**: 待提交

**删除的功能**:
- ❌ 聊天系统 (chat, chat_message 表, API, 组件)
- ❌ AI 音乐生成器 (Kie Provider)
- ❌ AI 视频/音频/聊天机器人页面
- ❌ BuiltWith 组件 (Footer 中的 "Built with ❤️ ShipAny")

**保留的功能**:
- ✅ AI 图片生成器 (/ai-image-generator)
- ✅ Replicate Provider (图片生成)
- ✅ OpenRouter (保留，未来可用)

**删除清单**:
1. **目录** (3个):
   - `src/app/[locale]/(chat)/`
   - `src/app/api/chat/`
   - `src/shared/blocks/chat/`
2. **页面** (6个):
   - ai-music-generator, ai-video-generator, ai-audio-generator, ai-chatbot
   - admin/chats, activity/chats
3. **代码文件** (7个):
   - kie.ts, music.tsx, chat.tsx (context)
   - chat.ts, chat_message.ts (models)
   - types/chat/
   - built-with.tsx (BuiltWith 组件)
4. **翻译文件** (8个):
   - ai/chat.json, ai/music.json
   - admin/chats.json, activity/chats.json

**修改的文件**:
- 导航配置: landing.json, admin/sidebar.json, activity/sidebar.json
- 代码依赖: ai.ts, settings.ts, generator/index.tsx, ai/index.ts
- 翻译索引: locale/index.ts
- 数据库: schema.ts (删除 chat, chatMessage 表定义)
- Footer: footer.tsx, common/index.tsx (移除 BuiltWith)

**数据库变更**:
- 删除表: chat, chat_message
- 当前表数: 16 个
- 迁移文件: `0001_cultured_zarda.sql`

**构建状态**: ✅ 通过

---

### 2025-11-19: ShipAny 快速开始全部完成
**变更类型**: Setup/Configuration
**影响范围**: 项目基础设施
**Git commit**: 待提交

**完成的所有步骤**:
1. ✅ 项目初始化 (pnpm install - 1059 packages)
2. ✅ 环境变量配置 (.env.local, .env.development)
3. ✅ 数据库配置:
   - Supabase PostgreSQL (US East Coast)
   - Session Pooler 连接 (IPv4 兼容)
   - 18 个表结构已创建
4. ✅ 认证配置 (AUTH_SECRET)
5. ✅ RBAC 初始化:
   - 29 个权限定义
   - 4 个角色: super_admin, admin, editor, viewer
6. ✅ 注册管理员账户: admin@nanobananapro.com
7. ✅ 分配 super_admin 角色
8. ✅ 生成数据库迁移文件:
   - `src/config/db/migrations/0000_glorious_the_twelve.sql`

**问题解决记录**:
- 端口 3000 被占用 → 使用端口 3004
- NEXT_PUBLIC_APP_URL 端口不匹配导致注册卡住 → 修正为 3004
- Supabase 直连 DNS 解析失败 → 切换到 Session Pooler

**开发服务器**:
- 本地: http://localhost:3004
- 局域网: http://192.168.0.103:3004

**下一步**:
1. 讨论图片生成功能架构
2. 了解 Google 新模型 API
3. 开发核心图片生成功能

---

### 2025-11-18: 模板化改造方案规划
**变更类型**: Planning/Documentation
**影响范围**: 项目战略定位
**Git commit**: 待提交

**变更内容**:
- ✅ 创建详细的模板化改造方案: `docs/TEMPLATE_PLAN.md`
- ✅ 确定三层架构设计:
  - 层级 1: ShipAny 官方模板（上游更新源）
  - 层级 2: NanoBanana2 基础模板（通用定制）
  - 层级 3: 具体项目（业务实现）
- ✅ 设计 5 阶段改造计划:
  1. 品牌信息清理（30 分钟）
  2. 示例内容移除（30 分钟）
  3. 初始化工具创建（45 分钟）
  4. 文档更新（15 分钟）
  5. 测试验证（15 分钟）
- ✅ 设计占位符系统和自动化脚本
- ✅ 更新 CLAUDE.md 明确项目定位

**战略决策**:
- NanoBanana2 定位为"个人模板"而非"业务项目"
- 保留 upstream 连接，持续获取 ShipAny 更新
- 未来项目从 NanoBanana2 克隆，不保留 upstream
- 通用改进提交到 NanoBanana2，业务逻辑在具体项目中

**下一步**:
- 按照 `docs/TEMPLATE_PLAN.md` 执行模板化改造
- 预计 3 天完成，每天 1 小时
- 完成后打标签 `v1.0.0-template`

---

### 2025-11-18: Git 仓库初始化和上游管理配置
**变更类型**: Setup/Configuration
**影响范围**: 项目基础设施
**Git commit**: 0ac84ee

**变更内容**:
- ✅ 创建私有 GitHub 仓库: `alabo-x/nanobanana2`
- ✅ 配置双远程仓库架构:
  - `origin` → `https://github.com/alabo-x/nanobanana2.git` (项目仓库)
  - `upstream` → `https://github.com/shipanyai/shipany-template-two.git` (模板仓库)
- ✅ 添加项目文档:
  - `CLAUDE.md`: AI 助手开发指南
  - `docs/GIT_WORKFLOW.md`: Git 工作流和上游同步文档
- ✅ 首次推送到远程仓库

**架构决策**:
- 采用官方推荐的上游管理模式，可持续获取 ShipAny 模板更新
- 保持私有仓库，符合 ShipAny 许可证要求
- 使用分支策略便于管理模板更新和项目定制

---

## 技术栈

### 核心框架
- **Next.js 16.0.0**: App Router + Turbopack + React 19.2 (React Compiler enabled)
- **TypeScript 5**: 严格类型检查

### 数据层
- **Drizzle ORM 0.44.2**: 类型安全的数据库查询
- **PostgreSQL**: 默认数据库（支持 MySQL/SQLite/Turso 切换）
- **单例模式**: `DB_SINGLETON_ENABLED=true` 避免 serverless 连接池耗尽

### 认证与权限
- **better-auth 1.3.7**: OAuth + 邮箱验证码 + 密码登录
- **自定义 RBAC**: 资源-操作权限模型 (`resource.action`)
- **动态认证**: `getAuth()` 确保数据库在 API 路由中可用 (src/core/auth/index.ts:7)

### AI 集成
- **Vercel AI SDK 5.0**: 统一 AI 接口
- **Replicate + OpenRouter**: 多 AI 提供商支持
- **流式响应**: 实时生成内容

### 支付系统
- **Stripe, PayPal, 微信支付, 支付宝**: 多网关集成
- **Creem**: 统一支付抽象层 (src/extensions/payment/creem.ts)
- **订阅 + 积分**: 双计费模式

### UI/UX
- **Tailwind CSS 4 + shadcn/ui**: 组件系统
- **next-intl 4.3.4**: 中英文国际化
- **fumadocs**: MDX 文档系统

### 包管理
- **pnpm**: 必须使用 pnpm（React 19 依赖管理）

## 项目架构

### 核心目录结构

```
src/
├── app/
│   ├── [locale]/                    # 国际化路由根目录
│   │   ├── (admin)/                # 管理后台 - RBAC 保护
│   │   ├── (auth)/                 # 认证页面
│   │   ├── (chat)/                 # AI 聊天界面
│   │   ├── (docs)/                 # fumadocs 文档
│   │   ├── (landing)/              # 落地页和用户功能
│   │   └── layout.tsx              # 国际化布局
│   └── api/                        # API 路由
│       ├── ai/{generate,query}     # AI 生成接口
│       ├── auth/[...all]           # better-auth 认证端点
│       ├── chat/*                  # 聊天管理接口
│       ├── payment/{checkout,notify} # 支付接口
│       └── user/*                  # 用户信息接口
├── config/
│   ├── db/schema.ts                # Drizzle 数据库 Schema（核心数据模型）
│   ├── locale/messages/{en,zh}/    # 国际化翻译文件
│   └── index.ts                    # 环境变量配置 (envConfigs)
├── core/                           # 核心系统模块（不要随意修改）
│   ├── auth/
│   │   ├── index.ts                # 动态认证 getAuth()
│   │   └── config.ts               # better-auth 配置
│   ├── db/
│   │   ├── index.ts                # 数据库连接单例
│   │   └── config.ts               # Drizzle 配置
│   ├── rbac/
│   │   └── permission.ts           # RBAC 权限检查函数
│   └── i18n/                       # next-intl 配置
├── shared/                         # 共享代码（可自由扩展）
│   ├── blocks/                     # 业务组件块
│   ├── components/                 # UI 组件
│   ├── models/                     # 数据查询抽象层
│   ├── services/                   # 业务服务层
│   └── lib/                        # 工具函数
├── extensions/                     # 第三方服务集成
│   ├── ai/{replicate,kie}.ts       # AI 服务适配器
│   ├── payment/{stripe,paypal,creem}.ts # 支付网关
│   └── storage/{s3,r2}.ts          # 对象存储
└── types/                          # TypeScript 类型定义

scripts/
├── init-rbac.ts                    # 初始化 RBAC（创建默认角色和权限）
└── assign-role.ts                  # 手动分配角色给用户

content/                            # MDX 内容
├── docs/                           # 技术文档
└── posts/                          # 博客文章
```

### 关键架构模式

#### 1. 路由组织 (App Router)
- **路由组** `(group)`: 不影响 URL 的组织方式，实现不同布局
  - `(admin)` → 侧边栏管理界面
  - `(landing)` → 导航栏落地页
  - `(chat)` → AI 聊天专用布局
  - `(docs)` → 文档双栏布局
- **国际化路由**: `[locale]` 动态段捕获语言代码 (en/zh)
- **RBAC 保护**: 管理路由在 layout.tsx 中调用权限检查

#### 2. 认证系统架构
- **动态认证**: API 路由中使用 `const auth = await getAuth()` (src/core/auth/index.ts:7)
  - 避免在模块顶层初始化导致数据库未就绪
- **会话管理**: 数据库存储，支持多设备登录
- **认证流程**: OAuth → 邮箱验证码 → 密码登录（三种方式）

#### 3. RBAC 权限系统
- **权限格式**: `resource.action`（如 `admin.users.read`）
- **通配符支持**: `admin.posts.*` 匹配所有文章操作
- **权限检查函数** (src/core/rbac/permission.ts):
  - `requirePermission()` - 单个权限，失败重定向
  - `requireAnyPermission()` - 任意一个通过即可
  - `requireAllPermissions()` - 需要全部权限
  - `hasPermission()` - 布尔检查，不重定向
- **初始化**: `pnpm rbac:init --admin-email=your@email.com` 创建默认角色

#### 4. 数据层架构
- **Schema 定义**: src/config/db/schema.ts（所有表定义）
- **Model 抽象**: src/shared/models/*.ts（业务查询逻辑）
- **Service 层**: src/shared/services/*.ts（跨 model 业务逻辑）
- **数据库切换**: `DATABASE_PROVIDER` 环境变量（postgresql/mysql/sqlite/turso）

#### 5. AI 功能集成流程
1. 用户请求 → `/api/ai/generate` 或 `/api/ai/query`
2. 检查积分余额
3. 调用 AI SDK（Replicate/OpenRouter）
4. 扣除积分 + 记录 AI 任务
5. 流式返回结果

#### 6. 支付流程
1. 用户选择套餐 → `/api/payment/checkout`
2. 创建订单记录
3. 重定向到支付网关
4. 支付完成 → Webhook `/api/payment/notify/[provider]`
5. 验证签名 → 更新订单 → 发放积分/订阅

#### 7. 国际化架构
- **翻译文件**: `src/config/locale/messages/{locale}/{module}/`
  - 按功能模块拆分（admin/settings/landing）
- **使用方式**: `useTranslations('namespace')` hook
- **命名空间**: 对应 JSON 文件路径（如 `admin/users` → `admin/users.json`）

## 常用命令

### 开发
```bash
pnpm dev                      # 启动开发服务器 (使用 Turbopack)
pnpm build                    # 生产构建
pnpm build:fast               # 快速构建 (增加内存限制)
pnpm start                    # 启动生产服务器
pnpm lint                     # ESLint 检查
pnpm format                   # Prettier 格式化代码
pnpm format:check             # 检查代码格式
```

### 数据库
```bash
pnpm db:generate              # 生成 Drizzle 迁移文件
pnpm db:migrate               # 执行数据库迁移
pnpm db:push                  # 推送 schema 到数据库 (开发环境快捷方式)
pnpm db:studio                # 启动 Drizzle Studio (数据库可视化界面)
```

### 认证系统
```bash
pnpm auth:generate            # 生成 better-auth 相关文件
```

### RBAC 系统
```bash
pnpm rbac:init                # 初始化 RBAC (创建默认角色和权限)
pnpm rbac:init --admin-email=your@email.com  # 初始化并分配 super_admin 角色
pnpm rbac:assign              # 手动分配角色给用户
```

### Cloudflare 部署
```bash
pnpm cf:preview               # 预览 Cloudflare 部署
pnpm cf:deploy                # 部署到 Cloudflare Workers
pnpm cf:upload                # 上传构建到 Cloudflare
pnpm cf:typegen               # 生成 Cloudflare 类型定义
```

## 开发工作流

### 1. 首次设置
```bash
# 1. 克隆仓库
git clone https://github.com/alabo-x/nanobananapro.git
cd nanobananapro

# 2. 安装依赖（必须使用 pnpm）
pnpm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，至少配置以下变量：
# - DATABASE_URL (PostgreSQL 连接字符串)
# - AUTH_SECRET (运行: openssl rand -base64 32)
# - AI 提供商 API 密钥（可选）
# - 支付网关凭证（可选）

# 4. 初始化数据库
pnpm db:push              # 推送 schema 到数据库
pnpm rbac:init --admin-email=your@email.com  # 创建默认角色和管理员

# 5. 启动开发服务器
pnpm dev
# 访问 http://localhost:3000
```

### 2. 数据库变更流程
```bash
# 开发环境快捷方式（推荐）
pnpm db:push              # 直接推送 schema 变更，跳过迁移文件

# 生产环境正式流程
pnpm db:generate          # 生成迁移文件
pnpm db:migrate           # 执行迁移

# 数据库可视化工具
pnpm db:studio            # 打开 Drizzle Studio
```

**数据库 Schema 变更步骤**:
1. 修改 `src/config/db/schema.ts`
2. 运行 `pnpm db:push`（开发）或 `pnpm db:generate && pnpm db:migrate`（生产）
3. 相关 Model 也需要同步更新（`src/shared/models/*.ts`）

### 3. 添加新 RBAC 权限
```bash
# 1. 编辑权限定义
# src/core/rbac/permission.ts - 添加权限常量
# scripts/init-rbac.ts - 在 defaultPermissions 数组中添加权限

# 2. 重新初始化（幂等操作，不会删除现有数据）
pnpm rbac:init

# 3. 手动分配角色（如需要）
pnpm rbac:assign
```

### 4. 国际化翻译
```bash
# 1. 添加翻译文件
# src/config/locale/messages/en/{module}.json
# src/config/locale/messages/zh/{module}.json

# 2. 在组件中使用
# const t = useTranslations('module')
# t('key')
```

**翻译文件命名规则**:
- 模块化拆分: `admin/users.json`, `settings/profile.json`
- 组件使用: `useTranslations('admin/users')`

### 5. 添加新 API 路由
```typescript
// src/app/api/your-endpoint/route.ts
import { getAuth } from '@/core/auth'
import { db } from '@/core/db'

export async function POST(request: Request) {
  const auth = await getAuth()  // 动态认证
  const session = await auth.api.getSession({ headers: request.headers })

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 业务逻辑...
}
```

**注意**: API 路由中必须使用 `await getAuth()`，不要在模块顶层导入 auth 实例

## 关键技术细节

### Path Aliases
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],           // 主要代码路径
      "@/.source": ["./.source"]    // fumadocs 文档源（自动生成）
    }
  }
}
```

### 环境变量加载顺序
```
.env.development (开发环境优先) → .env (通用配置) → 运行时环境变量
```

**关键配置** (src/config/index.ts:20):
- `DATABASE_URL`: 数据库连接字符串
- `DATABASE_PROVIDER`: `postgresql` | `mysql` | `sqlite` | `turso`
- `DB_SINGLETON_ENABLED`: `true` 推荐（避免 serverless 连接池耗尽）
- `AUTH_SECRET`: 认证密钥（`openssl rand -base64 32`）
- `AUTH_URL`: 认证回调 URL（生产环境必须配置）

### 数据库连接单例模式
**问题**: Vercel/serverless 环境会复用函数实例，导致连接池耗尽
**解决**: 使用单例模式 (src/core/db/index.ts)
```typescript
// 正确做法
import { db } from '@/core/db'

// 错误做法（会创建多个连接）
const db = drizzle(...)
```

### 动态认证配置
**问题**: 在模块顶层初始化 auth 会导致数据库未就绪
**解决**: API 路由中使用 `await getAuth()`
```typescript
// 正确做法 (src/core/auth/index.ts:7)
const auth = await getAuth()

// 错误做法（Edge Runtime 不支持）
import { auth } from '@/core/auth'  // ❌
```

### RBAC 权限检查最佳实践
```typescript
import {
  requirePermission,        // 单个权限，失败抛出 redirect
  requireAnyPermission,     // 任意一个通过
  requireAllPermissions,    // 必须全部拥有
  hasPermission            // 布尔检查，不重定向
} from '@/core/rbac'

// 在 Server Component 中使用
await requirePermission('admin.users.read')

// 在 Server Action 中使用
if (!(await hasPermission('admin.posts.delete'))) {
  return { error: 'Forbidden' }
}
```

### React Compiler 注意事项
- **已启用**: `babel-plugin-react-compiler` (babel.config.js)
- **规则**: 遵循 [React Rules](https://react.dev/reference/rules)
  - 组件和 hooks 必须是纯函数
  - 避免在 render 中修改对象/数组
  - 使用 `useCallback`/`useMemo` 时让 Compiler 自动优化

### Turbopack 开发模式
- **启用**: `pnpm dev` 默认使用 Turbopack
- **优势**: 更快的 HMR，更好的 Tree Shaking
- **限制**: 某些 webpack 插件不支持（查看 Next.js 文档）

## 重要注意事项

### 部署前检查清单
- [ ] **环境变量**: 生产环境配置 `AUTH_SECRET`, `DATABASE_URL`, `AUTH_URL`
- [ ] **数据库迁移**: `pnpm db:migrate` 应用所有迁移
- [ ] **RBAC 初始化**: `pnpm rbac:init --admin-email=admin@example.com`
- [ ] **支付 Webhook**: 配置 Stripe/PayPal webhook URL
- [ ] **AI API 密钥**: 验证 Replicate/OpenRouter 密钥有效
- [ ] **安全审计**: 检查 API 路由权限保护
- [ ] **性能测试**: 压测数据库连接池和 API 响应时间

### 安全最佳实践
1. **RBAC 保护**: 所有管理接口必须调用 `requirePermission()`
2. **输入验证**: 使用 Zod schema 验证用户输入
3. **SQL 注入防护**: Drizzle ORM 自动参数化查询
4. **XSS 防护**: React 自动转义，MDX 内容需审查
5. **Webhook 验证**: 支付 webhook 必须验证签名 (src/app/api/payment/notify/[provider]/route.ts)
6. **敏感信息**: API 密钥存储在环境变量，不提交到 Git

### 性能优化策略
1. **数据库索引**: schema.ts 中已添加常用查询索引（参考注释）
2. **连接池管理**: 使用单例模式 + `DB_SINGLETON_ENABLED=true`
3. **React Compiler**: 自动优化组件 re-render
4. **图片优化**: 使用 `next/image` 组件
5. **MDX 缓存**: fumadocs 自动缓存文档页面
6. **AI 流式响应**: 使用 `streamText()` 降低 TTFB

### 故障排查

#### 数据库连接失败
```bash
# 检查环境变量
echo $DATABASE_URL

# 测试连接
psql $DATABASE_URL

# 查看连接池状态
pnpm db:studio
```

#### 认证失败
```bash
# 检查 AUTH_SECRET
echo $AUTH_SECRET

# 重新生成密钥
openssl rand -base64 32

# 清除会话
# 删除数据库 session 表记录
```

#### RBAC 权限问题
```bash
# 查看用户角色
pnpm rbac:assign

# 重新初始化 RBAC
pnpm rbac:init
```

### 许可证与合规
- **基于**: ShipAny Template Two
- **许可证**: ShipAny LICENSE（不得公开发布源码）
- **私有仓库**: 必须保持 Private
- **商业使用**: 允许，但需遵守 ShipAny 许可证条款

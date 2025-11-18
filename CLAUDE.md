# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目快速概览

### 当前状态 (2025-11-18)
- **项目阶段**: 开发中
- **最新变更**: 支持微信支付和支付宝集成
- **待办事项**: 待用户指定

---

## 项目概述

这是一个基于 Next.js 16 的 AI SaaS 模板项目 (ShipAny Template Two),提供完整的 AI 功能集成、用户管理、支付系统和多语言支持。

## 技术栈

- **框架**: Next.js 16.0.0 with App Router (Turbopack)
- **React**: 19.2.0 with React Compiler
- **语言**: TypeScript 5
- **数据库**: PostgreSQL (通过 Drizzle ORM)
- **认证**: better-auth 1.3.7
- **权限管理**: 自定义 RBAC 系统
- **国际化**: next-intl 4.3.4
- **样式**: Tailwind CSS 4 + shadcn/ui
- **AI SDK**: Vercel AI SDK, Replicate, OpenRouter
- **支付**: Stripe, PayPal, 微信支付, 支付宝
- **包管理器**: pnpm

## 项目架构

### 核心目录结构

```
src/
├── app/[locale]/              # 国际化路由
│   ├── (admin)/              # 管理后台 - RBAC 保护
│   ├── (auth)/               # 认证页面 (登录/注册)
│   ├── (chat)/               # AI 聊天界面
│   ├── (docs)/               # 文档系统 (fumadocs)
│   └── (landing)/            # 落地页和用户功能
├── config/
│   ├── db/schema.ts          # Drizzle 数据库架构定义
│   ├── locale/messages/      # 国际化翻译文件
│   └── index.ts              # 环境变量配置
├── core/                     # 核心系统模块
│   ├── auth/                 # 认证配置 (better-auth)
│   ├── db/                   # 数据库连接和配置
│   ├── i18n/                 # 国际化配置
│   ├── rbac/                 # 权限系统 (RBAC)
│   └── theme/                # 主题系统
├── shared/
│   ├── blocks/               # 复用业务组件块
│   ├── components/           # UI 组件库
│   ├── models/               # 数据模型和查询
│   ├── services/             # 业务服务层
│   └── lib/                  # 工具函数
└── app/api/                  # API 路由
    ├── ai/                   # AI 生成接口
    ├── chat/                 # 聊天接口
    ├── payment/              # 支付接口
    └── user/                 # 用户接口

content/                      # MDX 内容
├── docs/                     # 文档内容
├── pages/                    # 静态页面 (隐私政策等)
└── posts/                    # 博客文章

scripts/                      # 工具脚本
├── init-rbac.ts             # 初始化 RBAC 系统
└── assign-role.ts           # 分配角色
```

### 架构模式

#### 1. 路由组织
- 使用 Next.js App Router 的路由组 `(group)` 实现不同布局
- 所有路由带 `[locale]` 动态段实现多语言支持
- 管理后台使用独立的 layout 和 RBAC 中间件保护

#### 2. 数据层架构
- **ORM**: Drizzle ORM - 类型安全的数据库查询
- **数据库**: 支持 PostgreSQL/MySQL/SQLite/Turso (通过 `DATABASE_PROVIDER` 配置)
- **Schema**: 集中在 `src/config/db/schema.ts`
- **Models**: `src/shared/models/` 提供业务查询抽象

#### 3. 认证与权限系统
- **认证**: better-auth (支持 OAuth、邮箱验证码、密码登录)
- **会话管理**: 数据库会话存储
- **RBAC**: 完整的角色-权限系统
  - 权限格式: `resource.action` (如 `admin.users.read`)
  - 支持通配符权限 (如 `admin.posts.*`)
  - 预定义角色: super_admin, admin, editor, viewer

#### 4. AI 功能集成
- 统一的 AI SDK 接口 (Vercel AI SDK)
- 支持多 AI 提供商: Replicate, OpenRouter
- AI 任务管理和追踪
- 流式响应支持

#### 5. 支付系统
- 多支付网关集成: Stripe, PayPal, 微信支付, 支付宝
- 订阅管理
- 积分系统 (Credits)
- Webhook 回调处理

#### 6. 国际化
- next-intl 实现多语言
- 翻译文件按功能模块组织: `src/config/locale/messages/{locale}/{module}/`
- 支持语言: en (英语), zh (简体中文)

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

### 1. 环境配置
1. 复制 `.env.example` 到 `.env.development` 或 `.env`
2. 配置数据库连接: `DATABASE_URL`
3. 生成认证密钥: `openssl rand -base64 32` → `AUTH_SECRET`
4. 配置 AI 提供商 API 密钥
5. 配置支付网关凭证

### 2. 数据库初始化
```bash
# 推送 schema 到数据库
pnpm db:push

# 初始化 RBAC 系统
pnpm rbac:init --admin-email=admin@example.com
```

### 3. 启动开发
```bash
pnpm dev
```
访问 `http://localhost:3000`

### 4. 数据库变更流程
1. 修改 `src/config/db/schema.ts`
2. 运行 `pnpm db:generate` 生成迁移文件
3. 运行 `pnpm db:migrate` 应用迁移
4. 开发环境快捷方式: `pnpm db:push` (跳过迁移文件)

### 5. 添加新权限
1. 在 `src/core/rbac/permission.ts` 的 `PERMISSIONS` 对象中添加常量
2. 在 `scripts/init-rbac.ts` 的 `defaultPermissions` 数组中添加权限定义
3. 运行 `pnpm rbac:init` 更新数据库

### 6. 国际化翻译
1. 在 `src/config/locale/messages/en/` 和 `.../zh/` 添加/修改 JSON 文件
2. 使用 `useTranslations('namespace')` 在组件中访问
3. 命名空间对应 JSON 文件路径

## 关键技术细节

### Path Aliases
- `@/*` → `src/*` 目录
- `@/.source` → `.source/index.ts` (fumadocs)

### 数据库连接
- 使用单例模式 (`DB_SINGLETON_ENABLED=true`) 避免 serverless 环境连接池耗尽
- 动态认证配置 (`getAuth()`) 确保数据库在 API 路由中可用

### RBAC 权限检查
- `requirePermission()` - 单个权限检查,失败重定向
- `requireAnyPermission()` - 任意权限通过即可
- `requireAllPermissions()` - 需要所有权限
- `requireAdminAccess()` - 检查管理后台访问权限
- `hasPermission()` - 布尔检查,不重定向

### AI 生成流程
1. 用户发起请求 → API 路由 (`/api/ai/*`)
2. 检查用户积分
3. 调用 AI SDK (Replicate/OpenRouter)
4. 扣除积分
5. 记录 AI 任务
6. 返回结果 (流式或完整响应)

### 支付流程
1. 用户选择套餐 → `/api/payment/checkout`
2. 创建订单记录
3. 重定向到支付网关
4. 支付完成 → Webhook 回调 `/api/payment/notify/[provider]`
5. 验证支付 → 更新订单状态 → 发放积分/订阅

### 布局系统
- `(admin)/layout.tsx` - 侧边栏管理界面
- `(chat)/layout.tsx` - AI 聊天专用布局
- `(landing)/layout.tsx` - 落地页导航栏布局
- `(docs)/layout.tsx` - 文档双栏布局 (fumadocs)

## 重要注意事项

### 部署前检查清单
1. **环境变量**: 确保生产环境所有环境变量已配置
2. **数据库迁移**: 运行 `pnpm db:migrate` 应用所有迁移
3. **RBAC 初始化**: 确保 RBAC 系统已初始化
4. **支付 Webhook**: 配置支付网关 webhook URL
5. **AI API 密钥**: 验证 AI 提供商 API 密钥有效
6. **AUTH_SECRET**: 生产环境使用强随机密钥

### 安全考虑
- 所有管理接口需通过 RBAC 权限检查
- API 密钥加密存储
- 支付 webhook 需验证签名
- 用户输入需验证 (使用 Zod)
- 图片上传需验证文件类型和大小

### 性能优化
- React Compiler 已启用
- Turbopack 开发模式
- 图片使用 Next.js Image 优化
- 数据库查询使用索引 (参见 schema.ts 注释)
- MDX 文档缓存 (fumadocs)

### 许可证
- 该项目使用 ShipAny LICENSE
- 不得公开发布 ShipAny 代码
- 非法使用将追究法律责任

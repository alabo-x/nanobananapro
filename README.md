# {{PROJECT_NAME}}

> 基于 NanoBanana2 模板的项目

## 技术栈

### 核心框架
- **Next.js 16.0.0** - React 框架，支持 App Router 和 Turbopack
- **React 19.2.0** - UI 库，启用 React Compiler
- **TypeScript 5** - 类型安全

### 数据库
- **Drizzle ORM 0.44.2** - 类型安全的 ORM
- **PostgreSQL / Turso** - 支持多种数据库

### 认证与授权
- **better-auth 1.3.7** - 现代认证解决方案
- **自定义 RBAC 系统** - 角色权限管理

### AI 集成
- **Vercel AI SDK 5.0** - AI 应用开发工具包
- **Replicate** - AI 模型托管
- **OpenRouter** - AI API 聚合

### 支付集成
- **Stripe 18.5** - 信用卡支付
- **PayPal** - PayPal 支付
- **微信支付** - 中国市场
- **支付宝** - 中国市场

### UI 组件
- **Tailwind CSS 4** - 样式框架
- **shadcn/ui** - 组件库
- **Radix UI** - 无样式组件
- **Framer Motion 12** - 动画库

### 国际化
- **next-intl 4.3.4** - i18n 解决方案
- 支持中英文

## 快速开始

```bash
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
```

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（Turbopack）
pnpm build            # 生产构建
pnpm start            # 启动生产服务器

# 数据库
pnpm db:generate      # 生成迁移文件
pnpm db:migrate       # 执行迁移
pnpm db:push          # 推送 schema 到数据库
pnpm db:studio        # 打开 Drizzle Studio

# RBAC
pnpm rbac:init        # 初始化权限系统
pnpm rbac:assign      # 分配角色

# 代码质量
pnpm lint             # 运行 ESLint
pnpm format           # 格式化代码
pnpm format:check     # 检查格式
```

## 项目结构

```
src/
├── app/              # Next.js App Router
├── config/           # 配置文件
│   ├── locale/       # 国际化文件
│   └── index.ts      # 环境配置
├── core/             # 核心功能
│   ├── auth/         # 认证模块
│   ├── db/           # 数据库配置
│   ├── rbac/         # 权限系统
│   └── theme/        # 主题系统
├── shared/           # 共享模块
│   ├── blocks/       # 页面区块
│   ├── components/   # UI 组件
│   ├── lib/          # 工具函数
│   ├── models/       # 数据模型
│   └── services/     # 业务服务
└── types/            # TypeScript 类型
```

## 文档

- [开发指南](./CLAUDE.md) - 完整的开发文档
- [Git 工作流](./docs/GIT_WORKFLOW.md) - Git 使用指南
- [模板改造计划](./docs/TEMPLATE_PLAN_LITE.md) - 模板化方案

## 许可证

基于 [ShipAny LICENSE](./LICENSE)

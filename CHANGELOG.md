# Changelog - Nano Banana 2

本文件记录项目的历史变更记录，从 CLAUDE.md 中迁移而来。

---

## 2025-11-27

### 积分系统漏洞修复 - 前后端积分消耗不一致
**变更类型**: Bugfix/Critical
**影响范围**: 后端 API

**问题描述**:
- 后端 API 固定使用 `scene` 判断积分消耗（image-to-image = 4积分）
- 完全忽略前端传递的 `resolution` 参数
- 导致用户看到的积分与实际扣除不一致

**影响范围**:
| 分辨率 | 前端显示 | 后端实际扣除 | 差异 |
|--------|----------|--------------|------|
| 1K | 2 积分 | 4 积分 | 多扣 2 积分 |
| 2K | 3 积分 | 4 积分 | 多扣 1 积分 |
| 4K | 6 积分 | 4 积分 | 少扣 2 积分 |

**修复内容**:
```typescript
// 修改前：固定值
if (scene === 'image-to-image') {
  costCredits = 4;
}

// 修改后：按分辨率计算
const resolution = options?.resolution || '1k';
const creditsMap: Record<string, number> = {
  '1k': 2,
  '2k': 3,
  '4k': 6,
};
costCredits = creditsMap[resolution] || 2;
```

**修改的文件**:
- `src/app/api/ai/generate/route.ts:42-63` - 积分计算逻辑重构

---

### Features 功能描述修正 - 移除误导性"批量编辑"文案
**变更类型**: Content/Accuracy
**影响范围**: 前端 - Features 板块

**问题分析**:
- "Multi-Format Support" 描述声称支持"批量编辑"，但实际功能不支持
- 用户可能误解为"上传10张图片 → 得到10张编辑后的图片"
- 实际功能：多张参考图片用于增强AI理解，每次请求输出单张图片

**修改内容**:
| 语言 | 修改前 | 修改后 |
|------|--------|--------|
| 英文 | Multi-Format Support | One-Click Perfection |
| 西班牙语 | Soporte Multi-Formato | Perfección en Un Clic |

**描述变更**:
- 修改前："Process multiple images simultaneously. Support for batch editing and various image formats."
- 修改后："Get professional results in a single attempt. No more endless iterations - describe once, done."

**图标变更**: `Images` → `MousePointerClick`

**修改的文件**:
- `src/config/locale/messages/en/landing.json:176-179`
- `src/config/locale/messages/es/landing.json:176-179`

---

## 2025-11-26

### 代码库全面清理 - 删除博客残留和未使用依赖
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
- `source.config.ts` - 移除 docs 和 posts 配置
- `src/core/docs/source.ts` - 精简为只保留 pagesSource
- `src/shared/models/post.tsx` - 精简为只保留 getLocalPage
- `src/themes/default/blocks/index.tsx` - 移除 blog 导出
- `src/config/locale/messages/en/admin/sidebar.json` - 移除 Posts/Categories 菜单
- `src/config/locale/messages/es/admin/sidebar.json` - 移除 Posts/Categories 菜单

**保留的关键功能**:
- `content/pages/` - 隐私政策、服务条款等静态页面
- `pagesSource` - fumadocs 页面加载器
- `getLocalPage` - 获取静态页面内容的函数

**构建验证**: ✅ TypeScript 编译成功

---

### SEO 技术优化 - sitemap 动态生成 + hreflang 支持
**变更类型**: SEO/Technical
**影响范围**: 全站 SEO 配置

**优化内容**:
1. **sitemap.xml 动态生成**
   - 新建 `src/app/sitemap.ts` 替代静态 `public/sitemap.xml`
   - 自动覆盖所有可索引页面（首页、价格页）
   - 支持多语言（en、es）

2. **hreflang 支持**
   - 修改 `src/shared/lib/seo.ts` 添加 `alternates.languages`
   - 自动生成双向链接 + x-default

3. **canonical URL 统一**
   - 统一格式：不带尾部斜杠
   - 英文：`https://nano-banana2.pro`、`https://nano-banana2.pro/pricing`
   - 西班牙语：`https://nano-banana2.pro/es`、`https://nano-banana2.pro/es/pricing`

4. **robots.txt 优化**
   - 添加 Sitemap 声明
   - 添加 API 路由禁止爬取

**修改的文件**:
- `src/shared/lib/seo.ts` - 添加 alternates.languages
- `src/app/layout.tsx` - 移除静态 hreflang 标签
- `src/app/[locale]/(landing)/page.tsx` - 添加 generateMetadata
- `src/app/sitemap.ts` - 新建
- `public/sitemap.xml` - 删除
- `public/robots.txt` - 添加 Sitemap 声明

---

### 品牌词全站替换 - NanoBananaPro → Nano Banana 2
**变更类型**: Branding
**影响范围**: 全站

**替换规则**:
- 品牌显示名：`Nano Banana 2`（有空格）
- 邮箱域名：`@nano-banana2.pro`
- 技术标识符：`nano-banana2`

**修改的文件** (10+):
- `package.json` - name, homepage, repository
- `src/config/index.ts` - app_name 默认值
- `landing.json` (en/es) - 所有品牌名和邮箱
- `common.json` (en/es) - Meta 信息
- `pricing.json` (en/es) - 套餐名称
- `admin/sidebar.json` (en/es) - Logo 标题

---

## 2025-11-25

### ImageGenerator 核心组件完整 UI/UX 优化 - 专业化改造
**变更类型**: Feature/UX/Content
**影响范围**: 前端 - ImageGenerator 组件 + ImageUploader 组件

**优化目标**:
- 根据行业成熟网站标准（Midjourney、DALL-E、Stable Diffusion）优化文案
- 修正 API 限制配置（根据 kie.ai/nano-banana-pro 实际要求）
- 增强上传区域视觉效果和交互体验
- 统一所有文案为 "Create" 核心动词，保持专业简洁

**完成的优化** (共 9 项):
1. Prompt 标签专业化: "What do you want to edit?" → "Prompt"
2. 生成按钮文案简化: "Transform Now" → "Create • {credits} Credits"
3. 未登录按钮文案统一: "Sign In to Create"
4. 空状态文案优化: "Ready to Create" + "Upload an image and describe your edits"
5. Prompt Placeholder 指引优化
6. 输出区域标题简化: "Transformed Images" → "Output"
7. 图片数量和大小限制修正: maxImages=8, maxSizeMB=30
8. 上传区域样式改造: h-40 w-full
9. 上传区域悬停动画增强

**修改的文件**:
- `src/config/locale/messages/en/ai/image.json`
- `src/config/locale/messages/es/ai/image.json`
- `src/shared/blocks/generator/image.tsx:157-158`
- `src/shared/blocks/common/image-uploader.tsx:343-358`

---

### ImageGenerator UI/文案优化方案批准 - 采用方案 A（通用版本）
**变更类型**: Planning/Content Strategy
**影响范围**: 前端 - ImageGenerator 组件文案

**方案对比**:
- 方案 A（通用版本）：统一文案，适合所有用户群体 ✅ 采用
- 方案 B（分层版本）：针对不同用户群体使用不同文案
- 方案 C（渐进式）：分阶段推出

**决策理由**:
1. 开发成本低
2. 适合所有用户群体
3. 突出核心优势
4. 遵循三大指导原则

---

### 纵横比选择器视觉优化 - 图标尺寸和颜色调整
**变更类型**: UX/Visual
**影响范围**: 前端 - ImageGenerator 组件

**解决方案**:
- SelectTrigger 图标: `w-6` → `w-4`，`bg-foreground/20` → `border border-current`
- SelectContent 图标: 保持 `w-6`，`bg-muted` → `border border-current`
- 颜色统一: 使用 `border-current` 自动继承父元素文字颜色

**修改的文件**:
- `src/shared/blocks/generator/image.tsx:560,573`

---

### UI 简化优化 - 分辨率和纵横比选择器重构
**变更类型**: UX/Refactor
**影响范围**: 前端 - ImageGenerator 组件

**解决方案**:
- 分辨率选择器: 简化为纯数字 "1K", "2K", "4K"
- 纵横比选择器: 从下拉框重构为图标式网格布局（4x2 网格，8 个选项）

**修改的文件**:
- `src/shared/blocks/generator/image.tsx:L150-220`

---

### 重大产品调整 - 专注 Image-to-Image 编辑 + 定价重构
**变更类型**: Strategy/Product/Pricing
**影响范围**: 全站

**核心决策**:
- 去掉 text-to-image 功能，专注 image-to-image 编辑
- 差异化定位：专业图片编辑工具
- 重新设计定价：Basic/Standard/Pro（$19/$49/$129/月）
- 积分消耗规则：1K=2积分, 2K=3积分, 4K=6积分

**定价重构**:
| 套餐 | 月付 | 年付 | 积分/月 |
|------|------|------|---------|
| Basic | $19 | $12.7/月 | 600 |
| Standard | $49 | $32.8/月 | 1800 |
| Pro | $129 | $86.4/月 | 6000 |

---

### 内容优化 - 对齐 Google Gemini 官方特性
**变更类型**: Content/Feature
**影响范围**: 前端 - Landing 页面

**变更内容**:
- 更新 Footer 品牌描述
- Features 特性优化（4K 分辨率输出、高保真文本呈现）

---

## 2025-11-20

### 语言配置优化 - 删除中文，添加西班牙语
**变更类型**: Configuration/i18n
**影响范围**: 全站国际化

**变更内容**:
- 删除中文（zh）语言配置和所有翻译文件（25个文件）
- 添加西班牙语（es）支持
- 更新语言配置：en (English) 和 es (Español)

---

### 价格页面内容优化 - 从模板销售改为 AI 服务订阅
**变更类型**: Content/Product
**影响范围**: 前端 - 价格页面

**变更内容**:
- 将定位从"SaaS 模板销售"改为"AI 图片编辑服务订阅"
- 采用方案 B：标准 3 套餐（Starter/Pro/Premium）
- 删除"按次付费"选项

---

### 清理未使用的翻译配置文件
**变更类型**: Cleanup
删除 blog.json 翻译文件

---

### Footer 导航优化 - 删除合作伙伴栏目
**变更类型**: Cleanup/UX
删除 Footer "合作伙伴"/"Friends" 栏目

---

### 删除博客和文档功能
**变更类型**: Cleanup/Refactor
**影响范围**: 前端 - 导航栏、Footer、页面路由

**删除的目录**:
- `src/app/[locale]/(landing)/blog/`
- `src/app/[locale]/(docs)/`
- `src/app/api/docs/`

---

### 大规模资源清理 + Showcases 页面重构
**变更类型**: Cleanup/Refactor/Performance
**影响范围**: 前端 + 资源文件

**删除的资源** (总计 ~23MB):
- cases 文件夹清理
- ShipAny 模板资源清理

**性能优化结果**:
- `/imgs/cases/`: 18.4MB → 404KB（压缩 98%）
- 总节省空间: ~23MB

---

### Showcase 案例展示板块开发
**变更类型**: Feature/Content/Performance

**开发内容**:
- 图片优化: 转换 PNG 为 WebP 格式，压缩 85-95%
- 创建 Showcase 组件
- 4个展示案例

---

### FAQ 板块内容优化
**变更类型**: Content/UX
将 FAQ 从"NextJS 开发工具问答"改为"AI 图片编辑器使用问答"

---

### Testimonials 板块内容优化
**变更类型**: Content/UX
将用户评价从"开发者创业故事"改为"内容创作者真实使用体验"

---

### Features 板块内容优化
**变更类型**: Content/UX
将 Features 从"SaaS 开发工具特性"改为"AI 图片编辑能力"

---

### 价格页面布局修复
**变更类型**: Bugfix
修复 Tailwind CSS 动态类名问题和 next-intl 上下文缺失

---

### ImageGenerator 核心功能优化
**变更类型**: Feature/UX/Content

**变更内容**:
- 统一文案为 "Editor" 定位
- 调整 Tab 顺序（Image to Image 优先）
- 移除 Provider 选择器
- 简化 Model 选择

---

### ImageGenerator 添加 Section 标题
**变更类型**: Feature/UX
为 ImageGenerator 组件添加 section 标题

---

### Hero 内容和样式优化 - 参考 imgeditor.co
**变更类型**: Content/UX/Style

**Hero 新内容**:
- 标题: "Nano Banana Pro"
- 添加功能标签组件
- 优化样式使 Hero 更大气

---

## 2025-11-19

### 首页板块精简 - 参考 imgeditor.co
**变更类型**: Refactor/UX

**删除的板块**:
- Logos, FeaturesList, FeaturesAccordion, FeaturesStep, Stats, Subscribe, CTA

**保留的板块**:
- Hero → ImageGenerator → Features → Testimonials → FAQ

---

### 首页重构 - 图片生成器作为独立板块
**变更类型**: Refactor/UX

**变更内容**:
- 将 ImageGenerator 作为独立板块放在 Hero 之后
- 删除导航栏 "AI" 下拉菜单
- 更新首页 Meta 信息

---

### 代码清理 - 只保留图片生成功能
**变更类型**: Cleanup/Refactor
**影响范围**: 全栈

**删除的功能**:
- 聊天系统 (chat, chat_message 表, API, 组件)
- AI 音乐生成器 (Kie Provider)
- AI 视频/音频/聊天机器人页面
- BuiltWith 组件

**数据库变更**:
- 删除表: chat, chat_message
- 当前表数: 16 个

---

### ShipAny 快速开始全部完成
**变更类型**: Setup/Configuration

**完成的步骤**:
1. 项目初始化 (pnpm install - 1059 packages)
2. 环境变量配置
3. 数据库配置 (Supabase PostgreSQL)
4. 认证配置 (AUTH_SECRET)
5. RBAC 初始化 (29 个权限, 4 个角色)
6. 注册管理员账户
7. 分配 super_admin 角色

---

## 2025-11-18

### 模板化改造方案规划
**变更类型**: Planning/Documentation

**变更内容**:
- 创建详细的模板化改造方案: `docs/TEMPLATE_PLAN.md`
- 确定三层架构设计
- 设计 5 阶段改造计划

---

### Git 仓库初始化和上游管理配置
**变更类型**: Setup/Configuration
**Git commit**: 0ac84ee

**变更内容**:
- 创建私有 GitHub 仓库: `alabo-x/nanobanana2`
- 配置双远程仓库架构 (origin + upstream)
- 添加项目文档 (CLAUDE.md, docs/GIT_WORKFLOW.md)

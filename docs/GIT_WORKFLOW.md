# Git 工作流文档 - NanoBanana2 项目

## 项目代码仓库管理策略

本项目基于 ShipAny Template Two 商业模板开发，采用**上游仓库管理模式**，以便持续获取官方更新和安全补丁。

---

## 仓库架构

```
upstream (上游) ──→ ShipAny 官方模板仓库
    ↓ fetch & merge
origin (源)     ──→ 你的私有项目仓库 (github.com/yourusername/nanobanana2)
    ↓ clone & push
local (本地)    ──→ 你的开发环境
```

### 远程仓库配置

```bash
# 查看当前配置
git remote -v

# 应该显示：
# origin     git@github.com:yourusername/nanobanana2.git (fetch/push)
# upstream   git@github.com:shipanyai/shipany-template-two.git (fetch/push)
```

---

## 初始设置（已完成）

### 步骤 1: 重命名原始远程仓库
```bash
# 将克隆时的 origin 重命名为 upstream
git remote rename origin upstream
```

### 步骤 2: 添加你的私有仓库
```bash
# 在 GitHub 创建私有仓库后，添加为新的 origin
git remote add origin git@github.com:yourusername/nanobanana2.git
```

### 步骤 3: 推送到你的仓库
```bash
# 推送当前分支
git push -u origin dev

# 推送所有分支（可选）
git push origin --all

# 推送标签（可选）
git push origin --tags
```

---

## 日常开发工作流

### 1. 本地开发
```bash
# 创建功能分支（推荐）
git checkout -b feature/your-feature-name

# 或直接在 dev 分支开发
git checkout dev

# 提交代码
git add .
git commit -m "feat: 添加新功能"

# 推送到你的仓库
git push origin feature/your-feature-name
# 或
git push origin dev
```

### 2. 代码审查和合并
```bash
# 如果使用功能分支，合并到 dev
git checkout dev
git merge feature/your-feature-name
git push origin dev

# 删除已合并的功能分支
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## 同步 ShipAny 官方更新

### 何时需要同步？

✅ **推荐同步的情况**：
- 官方发布安全补丁
- 重大框架升级（如 Next.js 版本更新）
- 新增实用功能（支付网关、AI 集成等）
- 依赖包漏洞修复

⚠️ **谨慎同步的情况**：
- 你的项目已大量定制
- 官方更新与你的需求不符
- 更新可能引入破坏性变更

### 同步步骤

#### 方法 A: 直接合并（适合小更新）

```bash
# 1. 确保本地代码已提交
git status
# 如有未提交的修改，先提交或暂存
git stash

# 2. 切换到主开发分支
git checkout dev

# 3. 拉取上游更新
git fetch upstream

# 4. 查看更新内容（重要！）
git log upstream/dev --oneline -20
git diff dev..upstream/dev

# 5. 合并上游更新
git merge upstream/dev

# 6. 解决冲突（如果有）
# 编辑冲突文件，然后：
git add .
git commit -m "chore: merge upstream updates from ShipAny"

# 7. 测试项目
pnpm dev
pnpm build

# 8. 推送到你的仓库
git push origin dev

# 9. 恢复之前暂存的修改（如果有）
git stash pop
```

#### 方法 B: 使用同步分支（推荐，适合大更新）

```bash
# 1. 创建专门的同步分支
git checkout -b upstream-sync
git fetch upstream
git merge upstream/dev

# 2. 在同步分支测试
pnpm install
pnpm dev
pnpm build
pnpm lint

# 3. 测试通过后，合并到主分支
git checkout dev
git merge upstream-sync

# 4. 推送
git push origin dev

# 5. 删除同步分支
git branch -d upstream-sync
```

#### 方法 C: 选择性合并（Cherry-pick）

```bash
# 只合并特定的提交
git fetch upstream
git log upstream/dev --oneline -20

# 挑选需要的提交
git cherry-pick <commit-hash>

# 推送
git push origin dev
```

---

## 冲突解决指南

### 常见冲突场景

1. **配置文件冲突** (如 `package.json`, `.env.example`)
   - 优先保留你的配置
   - 手动合并新增的依赖包

2. **核心功能冲突** (如 `src/core/auth/`, `src/core/db/`)
   - 仔细对比差异
   - 如果你有定制，优先保留你的代码
   - 记录官方的改进点，评估是否需要应用

3. **UI 组件冲突** (如 `src/shared/components/`)
   - 如果你未修改，接受上游版本
   - 如果已定制，保留你的版本

### 冲突解决步骤

```bash
# 1. 查看冲突文件
git status

# 2. 打开冲突文件，寻找冲突标记
# <<<<<<< HEAD
#   你的代码
# =======
#   上游代码
# >>>>>>> upstream/dev

# 3. 手动编辑，选择保留的代码

# 4. 标记为已解决
git add <冲突文件>

# 5. 继续合并
git merge --continue
# 或如果是 rebase
git rebase --continue

# 6. 如果合并过程出错，可以中止
git merge --abort
# 或
git rebase --abort
```

---

## 分支管理策略

### 推荐的分支结构

```
main/master     ──→ 生产环境分支（稳定版本）
    ↑
   dev          ──→ 开发分支（日常开发）
    ↑
feature/*       ──→ 功能分支（新功能开发）
    ↑
hotfix/*        ──→ 紧急修复分支
    ↑
upstream-sync   ──→ 上游同步分支（临时）
```

### 分支命名规范

```bash
# 功能分支
feature/user-authentication
feature/payment-integration
feature/ai-chatbot

# 修复分支
bugfix/login-error
bugfix/payment-callback

# 紧急修复
hotfix/security-patch
hotfix/critical-bug

# 上游同步
upstream-sync
upstream-sync-2024-01
```

---

## 标签管理

### 创建版本标签

```bash
# 标记重要里程碑
git tag -a v0.1.0 -m "Initial NanoBanana2 release"
git tag -a v0.2.0 -m "Added payment integration"

# 推送标签
git push origin v0.1.0
git push origin --tags

# 查看所有标签
git tag -l
```

### 标签命名建议

```
v0.0.1-template-base   ──→ 模板初始状态
v0.1.0                 ──→ 第一个可用版本
v0.2.0                 ──→ 重要功能更新
v1.0.0                 ──→ 正式发布版本
v1.0.1                 ──→ 小补丁
```

---

## 常见问题 FAQ

### Q1: 多久同步一次上游更新？

**建议**：
- 每月检查一次上游更新
- 有安全公告时立即同步
- 大版本升级前同步最新稳定版

```bash
# 定期检查（不合并）
git fetch upstream
git log HEAD..upstream/dev --oneline
```

### Q2: 如何查看自己的修改与模板的差异？

```bash
# 查看你相对于模板的所有修改
git diff upstream/dev

# 查看特定文件的差异
git diff upstream/dev -- src/config/index.ts

# 查看统计信息
git diff --stat upstream/dev
```

### Q3: 如果上游更新破坏了我的代码怎么办？

```bash
# 方法 1: 回滚合并
git reset --hard HEAD~1

# 方法 2: 使用 revert
git revert -m 1 HEAD

# 方法 3: 回到合并前的状态
git reflog  # 找到合并前的 commit
git reset --hard <commit-hash>
```

### Q4: 可以完全断开与上游的连接吗？

可以，但**不推荐**：
```bash
# 删除上游仓库连接
git remote remove upstream

# 后果：
# - 无法获取官方更新
# - 失去持续维护的价值
# - 需要自行处理安全漏洞
```

### Q5: 如何保持私有仓库的隐私？

```bash
# 1. 确保 GitHub 仓库设置为 Private
# 2. 不要 fork 原仓库（会公开关联）
# 3. 不要推送到公共仓库
# 4. 环境变量文件加入 .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
```

---

## 紧急情况处理

### 场景 1: 误推送到上游仓库

```bash
# 立即联系 ShipAny 官方
# 通常上游仓库不会给你推送权限，但如果误操作：
# 1. 立即通知 support@shipany.ai
# 2. 删除本地的 upstream remote
# 3. 重新配置仓库
```

### 场景 2: 本地仓库损坏

```bash
# 1. 备份当前代码
cp -r nanobanana2 nanobanana2-backup

# 2. 从你的远程仓库重新克隆
git clone git@github.com:yourusername/nanobanana2.git nanobanana2-new

# 3. 重新配置上游
cd nanobanana2-new
git remote add upstream git@github.com:shipanyai/shipany-template-two.git
```

### 场景 3: 合并冲突太多无法解决

```bash
# 1. 中止当前合并
git merge --abort

# 2. 创建对比分支
git checkout -b compare-upstream upstream/dev

# 3. 手动复制需要的文件
# 4. 回到开发分支继续工作
git checkout dev
```

---

## 最佳实践

### ✅ 推荐做法

1. **定期备份**：每周推送到远程仓库
2. **小步提交**：每个功能单独提交，便于回滚
3. **描述性提交信息**：使用 Conventional Commits 规范
4. **测试后合并**：合并上游更新后，完整测试项目
5. **文档更新**：重大变更更新 CLAUDE.md

### ❌ 避免做法

1. 不要直接在 upstream 分支开发
2. 不要强制推送到远程（`git push -f`）
3. 不要合并未经测试的上游更新到生产环境
4. 不要删除 .git 目录重新初始化（会丢失历史）
5. 不要提交敏感信息（API 密钥、密码）

---

## Commit 信息规范

采用 Conventional Commits 规范：

```bash
# 格式
<type>(<scope>): <subject>

# 类型 (type)
feat:     新功能
fix:      Bug 修复
docs:     文档更新
style:    代码格式（不影响功能）
refactor: 重构
perf:     性能优化
test:     测试相关
chore:    构建/工具链更新

# 示例
feat(auth): 添加微信登录支持
fix(payment): 修复支付宝回调问题
docs(readme): 更新部署说明
chore(deps): 升级 Next.js 到 16.0.1
refactor(chat): 重构聊天组件架构
```

---

## 快速参考命令

```bash
# 查看配置
git remote -v
git branch -a

# 日常提交
git add .
git commit -m "feat: 新功能"
git push origin dev

# 同步上游
git fetch upstream
git merge upstream/dev

# 冲突处理
git status                 # 查看冲突
git add <file>            # 标记已解决
git merge --continue      # 继续合并
git merge --abort         # 中止合并

# 分支操作
git checkout -b feature/xxx   # 创建并切换
git branch -d feature/xxx     # 删除本地分支
git push origin --delete feature/xxx  # 删除远程分支

# 查看历史
git log --oneline -10
git log --graph --oneline
git reflog

# 撤销操作
git reset --hard HEAD~1   # 撤销最后一次提交
git revert <commit>       # 创建反向提交
git stash                 # 暂存修改
git stash pop             # 恢复暂存
```

---

## 相关资源

- **ShipAny 官方文档**: https://shipany.ai/docs
- **Git 官方文档**: https://git-scm.com/doc
- **Conventional Commits**: https://www.conventionalcommits.org/
- **项目 CLAUDE.md**: 查看项目架构和开发指南

---

## 更新日志

- 2025-11-18: 初始版本，基于 ShipAny 官方推荐的仓库管理方式

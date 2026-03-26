# 个人网站

基于 [Astro](https://astro.build/) 与 TypeScript 的静态个人站点，包含博客、论文、项目等内容，界面支持中英文双语。

**线上地址：** [caoyumin97.github.io](https://caoyumin97.github.io)

## 环境要求

- Node.js **>= 22.12.0**（以 `package.json` 中 `engines` 为准）

## 本地开发

```bash
npm install
npm run dev
```

- **构建：** `npm run build`，产物在 `dist/`
- **预览生产构建：** `npm run preview`

## 部署

推送到 **`master`** 分支时，会通过 [GitHub Actions](.github/workflows/deploy.yml) 自动构建并部署到 **GitHub Pages**。

1. 仓库：`https://github.com/Caoyumin97/Caoyumin97.github.io`
2. **Settings > Pages**：将来源设为 **GitHub Actions**
3. 若启用了环境保护：**Settings > Environments > github-pages** 中需允许从 **`master`** 部署

站点根地址在 `astro.config.mjs` 的 `site` 字段中配置为 `https://caoyumin97.github.io`。

### 废弃远程 `main` 分支

若 `main` 仍是默认分支，GitHub 不允许直接删除，需先改默认分支：

1. **Settings > General > Default branch** → 选 **`master`**
2. 本地执行：`git push origin --delete main`

## 目录结构

| 路径 | 说明 |
|------|------|
| `src/pages/` | 页面路由 |
| `src/layouts/` | 页面布局 |
| `src/components/` | 可复用组件 |
| `src/content/` | Markdown 内容集合（博客、论文、项目） |
| `src/content.config.ts` | 集合 schema |
| `src/data/` | JSON 数据（如 `now.json`） |
| `public/` | 静态资源 |

- **维护内容写什么、放哪里：** [CONTRIBUTING.md](CONTRIBUTING.md)
- **代码风格与仓库约定：** [AGENTS.md](AGENTS.md)

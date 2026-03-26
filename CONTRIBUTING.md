# 网站内容维护指南

面向在本仓库中**新增或修改站点内容**的维护者：每个模块该写什么、放在哪、如何校验。代码风格与提交流程见 [AGENTS.md](AGENTS.md)。

## 开始前

- 安装依赖并本地预览：`npm install` → `npm run dev`；发布前务必 `npm run build` 通过。
- 所有内容集合的字段定义在 [src/content.config.ts](src/content.config.ts)，frontmatter 必须与 schema 一致，否则构建会失败。
- 站点对外 URL 在 [astro.config.mjs](astro.config.mjs) 的 `site` 中配置；改域名时请同步修改。

---

## 博客 `src/content/blog/`

**放什么：** 文章正文用 Markdown；列表页与 SEO 依赖 frontmatter。

**文件命名：** 使用 **kebab-case**，例如 `my-new-post.md`。

**Frontmatter 字段：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，`YYYY-MM-DD` |
| `excerpt` | 是 | 摘要，用于列表与 meta |
| `updated` | 否 | 可选更新日期 |
| `tags` | 否 | 字符串数组，默认 `[]` |
| `draft` | 否 | `true` 时一般不展示（视页面逻辑而定），默认 `false` |
| `lang` | 否 | `en` 或 `zh`，默认 `en` |

**正文：** 普通 Markdown；项目已配置 remark Mermaid，可在代码块中使用 `mermaid` 语法画图。

**双语：** 英文用 `slug.md`，中文配对用 **`slug.zh.md`**，并在中文版设 `lang: zh`。配对逻辑见 [src/utils/i18n.ts](src/utils/i18n.ts)（中文条目 ID 以 `zh` 结尾，与英文共用同一 slug 键）。

---

## 论文 `src/content/papers/`

**放什么：** 每篇论文一个 `.md` 文件；可只有 frontmatter、无正文（与现有论文条目一致）。

**Frontmatter 字段：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 论文题目 |
| `authors` | 是 | 作者字符串数组 |
| `venue` | 是 | 期刊或会议名称 |
| `year` | 是 | 数字年份 |
| `abstract` | 否 | 摘要 |
| `links` | 否 | 可选对象：`pdf`、`arxiv`、`code`、`slides`（均为 URL 字符串） |
| `featured` | 否 | 是否突出展示，默认 `false` |
| `lang` | 否 | `en` / `zh`，默认 `en` |

**双语：** 若需中英文两条目，同样使用 `paper-slug.md` 与 `paper-slug.zh.md`，并正确设置 `lang`。

---

## 项目 `src/content/projects/`

**放什么：** 项目详情页的正文 + 元数据；列表卡片使用 `title`、`description` 等。

**Frontmatter 字段：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 项目名称 |
| `description` | 是 | 短描述（列表与摘要用） |
| `tech` | 否 | 技术栈字符串数组，默认 `[]` |
| `github` | 否 | 仓库 URL |
| `demo` | 否 | 演示站 URL |
| `featured` | 否 | 是否重点展示，默认 `false` |
| `lang` | 否 | `en` / `zh`，默认 `en` |

**正文：** 可用二级标题组织「动机、架构、实现」等；支持 Mermaid。

**路由：** 列表由 `src/pages/projects/index.astro` 生成；详情页为 `/projects/[slug]`，slug 来自文件名（不含 `.md`）；中英配对规则与博客相同。

---

## 数据 JSON `src/data/`

这些文件被页面直接 import，**键名约定为 snake_case**（见 AGENTS.md）。

| 文件 | 用途 | 维护时注意 |
|------|------|------------|
| [now.json](src/data/now.json) | 首页「正在做 / 在读 / 在听」 | 字段：`working_on`、`reading`、`listening`（字符串） |
| [life.json](src/data/life.json) | Life 页音乐与户外等 | 当前结构含 `music`（`title`、`artist`、`type`）、`outdoors`（`title`、`description`、`date`）等，改结构需同步改引用页面 |
| [photos.json](src/data/photos.json) | Life 页相册（由 `life.astro` 引用） | 当前含 `featured`、`gallery`；改字段需同步 [src/pages/life.astro](src/pages/life.astro) |

修改 JSON 后请在本地打开相关页面确认渲染正常。

---

## 静态资源 `public/`

**放什么：** 无需经构建处理的文件：favicon、`robots.txt`、大图、下载文件等。

**引用方式：** 以站点根路径为准，例如 `public/og.png` → 在页面或 frontmatter 中写 `/og.png`。

---

## 页面、布局与组件

| 场景 | 位置 |
|------|------|
| 新增独立路由（如新栏目） | `src/pages/` 下新增 `.astro`，必要时新布局 `src/layouts/` |
| 全站头部/底部/导航文案 | `src/components/` 中对应组件（多语言可用 `T.astro` 等现有模式） |
| 全局样式与主题变量 | `src/styles/global.css` 等 |

**原则：** 能放进 **content 集合** 或 **JSON** 的文案与列表，优先不要写死在页面里，便于后续双语与批量维护。

---

## 提交前自检

1. `npm run build` 无报错。
2. 新增 Markdown：`lang` 与文件名（`.zh.md`）一致。
3. 对外链接、图片路径在本地 `npm run preview` 下抽查。

---

## 相关文件速查

- 集合 schema：[src/content.config.ts](src/content.config.ts)
- 双语配对：[src/utils/i18n.ts](src/utils/i18n.ts)
- 开发与部署说明：[README.md](README.md)

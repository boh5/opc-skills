# OPC Skills

OPC Skills 是一套面向独立开发者和小团队的、证据优先的 SEO 机会研究 Skills。它把“发现线索、验证需求、检查 SERP、判断商业可行性”拆开，避免把一个好看的数字误判为低竞争或可盈利。

## 五个平级 Skill

| Skill | 职责 |
| --- | --- |
| `seo-idea-finder` | 自包含总入口：找候选、完成四条基础证据线，并给出明确的做/不做结论。 |
| `site-opportunity-scout` | 研究小站和增长站点，区分已验证事实、第三方估算、站长自述与推断。 |
| `keyword-demand-validator` | 验证关键词需求、趋势、意图与点击潜力，严格区分不同指标。 |
| `serp-competition-auditor` | 从页面、运营者、搜索意图和 SERP 功能层面检查真实竞争。 |
| `solo-business-evaluator` | 判断机会是否适合独立开发者实施、维护、防守和变现。 |

每个 `skills/<name>/` 都是独立 Skill。Skill 内的 `references/` 只是按需读取的参考材料，不是新的 Skill。

## 安装

这个仓库不需要 `package.json`；`npx` 运行的是外部 [`skills`](https://github.com/vercel-labs/skills) CLI。

在本地克隆目录中查看可安装项：

```bash
npx skills add . --list
```

只安装自包含主 Skill（最小安装）：

```bash
npx skills add . --skill seo-idea-finder --agent codex --global --yes
```

安装全部五个 Skill（推荐完整套件，可单独做深度复核）：

```bash
npx skills add . --skill '*' --agent codex --global --yes
```

发布到 GitHub 后，源地址使用真实的 `<github-owner>/opc-skills`；本仓库不会猜测你的 GitHub 账号。替换为真实 owner 后再执行：

```bash
npx skills add <github-owner>/opc-skills --skill '*' --agent codex --global --yes
```

仓库同时包含 `.codex-plugin/plugin.json`，因此也可以把整套内容作为一个仅包含 Skills 的 Codex Plugin 分发。只安装 `seo-idea-finder` 不会安装或自动调用另外四个 Skill；主 Skill 会完成基础检查，完整安装后才能显式调用专家 Skill 做深度复核。

公开提交到 Plugins Directory 还需要经过验证的开发者或企业身份、政策声明、评审用例和通过 Skill 扫描。对于当前这个纯 Skills Plugin，网站、支持、隐私和条款 URL 是可选项；如填写，必须是与发布者匹配的真实公开 HTTPS 地址。详见 [发布检查清单](docs/release-checklist.md)。

## 为什么有 `evals/`，但没有 `scripts/`

`evals/` 里有真实提示词、失败条件和评分标准，用来验证 Skill 是否会编造数据、混淆指标、过度外推或给出含糊结论。它不是空目录。

v0.1 没有需要固定执行的抓取或计算逻辑，所以不创建 `scripts/`。以后只有出现可重复、确定性强且值得复用的操作时才增加脚本。

## 核心原则

- 事实、第一方测量、第三方估算、站长自述和推断必须分开。
- 搜索量、趋势指数、SEO 难度、广告竞争、排名、站点流量和收入不是同一个指标。
- 同义词搜索量不能直接相加；同一运营者的多个域名要合并判断。
- 单次本地化 SERP 只能算带日期的样本，不能说成稳定的全国排名。
- 完整研究必须给出第一选择、备选、切入页面、投入、主要风险和止损线。

## 开发验证

```bash
npx skills add . --list
jq -c . evals/cases.jsonl >/dev/null
jq -c . evals/routing.jsonl >/dev/null
```

系统 Skill/Plugin 校验器、行为评测门槛和公开发布前置条件见 [发布检查清单](docs/release-checklist.md)。更多方法依据见 [docs/research-basis.md](docs/research-basis.md)。

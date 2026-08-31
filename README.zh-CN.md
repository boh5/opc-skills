# OPC Skills

OPC Skills 是一个面向一人公司、独立开发者和小团队的开源 Agent Skills 集合。它同时包含通用产品机会研究和证据优先的 SEO 专项研究，避免把社交热度、一次发布、仓库 Star、站点流量估算或关键词数字直接误判为蓝海、低竞争或可盈利。

## 六个平级 Skill

| Skill | 职责 |
| --- | --- |
| `product-opportunity-finder` | 通用产品机会入口：从当前社交、开发者、社区、发布和产品信号中找用户能理解的差异化产品，再检查现有替代品、成功路径、执行条件与分发方式。 |
| `seo-idea-finder` | 自包含总入口：从真实站点、页面、查询、客户任务或变化记录中持续挖掘，直到用户要求数量的机会通过基础准入门槛。 |
| `site-opportunity-scout` | 研究小站和增长站点，区分已验证事实、第三方估算、站长自述与推断。 |
| `keyword-demand-validator` | 验证关键词需求、趋势、意图与点击潜力，严格区分不同指标。 |
| `serp-competition-auditor` | 从页面、运营者、搜索意图和 SERP 功能层面检查真实竞争。 |
| `solo-business-evaluator` | 判断机会是否适合独立开发者实施、维护、防守和变现。 |

每个 `skills/<name>/` 都是独立 Skill。Skill 内的 `references/` 只是按需读取的参考材料，不是新的 Skill。

这套 Skill 不依赖 Marketing Skills 或其他 Skill 仓库才能运行。我们可以吸收公开项目中有价值的方法，但每个已安装 Skill 都必须自带完成自身任务所需的指令。

## 安装

这个仓库不需要 `package.json`；`npx` 运行的是外部 [`skills`](https://github.com/vercel-labs/skills) CLI。

在本地克隆目录中查看可安装项：

```bash
npx skills add . --list
```

安装通用产品机会 Skill：

```bash
npx skills add . --skill product-opportunity-finder --agent codex --global --yes
```

只安装 SEO 自包含主 Skill：

```bash
npx skills add . --skill seo-idea-finder --agent codex --global --yes
```

安装全部六个 Skill（完整的产品与 SEO 研究套件）：

```bash
npx skills add . --skill '*' --agent codex --global --yes
```

从公开 GitHub 仓库直接安装：

```bash
npx skills add boh5/opc-skills --skill product-opportunity-finder --agent codex --global --yes
npx skills add boh5/opc-skills --skill seo-idea-finder --agent codex --global --yes
npx skills add boh5/opc-skills --skill '*' --agent codex --global --yes
```

仓库同时包含 `.codex-plugin/plugin.json`，因此也可以把整套内容作为一个仅包含 Skills 的 Codex Plugin 分发。`product-opportunity-finder` 可以独立完成非 SEO 产品机会研究。只安装 `seo-idea-finder` 不会安装或自动调用另外四个 SEO 专项 Skill；SEO 主 Skill 会完成基础检查，完整安装后才能显式调用专家 Skill 做深度复核。

公开提交到 Plugins Directory 还需要经过验证的开发者或企业身份、政策声明、评审用例和通过 Skill 扫描。对于当前这个纯 Skills Plugin，网站、支持、隐私和条款 URL 是可选项；如填写，必须是与发布者匹配的真实公开 HTTPS 地址。详见 [发布检查清单](docs/release-checklist.md)。

## 为什么有 `evals/`，但没有 `scripts/`

`evals/` 里有真实提示词、失败条件和评分标准，用来验证 Skill 是否会编造数据、混淆指标、过度外推或给出含糊结论。它不是空目录。

v0.4 没有需要固定执行的抓取或计算逻辑，所以不创建 `scripts/`。以后只有出现可重复、确定性强且值得复用的操作时才增加脚本。

## 研究模式和项目上下文

- `product-opportunity-finder` 从当前痛点、变通做法、请求、变化、发布、Issue 或采用记录开始。X、Hacker News、GitHub、Reddit、Product Hunt、Indie Hackers、V2EX、Linux.do 和目标用户社区是发现渠道，不是市场成立的证明。
- 通用产品候选必须让目标用户听得懂、完成真实工作流、通过功能等价竞品检查、说清第一批用户从哪里来，并且符合开发者约束。冷门不等于机会。
- 现有竞品不是自动否决。有产品已经做了某项功能时，只能否定这个功能差异点；细分人群、工作流、分发、信任、数据、服务、速度或经济模型仍可能形成真实切口。
- 研究成功项目时，要把产品本身的价值与社交或平台放大分开，把可复用方法与时机、既有受众、资本、专有资源和运气分开。最终产生的新机会还要重新查当前替代品，不能复制原产品。
- 两个入口 Skill 都把用户要求的数量当成交付目标。被淘汰、重复、含糊或只剩“继续研究”的项目不能占位；不够就继续挖，除非出现真实阻塞。

- 先根据已有条件选择一个主发现模式：现有网站扩张、已知人群/市场、开放式跨市场挖掘，或新词快攻。
- 每个候选都必须追溯到真实的第一方、站点、页面、查询、客户任务、SERP 或变化记录。X、社区、评论和站长故事只能提供线索，不能证明搜索需求或低竞争。
- 开放式挖掘优先使用已授权的站点、页面或查询数据源。没有平台数据时仍可使用公开网页证据，但必须明确来源，缺失指标保持未知，不能冒充完整的平台关键词研究。
- 先用便宜的准入门槛淘汰弱候选，再做深入检查。进入昂贵验证前，要按用户、输入、处理过程、输出、工作流限制、所属生态和购买方式建立“产品功能指纹”，再去官方产品页面反查名字不同但实质相同的现有产品。
- 用户要求的 `N` 是完成目标。被淘汰、重复、需求与 SERP 都未知、只有“值得研究”的候选不能占位；不够就继续从真实数据里挖下一批。
- 只有用户硬性预算、数据源耗尽、缺少授权或必要数据确实无法访问时，才能以不足 `N` 结束，并且必须明确说明任务未完成，不能用弱候选补满。
- `quick`、`standard`、`deep` 只表示证据深度，不再强制 `4N` 候选池或任意的外部观察次数公式。公开网页模式会把决定性的竞品撞车检查提前；一个切入点已经失效就立即换下一个，不再为它写完整长报告，达到 `N` 个通过项后即停止常规挖掘。
- 默认汇报先讲具体产品和首选，不展示内部候选账本、查询计数或工具轨迹；只有用户要求尽调或可复核记录时才附加。
- 有竞品不是自动否决。如果竞品已经具备我们声称的功能，只否定这个差异点，再检查产品、细分人群、数据、工作流、分发、信任、服务、速度或经济模型是否仍有真实优势。只要对产品做了实质性改题，就必须重建功能指纹并重新反查竞品，不能沿用原题的结论。
- 一个实时链接不等于保存了当时的观察。关键证据需要记录观察时间、数据周期、市场/设备、提取方式、支持的结论与限制。
- 数字止损线必须说明依据：历史基线、样本/统计目标、实验成本与最低回报，或用户设定的目标；没有依据时先给校准周期或公式。

项目可以选择提供 `.agents/opportunity-research.md`，保存市场、语言、开发者能力、排除项和已批准数据源等稳定事实。它不是必需文件，也不会授予写文件、登录、购买、发消息或扩大研究范围的权限；除非用户明确要求，否则 Skill 不会创建或修改它。

## 核心原则

- 事实、第一方测量、第三方估算、站长自述和推断必须分开。
- 搜索量、趋势指数、SEO 难度、广告竞争、排名、站点流量和收入不是同一个指标。
- 同义词搜索量不能直接相加；同一运营者的多个域名要合并判断。
- 单次本地化 SERP 只能算带日期的样本，不能说成稳定的全国排名。
- 必须按功能指纹反查当前产品，不能把“搜不到自创名称”当成“没有同类产品”；功能撞车只否定这个切入点，不等于整个市场自动无效。
- 正常情况下，只有用户要求数量的来源可追溯候选都通过准入门槛才算完成；如果遇到真实阻塞，必须把不足数量明确标为未完成，不能拿未知或淘汰项补位。
- 完整研究要给出排序产品、第一选择、仍然成立的切入优势、切入页面、投入和持续工作、主要风险，以及有明确依据的止损线。

## 开发验证

```bash
npx skills add . --list
jq -c . evals/cases.jsonl >/dev/null
jq -c . evals/routing.jsonl >/dev/null
```

系统 Skill/Plugin 校验器、行为评测门槛和公开发布前置条件见 [发布检查清单](docs/release-checklist.md)。更多方法依据见 [docs/research-basis.md](docs/research-basis.md)，组件版本见 [VERSIONS.md](VERSIONS.md)，贡献规则见 [CONTRIBUTING.md](CONTRIBUTING.md)。

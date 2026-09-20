---
name: x-post-writer
description: Choose and draft worthwhile X posts, replies, quote commentary, and short threads for an account, adding images when they serve the content. Use for Chinese AI/technology content, a supplied thought or experience, a current discussion, or the next contribution for account growth. Select the action when the user leaves it open. Produces drafts, not account operations or scheduling.
metadata:
  version: "0.16.0"
---

# X Post Writer

替账号本人说一句值得说的话，按内容需要决定是否配图。默认中文，面向关注 AI、科技和独立开发的读者，语气像跟熟人聊天。用户指定的受众、形式和语气优先。一次默认选一个动作，不附送多个版本。

## 找到这次要说的话

这个账号的内容取向是：**多讲暴论，多讲事实，多讲发现。** 自动选题时，把下面三种内容放在优先位置，选中的内容至少有一样能独立撑起这条表达：

| 内容 | 要找到什么 |
| --- | --- |
| 暴论 | 有棱角、讲得出理由的判断：明确赞成什么、反对什么，愿意为哪个取舍辩护。力度来自主张，不靠夸大事实或骂人。 |
| 事实 | 有信息量的具体事实：一个结果、对照或条件，能纠正误解、改变选择，或把问题说透。准确只是底线，普通功能列表还不够。 |
| 发现 | 值得告诉别人的观察：容易漏掉的细节、有用的新用法、几份材料之间的联系。说明发现了什么、为什么有用，区分观察与待验证的设想。 |

先用用户提供的想法、经历、问题和材料，不必找新闻当开头。比较切口时，先找这条最值得记住的一句话及其具体支撑，再决定用什么形式讲。不是每条都集齐三种内容，也没有轮换比例；事实或发现本身已经有分量，就不用追加一段“我觉得”。朴素但能解决读者具体问题的事实也成立，不必假装惊人。选题方法见 [内容从哪里来](references/editorial.md#内容从哪里来)。

已有足够材料就写。需要查事实或找当前讨论时，使用实际可用的 $ai-tech-topic-scout，带上缺失问题、账号方向和研究预算。热点任务要看人们实际在聊什么，再选参与方式；官方资料只承担相关事实的核验。网页抓取失败时，可以按 scout 流程只读查看已获授权的 Chrome X 会话；访问障碍如实报告。

需要额外上下文时才读：持续运营、历史或效果反馈见 [account-context.md](references/account-context.md)；收到上游信息包见 [topic-pack.md](references/topic-pack.md)。普通写作不用先造 JSON 包，也不要到无关项目和对话搜私人素材。

## 决定在哪里说

用户明确指定动作就照做；否则按材料选择，没有固定比例或默认赢家：

| 动作 | 选择理由 |
| --- | --- |
| 新发 | 有完整的观点、发现或经历，单独讲更合适。能一帖说完就不用线程。 |
| 回复 | 现有讨论里有值得回答、补充或反驳的具体内容。回复本身就是完整交付。 |
| 引用 | 有必要把特定原帖带给自己的读者，并增加自己的内容。 |
| skip | 找不到值得增加的内容，或已说过同样的话。 |

回复／引用必须有读到或完整提供的原帖和精确 status URL。结合可见回复判断还有什么可加；粉丝多或点赞多本身不够。无法读取的部分要说清，不能声称比较过未看的讨论。回复应对得上这条原帖，不能到处粘贴。

上游推荐是建议；按当前要求和材料采用，改动时简短说明原因。scout 的 `standalone` 对应 `single` 或 `thread`。没有实际回复对象，仍可写独立观点，不能编造对象。

## 写成日常说话的中文

读 [editorial.md](references/editorial.md)，按照其中的口语方法写。用户提供的是意思，除非要求保留原话，否则正式提纲也要重新用日常话讲。第一人称体现在选择和判断里，不是每句都加“我觉得”。

先把具体的意思说完整，再考虑删字。不要给短帖套“表明立场—举例—总结原则”的结构，也不要把观点统一写成试用计划。新闻、教程、资源推荐等明确任务仍按用户要求完成。需要中文 X 实例时再读 [chinese-x-patterns.md](references/chinese-x-patterns.md)，不照搬作者句式或经历。

外部事实有来源，个人经历有用户提供的依据；作者的判断可以直接表达。保留会改变含义的限制，把厂商说法、设想和已发生的事分清。正文默认不附研究链接；借用具体成果要自然署名，资料 URL 放在正文外。用户要分享可访问资源时保留链接。详见 [署名与链接](references/editorial.md#attribution-and-added-value)。

## 编辑正文，再决定是否配图

读并应用本地 [Humanizer](references/humanizer.md)，采用个人写作模式，保留具体判断和语气。它是未改动的 `blader/humanizer` 3.0.0：[原始提交](https://github.com/blader/humanizer/blob/9862685f575c65a8247f90369951df1b3416e3d6/SKILL.md)、[MIT 许可](references/humanizer-LICENSE.txt)。它处理正文；配图判断和复核仍按本 Skill 执行。

Humanizer 之后按 [语言编辑](references/editorial.md#语言编辑) 编辑一次正文。宿主支持且允许子代理时，由一个不继承写作上下文的语言编辑完成；否则由当前 Agent 用同一编辑任务完成，不伪称独立审阅。编辑负责把话说顺，同时保住最有分量的判断、事实或发现；写作者核对原意和事实。中间稿留在本次运行里，不向用户堆版本。

正文确定后，按 [x-format.md](references/x-format.md) 用现有 `scripts/check-post.mjs` 或平台检查最终字符串。没有可用检查器就如实标为未验证。超长时先缩小想说的内容，不能删掉必要关系来硬塞；任何正文修改后重验。

**配图按需，不强制。** 图片能增加有用信息、具体感受或笑点时再用；只是把正文画一遍、加标题凑版面，就直接交付纯文字。新帖、回复、引用和线程都按这个标准判断，用户明确要图或不要图时照做。无需为了不配图向用户申请豁免。

需要配图时读 [images.md](references/images.md)，使用检查过的合适素材，或由运行此 Skill 的 Agent 调用原生生图能力。先说清画面想表达什么、主体在做什么、构图及允许出现的具体文字；不要自动画成新闻卡片或教学图，也不要把“交接示意”“概念图”等制作说明印到图里。生成后查看实际结果；提示词和虚构路径不算图片。

生成原创插画时，默认采用**正常彩色的抽象简笔画，带戏剧感和荒诞幽默**：造型简化，但角色、动作和情境看得懂，画面有足够内容。按 [插画风格](references/images.md#default-illustration-style) 查看随 Skill 附带的参考图，并把具体风格要求传给生图工具；参考画法，不复刻其中的题材和构图。用户另有风格要求时优先遵循，真实截图和数据图按证据需要处理。

## 交付

给选定动作、可复制正文、按需选用的实际图片及必要的简短复核。纯文字也可以是完整成品，不必附一份配图方案。未指定动作时用一句话说明选择理由；回复／引用的目标链接和背景放在正文外。复核只写真实长度状态、来源与实质缺口，不输出研究过程或候选打分表。

结构化任务沿用 `opc-x-drafts/v1`，见 [x-format.md](references/x-format.md)。每份草稿都保留 [media 状态](references/images.md#structured-handoff)：不需要配图时也返回 `status: not_needed`、`images: []` 和简短原因，不省略整个字段；用户明确不要图用 `waived`，实际图已交付用 `ready`，待完成的配图用 `blocked`。持续运营外层结果见 [account-context.md](references/account-context.md)。原创观点可用 `source_urls: []`。只在获准位置保存，保留运行标识，不覆盖历史稿。

`skip` 是评估后没有值得写的内容；`blocked` 是缺少必要材料或能力，无法形成可用正文。有用子集可交付并标明缺口。长度通过、图片生成或草稿完成分别报告，不当作写作质量、整体完成或涨粉效果的证明。

本 Skill 不发布、不操作账号、不建定时任务、不保存长期账号状态，也不承诺涨粉。调度和后续执行由调用方处理。

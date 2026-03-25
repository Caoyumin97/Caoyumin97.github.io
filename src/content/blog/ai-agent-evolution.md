---
title: "AI Agent Evolution and Industry Disruption: An ML Engineer's Observations"
date: 2026-03-10
lang: en
excerpt: "Starting from the OpenClaw hype — AI Agents are reshaping software, organizational structures, and the underlying logic of supply chain management."
tags: ["AI", "agent", "supply chain", "industry observations"]
draft: false
---

## Starting with OpenClaw

The discussions around OpenClaw have been everywhere lately. As the head of AI applications in Xiaomi's supply chain management group — and an engineer who's been writing algorithms for several years — I want to share my perspective on where AI Agents are heading and the real changes they might bring to industries and society. Not just more noise in another hype cycle.

What OpenClaw is fundamentally doing is pushing large language models from being a "conversational interface" to being an "execution engine." This isn't an incremental improvement — it's a paradigm shift. Conversation means humans are still the ones executing, with the model serving as an advisor. Agents mean the model itself becomes the executor, and humans step back into the role of supervisors and decision-makers.

## The Real Capability Boundaries of Agents

In supply chain scenarios, I deal with the capability boundaries of Agents every single day. Honestly, Agents at this stage aren't as "intelligent" as many people imagine — but they're also far more useful than many people assume.

**What Agents are already good at:**

- Cross-system information aggregation and summarization. Information that used to require someone to switch back and forth between ERP, WMS, and TMS systems can now be assembled by an Agent in seconds.
- Executing decisions with well-defined rules. When replenishment strategies and anomaly alerting logic can be clearly described, Agents execute them quickly and reliably.
- Converting natural language to structured queries. Business colleagues no longer need to learn SQL — they can just ask in plain language, "What was the inventory turnover for the East China warehouse last month?"

**What Agents still struggle with:**

- Ambiguous decisions requiring deep domain knowledge. For example, when a supplier delays delivery, should you expedite, switch suppliers, or adjust the production schedule? That depends on a wealth of tacit knowledge and context.
- Complex multi-step coordination. Workflows involving cross-departmental, cross-timezone collaboration still cause Agents to make errors or lose context along the way.
- Handling uncertainty gracefully. The core challenge in supply chain is uncertainty, and current Agents either exhibit overconfidence or simply stall when they encounter it.

## How Industries Will Change

From a supply chain management perspective, I believe AI Agents will drive change on three levels:

**Level one: tooling.** This is already happening. Various Copilot-style products are boosting individual productivity. But honestly, this layer of change isn't as dramatic as people imagine — no matter how good the tools are, if business processes and organizational structures remain the same, there's a ceiling on overall efficiency gains.

**Level two: process redesign.** This is the most important development over the next two to three years. When Agents can reliably execute an entire business workflow — from demand forecasting to automated replenishment to exception handling — many traditional approval processes and manual review steps will be redesigned. It's not simply "replacing people with AI," but reimagining the entire process from scratch.

**Level three: organizational evolution.** This is longer-term, but the direction is already visible. If a three-person team plus a group of Agents can accomplish what used to take ten people, then org structures, reporting lines, and performance evaluation all need to be rethought. At Xiaomi, we're already experimenting with some "human + Agent" hybrid teams, and both the results and challenges are very real.

## Social Impact: Beyond the Unemployment Question

Many discussions reduce AI's societal impact to "who will lose their jobs." That framing is far too narrow. More worthy questions include:

**The decentralization of knowledge.** Previously, the experience locked inside a senior supply chain expert's head was extremely valuable — precisely because it couldn't be easily transferred. Now, Agents can codify and make that knowledge reusable. This challenges individual experts' bargaining power, but it's an enormous boost to overall system efficiency.

**The redistribution of decision-making power.** When frontline workers can access the information and analytical capabilities that were once reserved for management — through Agents — decision-making authority naturally shifts downward. This is a good thing, but it also means organizations need new coordination mechanisms.

**Building trust.** This is the most underestimated challenge. Our team spends more time getting business stakeholders to trust Agent outputs than we spend on technical development. Technical problems will eventually be solved; trust is the real slow variable.

## Some Pragmatic Thoughts

I'm not a fan of extreme narratives — neither "AI will change everything" nor "AI is just a bubble." Reality is always somewhere in between.

As someone deploying AI on the ground every day, here's my observation: **The real value of Agents isn't how "intelligent" they are, but how they shorten the information-to-decision-to-execution loop.** In a domain like supply chain — where information density is extremely high and decision chains are extremely long — that alone is enormous value.

At the same time, we should be wary of treating Agents as a silver bullet. Behind every successful Agent deployment is a mountain of domain modeling, process design, and exception handling work. That work isn't glamorous, but without it, an Agent is just an expensive chatbot.

The hype will pass. The real changes will endure. As practitioners, all we can do is find the signal amid the noise — and then make it real, one step at a time.

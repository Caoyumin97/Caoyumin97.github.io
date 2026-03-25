---
title: "From GUI to CLI: When Software's Users Become AI Agents"
date: 2026-03-08
lang: en
excerpt: "A quiet paradigm reversal is underway in software development — the design target is shifting from humans to Agents, and building atomic capabilities may be the most worthwhile investment of this era."
tags: ["AI", "software engineering", "product design", "development paradigms"]
draft: false
---

## A Counterintuitive Trend

If you've been paying attention to the evolution of developer tools lately, you'll have noticed a trend that seems like a step "backward": **everything is going CLI.**

Claude Code is a terminal application. OpenCode is a terminal application. Cursor wears the skin of an IDE, but its core interaction is typing in a text box. Even many new AI products are built on MCP (Model Context Protocol) under the hood — which is essentially a set of command-line interfaces that Agents can call.

This isn't aesthetic nostalgia. It's because the "user" of software is undergoing a fundamental change.

## From Human-Centric to Agent-Centric

For the past thirty years, software design has rested on a core assumption: **the user is a human.** That's why we need graphical interfaces, animations, intuitive interactions, and onboarding flows. A good product manager spends countless hours on user journey maps, carefully considering the cognitive load at every click along the path.

All of that is correct in the context of human users. But when the user becomes an AI Agent, these things aren't just unnecessary — they're obstacles.

Agents don't need attractive buttons. Agents don't need welcome screens. Agents don't need animations to ease the anxiety of waiting. What Agents need is: **clear input/output contracts, predictable behavior, atomic capability units, and machine-readable descriptions.**

In other words, what an Agent needs is a well-designed CLI — or more precisely, a well-designed API.

## "CLI-ification" Is Really Interface De-Decoration

When I say CLI-ification, I don't literally mean "everything becomes a command-line tool." The essence is: **software is exposing its capabilities with minimal decoration and maximum machine readability.**

Think about what MCP is doing. It defines a standard way for any service to describe its capabilities as a set of "tools" — each with a name, a parameter schema, and a return type. When an Agent reads these descriptions, it knows how to use them.

Isn't this just the AI-era reboot of the Unix philosophy?

- Each program does one thing well (atomic capabilities)
- Text streams serve as the universal interface (structured I/O)
- Programs compose freely (Agent orchestration)

The difference is that in the Unix era, the "composer" was a human engineer writing shell scripts. Now the "composer" is an AI Agent. Agents are better than humans at managing the combination of a large number of tools — they don't forget parameters, they don't mix up pipes, and they don't suffer cognitive overload from having too many tools.

But this also means that **Agents are more demanding about tool quality than humans are.** Humans can muddle through a poorly designed GUI because common sense fills in the gaps. An Agent encountering a vaguely described API will simply error out or hallucinate.

## Atomic Capabilities: The Core Infrastructure of the Next Era

If Agents are the new "composers," where should we focus our energy?

The answer is becoming increasingly clear: **building high-quality atomic capabilities.**

What is an atomic capability? It's a functional unit with several key properties:

1. **Single responsibility.** It does one thing, and does it exceptionally well. Not "manage your project," but "create an issue," "query an issue's status," "update an issue's labels."
2. **Clear boundaries.** What goes in, what comes out, what side effects occur — all explicitly defined. No "it depends," no "usually."
3. **Composability.** Its output can directly become another atomic capability's input, without manual conversion or interpretation.
4. **Idempotent or predictable.** The same input always produces the same output (or at least the behavior is predictable). Agents need to trust the tools they call.

In supply chain, what we're doing is decomposing an entire complex business system into atomic capabilities. We used to think in terms of "build a good inventory management system." Now we think in terms of "make every atomic operation in inventory management into an Agent-callable tool."

Query the real-time inventory of a given SKU at a given warehouse — that's an atomic capability.
Generate a replenishment recommendation based on safety stock levels — that's an atomic capability.
Send a purchase order to a supplier — that's an atomic capability.

The Agent decides when to call which capability, in what order to compose them, and whether to insert decision logic in between. **We no longer need to pre-design "processes" — we just need to provide reliable "building blocks."**

## Horizontal Capabilities vs. Vertical Scenarios

There's an interesting division of labor here.

**Vertical scenarios** (industry-specific contexts, business logic) — that know-how still resides with humans. Agents don't know when to push a supplier or when to switch logistics providers; those decisions depend on industry experience and situational judgment.

But **horizontal capabilities** (data queries, file processing, notifications, approval workflows, report generation...) are rapidly being standardized and atomized. These are foundational capabilities needed by every business scenario, and their commonalities far outweigh their differences.

My thesis is: **Building horizontal atomic capabilities is the most worthwhile infrastructure investment right now.** Because:

- Once built, every vertical scenario can reuse them.
- Agents are already very strong at composing horizontal capabilities — they don't need much domain knowledge for this.
- The quality of these capabilities directly determines the upper bound of Agent performance in downstream applications.

This is somewhat analogous to the early days of cloud computing. Back then, everyone was debating "SaaS vs. PaaS vs. IaaS," but the real winners were those who made foundational capabilities (compute, storage, networking) extremely reliable and extremely standardized. In the Agent era, the winners may be those who make atomic capabilities extremely reliable and extremely well-described.

## Product Managers Need to Rethink Their Work

This shift has profound implications for product design.

Traditional product design thinking goes: understand user needs, design information architecture, map out interaction flows, polish visual details. Every step revolves around "how human users perceive and operate."

Agent-Centric product design thinking may become: **define atomic capabilities, design composition rules between capabilities, write machine-readable capability descriptions, and ensure each capability's reliability and predictability.**

This doesn't mean GUIs will disappear. Humans still need interfaces to supervise Agents, make high-level decisions, and handle exceptions. But the GUI may shift from being the "primary interface" to being the "monitoring dashboard" — you no longer use it to perform daily operations; you use it to observe Agent runtime status and intervene when necessary.

The core competency of product managers is shifting too: no longer "can you design a beautiful prototype," but "can you define clear capability boundaries." No longer "do you understand user click paths," but "do you understand Agent call chains."

## An Analogy: From Artisan Workshop to Industrial Assembly Line

If I had to pick a historical analogy, the current transformation resembles the transition from artisan workshops to industrial assembly lines.

In the artisan era, craftspeople mastered the entire skill chain — from raw materials to finished product. Tools were designed for the craftsperson's hands, with every ergonomic detail considered.

In the industrial era, production was decomposed into standardized operations. Each operation was an atomic unit, executed by machines. The human role shifted from "executor" to "designer" and "supervisor." Tools no longer needed to feel good in your hand — they needed standard interfaces and consistent output.

We're going through the same process in software. Agents are the new "machines," atomic capabilities are the "standardized operations," and we — engineers and product designers — are transitioning from craftspeople who "hand-write every line of code and design every interaction" to engineering architects who "define capabilities, design composition rules, and supervise Agent execution."

## Back to First Principles

At the end of the day, the underlying logic is simple:

**When the consumer (user) shifts from humans to Agents, the producer's (developer's) focus naturally shifts from human-computer interaction to machine-to-machine interaction.**

And machine-to-machine interaction boils down to three things:
1. Make capabilities atomic (each building block small enough and reliable enough)
2. Make descriptions standardized (so Agents can accurately understand what each block does)
3. Make composition unconstrained (don't preset workflows — let Agents orchestrate based on objectives)

CLI-ification, MCP, atomic capabilities — these aren't separate trends. They're different expressions of the same underlying logic.

As a practitioner, I believe the most valuable thing we can do right now is: **stop obsessing over polishing interfaces for human users, and start building reliable capability blocks for Agents.** This doesn't mean abandoning user experience — it means recognizing that future user experience will increasingly be determined by the quality of Agent orchestration, which in turn is determined by the quality of the underlying atomic capabilities.

Build the foundation right, and the Agents will handle the rest.

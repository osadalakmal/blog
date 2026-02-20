---
title: "Coding Patterns in Agentic World"
date: 2026-02-20T12:21:25Z
draft: false
image: "future.jpg"
author: "Osada Paranaliyanage"
description: "Exploring the rise of programming languages designed for LLMs, why now is the tipping point, and how challenges like hallucinated dependencies, logic errors, test manipulation, and context limitations are shaping this next wave of language design."
theme: "full"
tags:
  [
    "LLM",
    "programming languages",
    "AI-assisted coding",
    "code generation",
    "developer tools",
  ]
categories: ["programming languages"]

ruby: true
fraction: true
fontawesome: true
linkToMarkdown: true
rssFullText: false

toc:
  enable: true
  auto: true
code:
  copy: true
  # ...
share:
  enable: true
---

## Architectural Gravity

I have been thinking about what the increasing use of agentic AI tooling might do to the long-term shape of software systems, not just at the level of code generation, but at the level of architectural taste, stylistic norms, and the implicit boundaries within which we design.

Most of the current generation of coding agents are trained on what already exists in public repositories and widely adopted frameworks, which means that their competence is strongest where the problem to be solved resembles something that has already been solved before, and where the patterns required to solve it are well represented in their training corpus. This is not a flaw, it is simply how statistical learning systems operate, but it does mean that the path of least resistance increasingly aligns with the patterns that are already dominant in open-source ecosystems.

If you ask such a system to scaffold a service, structure a React application, wire up a REST API, or introduce queue-based decoupling, it will tend to reach for the most common and well-established implementations of those ideas, because those are the implementations it has seen most frequently and therefore models most confidently. Over time, as more teams rely on these tools for first drafts and even for production-ready code, there is a plausible scenario in which we begin to see a convergence not only in surface-level code styling, but in deeper structural decisions about how systems are decomposed, how components are layered, and how responsibilities are allocated across services.

There is a familiar echo here of the old phrase about nobody getting fired for buying IBM, which was never really about technical optimality but about the reduction of perceived risk through alignment with the mainstream. In an agent-assisted world, the mainstream is not just a social phenomenon but an encoded one, embedded directly into the statistical priors of the tools we use, and therefore reinforced every time we accept a suggestion because it looks reasonable and familiar.

## The Innovation Premium

In the short term, this probably standardizes implementation-level concerns, such as naming conventions, testing strategies, directory structures, and the canonical way of wiring together common libraries, but as these systems improve in their ability to reason across larger contexts and propose higher-level system designs, the gravitational pull may move upward into architectural territory. Patterns such as event-driven systems, queue-based decoupling, managed cloud primitives, and well-documented distributed design approaches are already richly represented in documentation and code, and so it is not difficult to imagine agents confidently proposing these as default solutions, even in cases where alternative, less common patterns might have been worth exploring.

The consequence of this is not that innovation disappears, but that it acquires a new kind of cost structure. It is already true that proposing a novel architectural approach requires additional effort in explanation, documentation, and socialization, but in a future where much of the scaffolding and iteration is mediated through tools optimized for the familiar, deviation from established patterns may require deliberate counter-programming of those tools, whether through carefully constrained prompts, retrieval-augmented techniques, curated internal knowledge bases, or explicit fine-tuning to teach them about emerging ideas.

## Shaping the Conceptual Terrain in Agentic Era

In that sense, architectural exploration may become relatively more expensive compared to staying within the well-lit paths that the agents know best, because the latter will be faster to generate, easier to justify, and less likely to trigger friction in review cycles that are themselves increasingly influenced by similar tools. The equilibrium that emerges could be one in which the ecosystem exhibits a form of mean reversion, where dominant patterns become more dominant simply because they are easier to instantiate and replicate at scale.

The open question, and the part I find genuinely interesting, is how new patterns will break through in such an environment, and what mechanisms will allow genuinely novel ideas to move from the periphery into the corpus that agents understand and trust. It may be that the answer lies in tighter feedback loops between pioneering teams and the broader ecosystem, or in tooling architectures that are explicitly designed to ingest and operationalize new internal patterns rapidly, rather than relying purely on static pretraining.

What seems clear to me is that in an agentic future, part of technical leadership will involve more than choosing architectures for a team; it will also involve shaping the conceptual terrain that our tools are able to navigate effectively, and being conscious of the subtle ways in which convenience and statistical familiarity can influence what we come to regard as “standard practice.”

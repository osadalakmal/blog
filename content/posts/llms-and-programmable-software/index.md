---
title: "MCP vs SDK: Two Paths to LLM-Powered Extensibility"
date: 2025-08-09T14:30:00Z
draft: false
description: "Two different ways to let your app work better for people (and their AI helpers)."
author: "Osada Paranaliyanage"
theme: "full"

tags:
  - AI integration
  - software design
  - developer experience
  - MCP
  - SDK

categories:
  - engineering principles

image: "powers.webp" # file sits next to index.md
fraction: true
fontawesome: true
linkToMarkdown: true
rssFullText: false

toc:
  enable: true
  auto: true

code:
  copy: true

share:
  enable: true
---

# MCP vs SDK: Two Paths to LLM‑Powered Extensibility

_Two different ways to let your app work better for people (and their AI helpers)._

## From "software eats the world" to AI in the loop

When software started taking over everything, the real winners were the people who could make it do exactly what they wanted. That usually meant writing code - either a whole new app, or scripts inside an existing one. Which meant you had to be a programmer - a costly, time consuming affair that needed significant investment from users point of view. In every office/workplace that is not a software shop, you would know the one person who is the designated computer whisperer, the genius who knows the right incantations to make the computer do exactly what they want. In reality they are comfortable with the operation system, tools and a couple of scripting languages.

And then came the rise of user‑programmable environments. Lotus 1‑2‑3, for example, had macros as far back as the late ’80s, and Excel carried that torch with VBA. These weren’t just nice extras - they opened up whole new ways for people to bend the software to their own needs. This meant now you did not need to program everything from the ground up. These tools were end user software as well so there was some functionality already built in - infact a heck of a lot of functionality. But more importantly they allowed those functionality to be used as building blocks now.

This paved the way for a generation of end‑user programmable tools. Some evolved into full scripting environments inside mainstream apps. elisp is probably the most famous of these leading to many programmers who wax lyrical about how powerful it makes emacs (now you know which editor I prefer!). And some others spun off into no‑code platforms. No‑code is an interesting branch - it promises power without syntax, but it’s still unclear where it fits in the long run. It sits somewhere between “use what’s shipped” and “write a proper program,” but it’s not always clear how far it can take you.

At the heart of all this is one goal: let people get more out of the software you build. The stock functionality matters, sure, but in the age of LLMs, it matters just as much - maybe more - what _hooks_ you give those AI‑powered tools to work with. People are going to be using them, and the more effectively those tools can drive your software, the more value your users will be able to extract.

I’m not saying replace your app with a language - ship the app you want to ship. But alongside that, think hard about what you enable the AI layer to do. If people are using a tool, you should make sure they can use it in the most effective way possible - whether they’re typing commands themselves or letting an AI do it for them.

From that perspective, there are two main ways forward:

1. **Expose an MCP server** (or something similar) so an LLM can directly call into your app using a set of defined commands.
2. **Expose a programmable interface** (SDK, DSL, low‑code) and let the LLM write the code that uses it.

Think AWS CLI vs AWS SDK - one’s a quick, command‑driven way in; the other’s a fully programmable toolkit.

---

## MCP: a command surface for AI

**What it is**: You publish a set of clear, well‑defined actions: `create_invoice`, `fetch_customer`, `transcode_audio`, etc. The LLM calls them, your app runs them, and returns results.

**Pros**

- **Quick wins**: Easy for an LLM to use without setup.
- **Safety first**: You control what’s exposed, check inputs, and keep risky stuff locked down.
- **Predictable**: The API contract is stable even if internals change.
- **Great for operations**: Easy to log, audit, and trace exactly what happened.

**Cons**

- **Less composable**: You can chain calls, but big workflows get clunky without another layer.
- **Feature creep**: Power users ask for more and more commands.
- **Logic ends up elsewhere**: The “brains” live in the orchestrator, not your app.

**Good for**: Repetitive tasks, customer support tools, CRUD operations, data lookups.

---

## SDK/DSL: let AIs write “real” programs

**What it is**: A language binding, DSL, or low‑code setup that the LLM can write to build workflows and automations.

**Pros**

- **Fully composable**: Loops, conditionals, abstractions - you can build proper systems.
- **Durable**: Code can be saved, versioned, and reused.
- **Plays well with others**: Easy to integrate with the rest of a tech stack.

**Cons**

- **More friction**: Needs an environment, keys, maybe a bit of human literacy.
- **Security risks**: Arbitrary code execution means you need guardrails.
- **Higher support load**: You’re now running a developer platform.

**Good for**: Data pipelines, complex automations, custom integrations.

---

## Why most mature platforms end up with both

CLI‑style (MCP) is great for quick wins. SDK‑style is great for deep integrations. People (and AIs) often start with one‑off commands and then graduate to building proper systems. The key is keeping boundaries clear:

- MCP tools: coarse‑grained, task‑focused, with well‑defined inputs and outputs.
- SDK/DSL: small, composable primitives that can be wired together any way the user needs.

I predict that most mature software products/platforms will end up with both.

---

## Checklist

**For MCP**

- Ship tools for your top 10 “jobs to be done.”
- Lock down inputs/outputs with schemas.
- Include dry‑run mode, idempotency, and audit logs.
- Scope permissions tightly.

**For SDK/DSL**

- Keep functions small and focused.
- Provide examples and a quick dev loop.
- Version properly and ship migration guides.
- Include typed clients and golden‑path recipes.

---

## Example for ERP/Order Management System

**MCP tool:**

```json
{
  "name": "generate_invoice",
  "description": "Create and email a PDF invoice for a paid order",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id": { "type": "string" },
      "send_email": { "type": "boolean" }
    },
    "required": ["order_id"]
  }
}
```

**SDK:**

```python
inv = client.invoice.create(order_id)
inv.add_memo("Rush delivery")
if total(inv) > 5000:
    inv.require_po()
inv.email(to=accounting_alias)
```

Same capability, different ergonomics: MCP is **do the thing**; SDK is **build the process**.

---

## Final thought

Start small with MCP for quick wins. Build out an SDK for the power users. Link the two so people can move from “just run this” to “build me the workflow” without friction.

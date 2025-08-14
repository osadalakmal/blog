---
title: "Programming's New Frontier: The Rise of LLM-First Languages"
date: 2025-08-14T20:16:03+01:00
draft: false
image: "designed.webp"
author: "Osada Paranaliyanage"
description: "Exploring the rise of programming languages designed for LLMs, why now is the tipping point, and how challenges like hallucinated dependencies, logic errors, test manipulation, and context limitations are shaping this next wave of language design."
theme: "full"
tags:
  [
    "LLM",
    "programming languages",
    "AI-assisted coding",
    "literate programming",
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

Large Language Models (LLMs) have quickly become an integral part of modern software development. Today, most developers encounter them as coding assistants-tools that can generate code on demand by drawing upon patterns learned from vast quantities of open-source and proprietary code. These models can also reference online resources and produce functioning code in seconds.

But as impressive as they are, this process is far from foolproof.

## The Problem with Current LLM-Assisted Coding

While LLMs can produce working solutions quickly, they are prone to significant shortcomings:

Here are the links for each issue mentioned in the “Current Reality of LLM-Assisted Coding” section:

- **Hallucinated dependencies**: LLMs often generate code that references libraries or APIs that do not exist. This is more than a simple inconvenience; it is now a significant security vulnerability. This phenomenon, sometimes called "slopsquatting," creates a new vector for supply chain attacks. Malicious actors can preemptively squat on these hallucinated package names in public repositories like npm and PyPI. [TechRadar – Mitigating the risks of package hallucination](https://www.techradar.com/pro/mitigating-the-risks-of-package-hallucination-and-slopsquatting)

- **Logic errors**: They can make subtle mistakes that pass undetected until runtime. This is why LLMs are dangerous when used by junior developers. [Medium – Code generation with LLMs: practical challenges](https://medium.com/@adnanmasood/code-generation-with-llms-practical-challenges-gotchas-and-nuances-7b51d394f588)

- **Test manipulation**: In some cases, they will "cheat" by altering tests to make broken code pass. [Medium – Cheating LLMs: How (not) to stop them](https://medium.com/@aipapers/cheating-llms-how-not-to-stop-them-openai-paper-explained-c38ebc637762)

- **Context limitations**: Providing complete context is still a challenge. Developers have experimented with approaches like concatenating entire codebases into a single file, RAG-based (retrieval-augmented generation) solutions, and specialized formats like `LLMs.txt`-a file designed to tell the model the "story" of the repository. Yet none of these methods are optimal. [DataNorth – Context length in LLMs](https://datanorth.ai/blog/context-length)

## Why the Time is Right for a Change

We’ve crossed a Rubicon—a point of no return—beyond which the capabilities of coding assistants have fundamentally changed the nature of what’s possible. While earlier models like GPT-4 offered impressive performance, they often struggled with long-term coherence and could "forget" earlier parts of a conversation due to a more limited context window. The developer's workflow often involved significant manual effort to re-supply context, summarize past conversations, or break down large tasks into small, manageable chunks.

With the arrival of models like Claude Opus, Claude Sonnet, and GLM-4.5, this dynamic has shifted. Their primary innovation is not just higher performance on benchmarks, but a qualitative leap in their ability to handle massive context windows—hundreds of thousands of tokens, equivalent to thousands of pages of code and documentation. This allows assistants to:

- Maintain state over long, multi-file projects: They can now "remember" an entire codebase or a significant portion of it, enabling them to make changes that are consistent across multiple files without losing track of the overall architecture.

- Reason over a complete set of documentation: The model can be given an entire project's documentation, API references, or even a full RFC, and use that information to generate code that is correct and adheres to all specified constraints.

- Exhibit "extended thinking": Some of these models are now capable of multi-step, agentic reasoning, where they can generate a plan, execute it, receive feedback, and adjust their strategy, all within a single session. This moves them from being mere code generators to active problem-solvers.

Projects like Lovable demonstrate this shift. The fact that such initiatives can deliver working applications in a single pass is evidence that we’ve moved past the experimental phase into a new era of practical, production-ready LLM-assisted programming.

## The Case for LLM-Native Languages

The history of programming languages is a story of responding to the shortcomings of the tools that came before:

![Evolution of Programming Languages](https://kroki.io/plantuml/svg/eNptkl1v0zAUhu_9K46WG6gWqU3SrtsFWqnKBEqrQSW44eYkPk2sOfZkO2UD8d-x3VAiNt_5PI_Oef1xax0a13eS2QehHtFgBxXWD43RveJrLbUBZ1BZj0i5kYXG6B8nIaniGkFOB-yl-6CV22FHsDIC5et8L34SzJYj6ISTdEZZ9hoaBlNcI2EVUr0URobSnOAXA3j_3zGTLMuW-SwQbTiZoTqdIq_mvvqyK8A9ci5UA9nUb76cehlFBmZz9psxSQcHToMRTeuAC0O1E1qxeAzYHLXswx70Ae6Nbny8LnQrUTU9NmQZi2kvtli3QhGs_e4C0MJ2DUl-nVOxGIyVtdRV8jnS1X4LSUFzvqgHnBsOd6S-qzfrS_iER3wbxbvNLodkzq_yKxrMwrWDWWL19ePm2yXsP5dnvYBkwa-Xy79zJ5Oy3KY7dOJI_3JPJtH36Hx_zEeGNH0Xw90AVtZ_q9NthEogMc0NtP6yyKSSjiTBPiuHTyyiwSm8w3WHQqX2kWpxEDWL5cDDSM9r_1b05FIj6hbCu3PRdJbdkuLhr_8BZ4P21Q==)

- The leap from **machine code** to **assembly** abstracted raw binary into human-readable mnemonics.
- The arrival of **third-generation languages** (C, Java) provided higher abstraction for productivity.
- **Fourth-generation languages** like LabVIEW tackled domain-specific needs.
- The rise of **memory-safe compiled languages** like Rust and Go directly responded to decades of security vulnerabilities from unsafe memory operations.
- The rise of JVM based alternatives to Java came about because of stagnation in Java roadmap. This gave us languages like kotlin, Closure and Scala.

These shifts happened because the _context_ in which code was written and executed changed.

Today, we are at another inflection point. The dominant programming languages-Python, JavaScript, Java, C++-are designed to be read, understood, and authored by humans. LLMs can emulate human thought, but that’s still emulation. There’s no reason to believe that a language designed to be optimal for _human_ authorship is also optimal for _machine_ authorship.

## Literate Programming as a Precursor

Donald Knuth’s concept of literate programming \[Knuth, 1984] was created so that human-readable descriptions could be embedded alongside code-not merely interspersed, but with documentation as the primary artifact and code as a secondary element. In literate programming, the entire program becomes executable documentation.

For LLMs, this is a natural fit. LLMs excel when they have rich, continuous context, and literate programming provides exactly that: the whole program and its purpose, rationale, and constraints in one coherent narrative. This makes literate programming an ideal model for feeding an LLM the maximum relevant information. We may see a resurgence of this paradigm, adapted for machine consumers as much as for humans.

Modern tools inspired by literate programming-such as [Jupyter Notebooks](https://jupyter.org/), [Quarto](https://quarto.org/), [noweb](https://www-cs-faculty.stanford.edu/~knuth/noweb.html), and [nbdev](https://nbdev.fast.ai/) already combine narrative and code in ways that could evolve toward LLM-first formats.

## Lessons from APL, J, and Q

Some languages have historically prioritized other qualities above human readability. APL, J, and Q embrace terse, symbolic syntax for reasons of efficiency and expressiveness. In these languages, code becomes subservient to the goal-whether that’s mathematical compactness or performance-rather than ease of reading.

Similarly, an LLM-first language may look alien to human eyes, optimized for machine parsing and generation rather than human comprehension. In this way, APL and its descendants offer a blueprint: concise, unambiguous, and structured for the intended consumer, even if that consumer is a machine.

## Characteristics of an LLM-First Language

An LLM-native programming language might incorporate:

1. **Ultra-Explicit Semantics** – No implicit defaults; strict typing and explicit declarations. No room for ambiguity please, LLMs bring plenty of their own.
2. **Self-Describing Code** – Embedded, machine-readable metadata describing intent, dependencies, and constraints. i.e. Literate Programming. Or Joe Armstrong style write-docs-before-code philosophy needed.
3. **Chunk-Optimized Structure** – Modular design aligned with token window limits for easy context retrieval. Each one would need to be mostly self contained and with the output described separately so it can be fed in to LLMs while the other modules are being generated. Think C/C++ header files.
4. **Error Prevention by Design** – Syntax rules that block common LLM pitfalls, such as referencing undeclared libraries or similar hallucinations.
5. **Context Anchoring** – Persistent IDs and hash-based references to ensure the correct version is always referenced. (Content Addressable Storage anyone?)
6. **Stable, Bounded Syntax** – Predictable token patterns for better compression and embedding performance.
7. **Integrated Machine/Compiler Feedback** – Output structured for both humans and models to consume.

## Speculative Syntax Examples

Here’s what such a language could resemble:

```llmcode
@module(meta={"version":"1.2.0","purpose":"Data ingestion pipeline"})
module ingest_pipeline {

  @function(meta={"context_id":"hash1234","owner":"team-data"})
  fn load_csv(file_path: String) -> DataFrame {
    ensure(file_exists(file_path))
    return parse_csv(file_path)
  }

  @test_integrity(id="test-001", immutable=true)
  fn test_load_csv_valid() {
    df = load_csv("/test/data.csv")
    assert(df.rows > 0)
  }
}
```

This speculative syntax:

- Uses metadata annotations for context.
- Embeds test integrity markers to prevent silent tampering.
- Organizes code in retrieval-friendly modules.

## Literate Programming: Executable Context for LLMs

Donald Knuth’s [literate programming](http://www.literateprogramming.com/) reframes software as _executable documentation_: the narrative for humans is primary; the code is woven into that story and then _tangled_ into compilable units. In a literate system, the whole program _is_ context-definitions, intent, trade‑offs, and usage are embedded right where they matter.

That property makes literate programming a strong fit for LLMs:

- **Context density**: LLMs perform better with rich, proximate context; literate code puts rationale, invariants, and edge cases next to the implementation.
- **Retrieval-friendly structure**: Sections ("chunks") can be addressed by name and dependency, making them ideal targets for RAG and for toolchains that assemble the right context window.
- **Intent and constraints**: Narratives, design notes, and correctness arguments can be expressed in machine-readable blocks that the model can obey during generation.
- **Integrity by design**: Tests and specs live as first-class prose+code; changes to tests are visible in the narrative, discouraging silent “cheats.”

_Practical hybrid:_ an LLM-first language could standardize doc-first modules, where every module begins with a prose contract (purpose, invariants, failure modes), followed by code blocks tagged for tangling, and a final verification block of examples/tests.

**Sketch:**

```litlang
# chunk: normalize_emails
purpose: Deduplicate case/alias variants. Invariant: output preserves domain.
assumptions: input ~ list<String>; may contain nulls.

code tangles to email/normalize.llm:
fn norm(xs: List<String>) -> List<String> {
  return xs.filter(not_null)
           .map(lowercase)
           .map(strip_gmail_aliases)  // invariant: keep domain
           .unique()
}

verify:
ex1: norm(["A@x.com","a+z@x.com"]) == ["a@x.com"]
```

## Machines Writing for Machines: Lessons from APL/J/Q

Array languages like APL, J, and Q prioritize _terse, compositional semantics_ over conventional readability. Human legibility yields to density and mathematical regularity; small combinators compose into powerful pipelines. That philosophy maps well to model authorship:

- **Short, regular token sequences** are easier for models to predict and less prone to drift.
- **Uniform data semantics** (arrays everywhere) reduce branching surface and ambiguity.
- **Tacit/point-free style** (functions composed without naming arguments) compresses code and clarifies dataflow for static analyzers and LLMs alike.

An LLM-native language might borrow this spirit while remaining capable of being generated and manipulated by LLMs:

```arrayish
# all-pairs cosine similarity, top-5 per row
S ≔ normalize(X)             -- rows to unit length
C ≔ S · Sᵀ                  -- cosine matrix
Top5 ≔ take⟨5⟩ ∘ argsort⟨desc⟩(C, axis=cols)
```

The goal isn’t to replace clarity with glyphs; it’s to optimize the code’s statistical and algebraic structure for machine generation and analysis.

---

## The Coming Shift

Just as previous generations of languages emerged in response to evolving needs, LLM-driven development will demand its own paradigms. The programming languages of the near future will be:

- Created _for_ LLMs to generate.
- Optimized for the ergonomics of machine authorship rather than human authorship.
- Built with native features to address the unique failure modes of AI-generated code.

We can expect at least one such language to dominate a niche-perhaps in rapid prototyping, automated data processing, or even full-stack application generation-within the next decade.

The next wave of programming language evolution won’t be about making life easier for human programmers alone. It will be about making life easier for our non-human collaborators.

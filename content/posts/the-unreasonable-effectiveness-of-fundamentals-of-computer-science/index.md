---

title: "The Unreasonable Effectiveness of Fundamentals of Computer Science"
date: 2025-05-05T14:30:00Z
draft: false
description: "How core principles of computer science unlock resilient, scalable systems."
image: "LowLevelToCloud.webp"
author: "Osada Paranaliyanage"
theme: "full"
tags: ["computer science", "distributed systems", "engineering principles", "scalability"]
categories: ["engineering principles"]

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

share:
enable: true

---

## Origination of an Idea

In 1960, physicist Eugene Wigner published an essay titled “The Unreasonable Effectiveness of Mathematics in the Natural Sciences,” in which he wondered at how concepts born purely in the human mind—group theory, imaginary numbers, differential equations—so uncannily predict the behavior of atoms, rivers, and galaxies alike. He pointed out that the same algebraic structures underlying quantum mechanics also describe crystal symmetries—equations formulated centuries ago that still govern modern optics and fluid dynamics. Wigner called this “the miracle that the language of mathematics is so appropriate to the objects of reality,” and marveled that what seems like intellectual play often often turns out to be nature’s Rosetta Stone.

## Anecdote #1 – Embedded Systems Thinking To The Rescue

Sixteen years ago, I began my career as an embedded developer, coding in C on bare-metal microcontrollers. I programmed UART interfaces, USB and display drivers, and even ported kernels to new boards. I still remember sifting through Russel King’s ARM tree emails and wrestling with poorly formatted hardware manuals to debug a kernel panic at 4 PM on a Friday. Though tedious, those challenges built my detailed mental models.

Later, watching Matt Godbolt’s talk [“What Every Programmer Should Know about How CPUs Work”](https://www.youtube.com/watch?v=-HNpim5x-IE) reminded me how deeply that embedded foundation influenced my thinking on modern systems.

### From Hardware to High-Level Bugs

Recently, a senior engineer pointed out a race condition in our Scala-based HTTP client wrapper. We used a stack of composition layers over the plain Java HTTP client to add caching, circuit breakers, and retries—all written in Scala, a language I was still learning.

Although I wasn’t a Scala expert, my embedded background gave me a working mental model:

1. **Thread Execution**

   - Just as interrupt handlers preempt main code on microcontrollers, JVM threads can preempt each other.
   - Locks in high-level languages behave like disabling interrupts: they serialize access.

2. **Cache State**

   - In C, I dealt with buffers and pointers; here, I dealt with Scala’s `HashMap` and `Future` types.
   - Invalidating a buffer in embedded memory mirrors evicting a cache entry in Scala.

3. **Synchronization**
   - Embedded code used mutexes; Scala uses `synchronized` blocks and `ReentrantLock`.
   - Both ensure only one context mutates shared state at a time.

### Walking Through the Bug

- I mapped each Scala construct to its C equivalent as I stepped through logs and tests.
- I pictured log outputs as memory dumps and threads as interrupt routines racing for shared buffers.
- By the time I suggested wrapping eviction and insertion in a single lock, the engineer hardly needed to read any code—the core issue was clear.

### Key Insight

These core principles of concurrency, memory consistency, and state management apply just as naturally on modern JVMs as on microcontrollers—making new syntax feel like mere icing on a familiar cake.

## Anecdote #2 – Databases, Change Data Capture, and Cloud

During a zero-downtime PostgreSQL upgrade on AWS RDS using AWS DMS, I needed to explain unexpected replication gaps. I did this **without knowing DMS internals**—relying on a simple, general database model.

### General Database Model

- **Compute**: Executes SQL queries and transactions.
- **Storage**: Persists tables, indexes, and data files.
- **WAL (Write-Ahead Log)**: Logs every change before it’s applied.

CDC tools (DMS, Debezium) tap the WAL to stream inserts, updates, and deletes in real time.

### How Zero Downtime Works with DMS

1. **Initial Full Load**: DMS copies existing data from the source database to the target in bulk, creating an exact snapshot.
2. **CDC Phase**: After the full load, DMS switches to Change Data Capture mode, reading the WAL to capture ongoing changes.
3. **Continuous Sync**: DMS applies changes to the target in near–real time, keeping it in lockstep while the source remains live.
4. **Cutover**: At any convenient moment, we switch traffic to the target with negligible downtime, since DMS has reconciled all changes.

### DMS Constraints

1. **Sequences**

   - Sequence increments (SERIAL/IDENTITY) emit via the WAL, but DMS ignores them.
   - Result: the target’s sequence can lag, causing insert failures.

2. **DDL Statements**
   - DDL (CREATE/ALTER/DROP) bypasses the WAL and is blocked by PostgreSQL’s internal replication triggers.
   - Triggers prevent schema changes from entering the WAL, so DMS never sees them.

When I walked through the WAL-based flow and pointed out where PostgreSQL’s internal replication triggers intercept DDL, my teammate—who had never used DMS—instantly saw the picture. They could trace exactly how inserts and updates flow from the source through the WAL, why sequence increments vanish, and how triggers halt schema changes. Within minutes, they could predict which operations DMS would drop and why, without ever consulting AWS documentation.

> Note: Manual sequence sync (e.g., querying `last_value` and `ALTER SEQUENCE` to catch up) exists, but that wasn’t the point.

### Key Takeaway

Anchoring on **compute**, **storage**, **WAL**, and **triggers** lets you predict any CDC tool’s behavior without learning product-specific quirks. With this core mental model, detailed DMS knowledge becomes optional.

## Anecdote #3 - Redis, SSH Tunneling, and Distributed Systems

Distributed consensus once felt like arcane wizardry—until I read the [Raft paper](https://raft.github.io/raft.pdf) (highly recommended) and built my own implementation. Suddenly, concepts like **leader election**, **log replication**, and **network partitions** clicked, giving me a reliable mental model for any distributed system.

### From Theory to Redis

With Raft under my belt, I could immediately grasp how Redis handles replication in its single-master setup:

1. **Leader Election**

   - A single Redis instance acts as the “master.”
   - If it fails or is unreachable, followers hold an election to choose a new master.

2. **Replication & Sharding**
   - Followers continuously pull the master’s write-ahead commands to stay in sync.
   - In a clustered setup, Redis shards your keyspace: each master node owns a subset of hash slots (0–16383), and clients must direct commands to the correct node.
   - Clients receive a `MOVED` or `ASK` response when they connect to the wrong shard.

### The Real-World SSH-Tunnel Puzzle

Last week, an engineer couldn’t `GET` keys through our AWS ElastiCache Redis cluster after I’d set up an SSH tunnel. Here’s what happened:

1. **What We Did**

   - We tunneled port 6379 on **one** Redis node through SSH to localhost.
   - We pointed our client at `localhost:6379` and saw all the keys that lived on **that** shard.

2. **Why Other Keys Failed**

   - Redis uses the `MOVED` response to tell clients when a key lives on another shard.
   - A standard Redis client will follow this redirect—unless it’s only connected to a single tunnel endpoint.
   - Since we didn’t tunnel the other shards, any `MOVED` response couldn’t be followed, and GETs failed.

3. **Key Takeaway**
   - **Fundamental model**: Redis clusters map keys → hash slots → specific nodes.
   - **Practical fix**: Either tunnel all cluster nodes (one port per shard) or use a Redis-aware proxy that understands cluster redirections (for example, [redis-cluster-proxy](https://github.com/antirez/redis/tree/unstable/src/cluster), which handles MOVED/ASK redirections automatically).

Once your mental model of leader election, replication, and sharding is set, implementation details—SSH tunnels or AWS quirks—feel like mere mechanical plumbing.

## Why You Should Care

In software, it’s easy to chase the latest framework or database. One month it’s a shiny JavaScript library; a decade ago, it was the NoSQL craze. But each new tool brings its own rules, quirks, and failure modes. If you only learn surface details, you rebuild mental models from scratch each time—and troubleshooting at 3 AM becomes a frantic search through half-memorized documentation.

Instead, invest in fundamentals: consensus algorithms, write-ahead logs, and trigger mechanisms. As Daniel Kahneman explains in [Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow), these become your System 1 intuitions—instant, reliable mental shortcuts. When you grasp systems at their core, mapping any new tool onto those patterns is trivial.

This pays off:

- **Predictable troubleshooting**: With mental models ingrained, you diagnose issues by analogy—whether it’s a Raft-based consensus failure or a Redis shard miss—without rummaging through half-learned tutorials.
- **Efficient collaboration**: Shared fundamentals keep conversations focused on solutions, not on translating tool-specific jargon. You onboard teammates faster and avoid miscommunication by speaking a common language of system design.

Mastering fundamentals isn’t academic—it’s the key to durable expertise, so you spend less time learning syntax and more time solving real problems, regardless of tomorrow’s hottest technology.```

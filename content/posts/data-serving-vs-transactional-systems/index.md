---
title: "Data Serving vs Transactional Systems"
date: 2025-03-08T13:31:56Z
draft: false
image: "the-chaffins-Zdf3zn5XXtU-unsplash.jpg"
author: "Osada Paranaliyanage"
description: "My transition from a transactional system background to a team managing a data serving platform"
theme: "full"
tags: [engineering-excellence, software-architecture]
categories: [software-architecture]

ruby: false
fraction: false
fontawesome: true
linkToMarkdown: false
rssFullText: false

toc:
enable: true
auto: true
code:
copy: true
share:
enable: true
---

## A little bit about my experience as a software professional

I have now been in the industry close to two decades, and in that time I have moved around a fair bit in terms of
technology stack, the type of systems I work with, the industry I work in, amongst other factors. In my first couple of
years, I worked for a small (at the time!) electronics company that mostly dealt with embedded systems. My work was
mostly concerned with the interface between hardware and software. Though I studied electronics in university, I was always
interested in the programmable aspects of the systems. Accordingly, I got my start in software bringing up development
boards, porting Linux to them, and writing device drivers.

After a bit of that, it was time to move to a job where I did get to use C++, but for a completely different purpose. I
was now working on trading systems, order processing systems, and other financial markets-related software. I would move
on within the company a couple of times, working on everything from mobile software to security systems software. Then, through another couple of companies where
again I worked on financial systems and an e-commerce platform, I ended up where I am now—at the BBC.

The first thing that hit me when I joined was the fact that our tech stack was very different—I had never worked in Scala
before. But what hit me even harder: there were no transactions in the system! The system's
primary focus was to serve the data it had in its databases and data stores, but the loading of that data was mostly a batch process.
Even when it wasn’t, there were no constraints in terms of event ordering. We could afford to serve data a little bit
out of date, given that we eventually caught up in a reasonable time period. This was a completely different way of thinking about
systems for me.

That contrast got me thinking more deeply about what transactional systems really are, and how they shape the way we build software.

## The world of transactions

Transactional systems vary a lot in what they do and how they do it. But by and large, they can be described as systems that process
changes in real-world properties in a consistent, atomic, and durable manner. They are meant to model real-world entities such as
bank accounts, sales, orders, and inventories. As you are modeling these real-world entities, it is essential that your code
reflects the true state of the real-life entity and thus needs to be consistent. In an actual warehouse, the inventory of goods
doesn’t become zero even just for a second before assuming the same value as before.

In other database parlance, these systems are often backed by OLTP databases. OLTP stands for Online Transaction Processing, and they
are optimized for the type of workloads that transactional systems generate—as opposed to OLAP databases, which are optimized
for bulk reads and the types of queries that data-serving systems generate.

Most of the trading and financial applications that I have worked on followed a simple formula: process transactions as fast as possible in a serial manner,
and then find an axis along which you can shard the system so that the shards can run in a shared-nothing manner. Then you can just throw more
shards at the problem to scale.

In very low latency systems, multithreading becomes an overhead. You
are much better off focusing on single-threaded performance and optimizing via techniques such as SIMD instructions. But it also means that most of the time you are worrying about write performance and avoiding actual
database writes. You’ll employ everything from in-process caches, out-of-process caches, and write-ahead logs to avoid a
round trip to the database.

You give very little thought to the querying side of the system apart from basic due diligence. But you really don’t worry about the data model,
because the only way you are going to read the data is the same way you wrote it—as a transaction.

In contrast, the system I joined at the BBC operated in a fundamentally different way.

## My adventures on the other side of the fence

The system that my team currently works on is a data-serving platform. It’s not exactly an OLAP platform in that we don’t serve arbitrary queries on the data,
but the ingestion side and serving side are cleanly separated.

The data load happens through an event feed that uses ingestion logic separate from the serving logic. Ingestion can also be triggered in a batch mode to backfill the full data set if needed.

The data-serving side works on a request/response model. It’s optimized for sustained workloads and is mostly concerned
with query latency. This is a textbook application of the CQRS model: the read and write sides are completely separate.

Performance on the read side is determined mostly by the form of the data in the stores—Redis caches or databases. There is very little
processing when serving a request. We mostly just pull the data out, apply a bit of transformation and business logic, and serve it.

And the other surprising part: write performance mattered very little. Because the system lacked real-time consistency needs, we could batch writes.
Even with ingestion delays, we could catch up when update rates dropped. This was a completely different way of thinking about systems for me. Unsettling at first, but I’ve grown comfortable with it.

These systems scale along the axis of read traffic. To scale well, you manage users and data.

The data model should be as close to the query model as possible. The users should be handled as efficiently as possible—avoid per-connection threading and minimize communication overhead.

Seeing both systems up close helped me crystallize the differences. Here’s a simplified comparison.

## Summarizing the differences

| Property           | Transactional Systems                                 | Data Serving Systems                                          |
|--------------------|-------------------------------------------------------|---------------------------------------------------------------|
| Consistency        | Very important                                        | Not as important                                              |
| Performance        | Write performance is key                              | Read performance is key                                       |
| Read Data Model    | Not as important                                      | Very important                                                |
| Performance Limits | Limited by computation                                | Limited by data store performance                             |
| Scaling            | Single-threaded performance + shared-nothing sharding | Data store performance + data model + efficient network stack |

But switching system types wasn’t just a technical shift—it challenged how I thought about engineering altogether.

## Learning to think differently

Writing a matching engine or a risk management system, there is rarely a need to model your system beyond a rudimentary way. We would have
well-established patterns and concepts—order book, positions, etc.—that everyone understood. The domains were predefined,
and user needs were prescriptive.

In adapting to a system where the query model matters, I’ve had to grapple with understanding the business domain. How to model it, speak the language of domain experts,
and translate that into requirements. This requires a mindshift—especially if you’ve built your career being the one who knows things.

But once you let go of the fear of needing to learn something new, the path forward becomes clearer.

The most basic thing was talking to people. The team had existed a long time and had built an internal language they all implicitly understood.
But it wasn’t documented. So I asked questions—frequently, but respectfully:

1. I could nod along and ask later, but that meant I’d only half understand what followed.
2. Other new joiners would feel encouraged to ask too.

Next was widening the circle. The more I explored, the more I realized people didn’t always know systems in depth—even when they spoke confidently. Systems people referred to daily were often not fully understood. I made it a point to talk to folks from across backgrounds and systems to understand the whole ecosystem. Often, they’d say, “Hey, this has been a long-standing problem!”

Then came understanding common architectural patterns. Whether dealing with out-of-order S3 events or DB query caching with external caches, our org had go-to solutions. Even if a different approach might be incrementally better, sticking to the known pattern made the system easier for others to reason about. If you're not convinced, check out [enterprise integration pattern](https://www.enterpriseintegrationpatterns.com/).

Still, your core skills remain useful. Understanding RDBMS internals, query optimization, network stacks, OSI layers, caching strategies—all of that continues to matter. That part never changes.

## Conclusion

This post started as a way to contrast two very different types of software systems I’ve worked on—but along the way, it became something else. It became a reflection on how we grow as engineers when the rules of the game change.

If there’s a core message here, it’s this: foundational skills matter. The ability to understand systems, think clearly about trade-offs, and collaborate with others—those are the real constants. They carry across domains, stacks, and even job descriptions.

A long time ago, I read a Superman comic that said: “Once you are Superman, you will always be Superman.” That stuck with me. Once you’ve built those fundamentals, you can step into almost any system—and make it better.

<br>

Photo by <a href="https://unsplash.com/@thechaffins?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">The Chaffins</a> on <a href="https://unsplash.com/photos/person-jumping-on-big-rock-under-gray-and-white-sky-during-daytime-Zdf3zn5XXtU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
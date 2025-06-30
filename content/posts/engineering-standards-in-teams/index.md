---
title: "Engineering Standards in Teams"
date: 2023-09-11T01:38:25+01:00
image: "scott-graham-5fNmWej4tAA-unsplash.webp"
author: "Osada Paranaliyanage"
description: "Engineering Standards in Software Engineering Teams. Why we need them, how to start."
theme: "full"
tags: [engineering-culture, engineering-excellence, engineering-leadership]
categories: [engineering-leadership]

ruby: false
fraction: false
fontawesome: false
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

{{< table_of_contents >}}

## Introduction

One of my best friends, who I first met in a previous job, called me one evening. For now, let's call him Jake. He is the calmest person I have ever met. And if you know me, I am usually the farthest from calm of any of us, comfortably bubbling between enthusiasm and dejection with alarming frequency. But on this day, Jake seems a bit shaken. He wants my input on something. He is having some troubles at work with a colleague who started new in his team. They are working on something that is novel to Jake, but he is starting to feel like his new colleague, let's call him Mike, does not know much about the fundamentals of the tech even though he is supposed to. They have just had a disagreement regarding the proper use of the standard libraries and the language they are using, and it turns out Jake was right. He wants to know how he might best handle the situation. We talk for a while, I listen for the most part and we settle on a course of action that we think will resolve the issue. But this gets me thinking - why did this situation arise in the first place.

## Healthy conflict and unhelpful distractions

Conflict in teams do not have to be a siren announcing doom and gloom (And this is coming from Brené Brown and I promise you will not regret reading her take on it [here](https://www.amazon.com/dp/0812995848)). In fact most of the time we can even turn conflict in to an asset - it can create more engagement, it serves as a barometer of people's involvement. I am not advocating for a management style that tries to avoid conflict at all cost. But there are times when conflict is not helpful, especially when the issue at hand is debate on facts that are already well established.

I have been in pretty heated debates about language-related things like coding styles and linters. They were fun, very revealing about our values as a team, and I would dive headfirst into the next one without any hesitation. But the problem with the debate Jake was having was it was about fundamentals like the proper use of visibility modifiers. There is no debate about these, and there should not have been one. These are matters that define the engineering excellence policies a team should be following. Unlike say a ways of working based conflict, this does not really need discretion or consideration of individual preferences - engineering excellence is a policy decision.

This is where engineering standards come in. Once established, they allow your team to focus on delivering value to your customers instead of getting embroiled in issues that can be routinely handled by established guidance. They save your team from having unnecessary conflict and expending time on resolving those. And they allow you to deliver things faster because the team can offload that to various degrees of automation and concentrate on other things. They make for great quality software because now you deliver consistently good software, and they are more likely to be bug-free (Note that this is not a given. We have all seen enough AbstractSingletonProxyFactoryBean classes riddled with bugs).

## How to do Engineering standards right

The common complaint from engineers against engineering standards is - *But they stifle creativity!*. Yes, they do. And that is kind of the point. *Insert Evil Laugh*.
More seriously, they are not there to stifle creativity but to perform two very important tasks in a high-functioning team.

1. Establish trust.
2. Optimize workflow.

You sure can use enforcing standards to stifle creativity, and we have seen it happen at one time or another. This is how we get rules like all the data must always access through explicitly written accessors, and [record types](https://openjdk.org/jeps/395) get banned. But sensibly applied, engineering standards will do the two functions above without stifling creativity. In fact, I would argue that this is the test of good engineering standards - do they enable the above while allowing developers to develop innovative solutions to the product problems they have. Understand that dogma is not helpful and pragmatism is the key!

### Establish Trust

How do engineering standards establish trust among folks in a high-functioning team? Because this gives a baseline quality and shape to the codebase. It is well established that any code above a few hundred lines will take a significant amount of time to digest and understand. Now expand that fact to the usual technical estate found in today's typical workplace where tens of microservices each worth a few thousand lines of code is a common sight. If you cannot make simple assumptions about the fundamental aspects of the codebase, the only way to interact with the codebase becomes working with it until you have familiarized yourself with all aspects of it, and this might take years. That is a nightmare scenario for Team Leads such as myself. This means the time to be productive is years for folks making both them and us frustrated.

If you can assume certain fundamentals always hold true, then this becomes much easier. You are free to concentrate on the things built up from this baseline only, leaving a much less cognitive load on you. This gives you assurance that all of your team knows and takes care to follow these standards. Suddenly, they are not strangers in the code land - they are fellow travelers on your journey to a better product who share your coding values and ideas. You all agree on fundamentals, and you are assured there will be no nasty surprises were you to undertake some significant work together. This shared identity is the first step in building team trust.

### Optimize Workflow

In agile teams, we talk about how to optimize our workflow and specifically in Kanban, there is an emphasis on increasing flow. The way to do this seems to be by making sure we reduce handover and context required. Engineering standards make sure that there is no new information required to handle tasks beyond the specific business value the tasks deliver. Take a team that has standardized on using Redis as a KV store for intra-service caching, for example. Imagine there is a team-specific client library for interacting with the Redis cluster for that microservice. Now, if there was no standard, and it was a custom component that talked to the Redis cluster, you will have to read through and understand everything about how Redis gets used in there, from `AUTH` statements to if pipelining is used. But with the team-specific client, you can limit your understanding to the client interface, and it is reusable across any other microservices. If the credentials come from environment variables, they always come from the same ones, etc.

This allows your team members to concentrate on delivering the actual business value instead of worrying about tangential technical matters.

## So how would I start implementing engineering standards?

{{< figure src="nick-abrams-FTKfX3xZIcc-unsplash.webp" title="Slow and Steady" >}}

1. Slowly.
2. Deliberately.
3. With purpose.

### Slowly 

Go slow. Start by introducing a limited set of standards, focusing on the most critical areas of improvement. This gradual rollout allows the team to adjust to the changes and provides the opportunity to gather feedback and make adjustments as needed. It's essential to balance the pace of implementation with the team's capacity to adapt, ensuring that they can embrace the standards comfortably without feeling overwhelmed. Remember you are not in a race; it is not about being the first to implement these standards.

### Deliberately

Each step in the implementation process should be well-thought-out and intentional. Deliberation involves careful planning, clear communication, and a thorough understanding of the objectives and potential impacts of the standards. Take the time to assess the current state of the team, identify pain points and areas for improvement, and create a roadmap for introducing standards. When changes are deliberate, they are more likely to be effective and accepted by the team. Understand that a team requires a "why" more than they will ever need a "how."

### With purpose

The implementation of engineering standards should have a clear purpose and align with the overall goals and values of the organization. Define the specific problems or challenges that the standards aim to address, whether it's improving code quality, enhancing collaboration, or meeting compliance requirements. Ensure that the team understands the purpose behind the standards, as this helps motivate and engage team members in the process. Having a well-defined purpose also allows you to measure the success and impact of the standards against your intended outcomes. Always make sure that the overall vision for your team aligns well with whatever engineering standards you are trying to instill.

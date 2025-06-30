---
title: "Technical Tasks for Managers"
date: 2024-12-22T16:18:00Z
draft: false
description: "What technical tasks should a manager do in a AI enabled world."
image: "marvin-meyer-SYTO3xs06fU-unsplash.webp"
author: "Osada Paranaliyanage"
theme: "full"
tags: ["software engineering", "technical enablers", "engineering culture", "engineering leadership"]
categories: ["engineering leadership"]

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

## What does being technical mean for Engineering Team Leads and Managers

I have now been in a management position for the better part of a decade and with that milestone comes a bit of a time to reflect back on how the journey has been and what I have learnt along the way. When I first started leading a team formally back in 2019 I had modeled my expectations on what I would be doing on what my managers up until that point had done. And they had mostly done coding. This was a peculiarity of the company I worked for till then. In that situation team leaders were essentially tech leads that also had 1-1s with you occastionally. There was no real personal development planning or coaching or any of the leadership whizz words that you cannot escape from in any of the engineering leadership text books today. They reviewed most of the code and were very hands on, from forming system designs to actually implementing the solutions they did it all.

But this came at an expense, because most of the time things had to go through them, they became a bottlenek. They may have been the original implementers of the system, they may have at point or the other had the best contextual knowledge of the system. But that is all a hindrance when the system is being continually updated and you are waiting for their approval to move forward with any of the real work. Even worse they had become silos of information that made the bus factor for the most critical parts of the system one. While this did ensure their job security for the most part it made it very hard to change these systems in even the most basic agile manner.

So if you cannot be the single most knowledgable person and approver of system designs (dare I say should not!), what should a technical mananager do that will help their team? What should being technical mean for the team lead or manager that wants to empower their teams but do not want to be the bottleneck?

Over the years I have come to believe that there are a few different things to choose from. It isn't much, but it's mine!

### TOIL Automation

One of the key areas where a technical manager can add value is by automating repetitive tasks, often referred to as [TOIL](https://sre.google/sre-book/eliminating-toil/). These are tasks that are manual, repetitive, automatable, and devoid of enduring value. Automating TOIL can free up your team's time to focus on more strategic work. As a manager, you might have the broader perspective needed to identify these tasks and the authority to prioritize their automation. This not only improves efficiency but also boosts team morale by reducing the amount of mundane work.

There are a few reasons why this is a perfect opportunity for your average engineering team lead with an uninterrupted focus time of 30 minutes max. 

1. These are usually small enough that you can make significant progress in a short time. So being interrupted mid flow is not devastating to the task at hand.
2. They are usually not related to the sprint goals and do not necessarily align with sprint goals. If you are running Scrum teams that go more or less by the book, the team may not necessarily have the ability nor the desire to complete these tasks.
3. They are ambiguous in nature and may require a broader perspective than the team members are able to provide.
4. Last but not least is the fact that you can use AI tooling for the most part to your heart's content. These tend not to be production code deployed to live environments and therefore allow ample use of AI tooling such as CHOP assuming your organization allows it

Some of the example tasks include 

1. Data entry/munging/output automation. Imagine generating reports or sending notifications.
2. Developer experience tasks. These are tasks like creating glue tooling for various tools and setup automation tasks for tools like editors. Another example was a tool to list old PRs that are still open grouped by person filtered for active members of the team.
3. Developer metrics related work. This is where we try to discover data on the workings of the developers. This maybe data on pull requests, build times or may be you are trying out SPACE metrics. In any case you are trying to find data that will help your team be more effective.

That last one may need more of an explanation so we will look at that in detail next

### Developer Metrics Related Work

This is one of the tasks I love doing but do not see a whole lot of discussion about. A long time ago I was talking to a person starting out in a devops adjacent role and we were discussing a code review tool that was open sourced by facebook - [phabricator](https://secure.phabricator.com/). The discussion somehow turned to people's habits around code reviews and we both realized even though we had tons of anecdotal examples from our time as software engineers we had no idea to back up the claims we made as habits of software engineers being either code committers or approvers. For example in our combined experience when the code reviewes were rather large, people tended to in general make a couple of superficial comments and then quickly approve the review. When it was smaller and more digestible, ironically approvers tended to be far more thorough and ask a lot more questions. This meant that people had a perverse incentive to make their code changes large and harder to understand and even though no one said this out loud, people had internalized this lesson.

We decided the best course of action was to come up with statistical evidence to see if this was true. To do that we had to extract the data from the code review tools internal database and crunch with a python script. Note that there was no strategic directive that we had to do it and it was certainly not a product feature. Nevertheless it answered a big question we had and provided us with a way to optimize our developer workflow and avoid bugs.

Nowadays most observability platforms have tended to acquire features like this and tend to provide features that do a speed run of these kind of tasks. Maybe they provide ready made reports that expose this information or better still they provide a way to generate these using familiar tooling such as SQL. But if they do not, this is one of the areas where you can make a huge difference and not a lot of teams have capacity to work on with the product feature roadmap they currently have.

### Investigative Work for the Team

With the pace of technology change being what it is, there tends to be a lot of churn in your stacks relatively speaking these days. Gone are the days where using MSVC++ 6.0 for 12 straight years was just good practice. And there are certain trends that mean the technology stacks change fundamentally and not in a one-to-one mapped way like before. A good example of this is the trend towards more managed services that the big PaaS players and SaaS players offer these days. The move from stock Postgres running as RDS on AWS to Aurora Distributed SQL database for operational reasons is one definitive example of this. Another example in Java world is the move from batteries included frameworks like Spring to micro-frameworks like Quarkus and Micronaut.

These are disruptive changes to implement therefore there should be some investigative work done in order to determine if the team should even consider these items as options to be implemented next. This presents some unique challenges in doing this work. You need to have a good amount of experience in various technologies to know how this new technology works. You should also know enough of the broader context to know how and when your team can use this functionality. And finally you need someone who does not mind the disruptive nature of learning a completely new tool that your team may or may not end up using.

As a servant leader, this is something that I can do to spare my team and I love doing this kind of work. And as an added bonus if and when a moonshot idea gets implemented, I get to see the fruits of my labour making a real difference to the team! 

As an example, we were always using a personal access token for a GitHub user that we created for interacting with pull requests from our code build. This is not an ideal solution for various different reasons though and not the least of which is that the team has to manually rotate the PAT every n days to comply with the secinfo policy. So I investigated if any of the other teams had done any work to replace this setup with a GitHub app and it turned out yes, some other team had! Then it was a bit more work to talk to them, find out what they did and why they did it. Afterwards, I followed their suggestions, used some of their work to bootstrap mine. Then another couple of weeks wait to get my thread model checked out and approved and then finally I was on the home stretch. It was halting work waiting for input from several other teams and not very amenable to focus time work. And I was happy to take the work and get it done. It meant I had learned up a lot about TS GitHub libraries, GitHub APIs and GitHub apps. The team had a better security model. A win-win situation for all.

### Documentation, Cleanup and Decommission work

Any sizable project will include components similar to what I have stated above. And these are perfect for folk like me who want to contribute but do not have the capacity to complete tasks in the critical path. By their very nature these tasks do not require coordination with other team members and/or other external teams. Documentation is self contained and allows you to get an overall idea of the changes without bothering about the details. Cleanup and decommission work comes at the end of a project and you can usually do them at your lesuire. Again they usually allow you to get an overall idea of what changed when without a lot of nitty gritty details.

## How to choose what to do

Again, I have to caveat everything that follows as being what I do. This works for me in my particular circumstance so this YMMV. Buyers beware and all that!

The best source for these ideas seem to be meetings that you are in. I know it is fashionable to complain about the meetings that you are in as team lead. It is almost customary to at this point when discussing meetings to let out a deep sign and say in a pained voice "Yeah, I do my best to pay attention but OMG meetings are so soul crushing". But these same meetings can be a gold mine for ideas to implement by yourself. For me, I use a few meetings for this purpose.

1. Engineering Discussions with the team where we discuss general engineering matters.
   This is a great place to understand pain points of engineers while they are trying to get work done. Often there will be a throwaway comment from an engineer and there will be murmurs of recognition from others and that is your cue. If appropriate, dig in to it in detail by taking a couple of mins or use a followup chat to understand the problem in detail. And then use that understanding to create a followup work item that will permanently address the issue. A great example of this happening was in a previous team of mine where I created a set of CMake Toolchain files that allowed you to debug programs easily in a VM. It all started because someone dejectedly said in a meeting "Yeah, well even if we do that It will take half a day to figure out how to build it to work in my VM".

2. One on One meetings.
   Every one tends to do one on one meetings differently and I think it is only right that you tailor your approach to suit the engineer you are talking to. After all your primary goal is to make sure they are doing ok. I tend to use some of the time to understand what their working week was like and what they lacked during that time to make them more productive. This again tends to be a very good idea generation time. You get their undivided attention and you can dig deep to understand what the exact problem is and what they want you to do to fix it. This last part is very important as I have seen numerous cases where we go ahead and implement something that they never had in mind as the solution after just listening to the issue they had but not what the solution might be.

In the end it all comes down to who will benefit from the work you do. It is a bit like that old adge about jobs - "At every job you should either learn or earn. Either is fine. Both is best. But if it's neither, quit.". The technical work you do as a manager should benefit you, your team or ideally both. If it is neither then do not take on that work.

## What should your goals be?

When I set out to do technical tasks, I tend to have only a couple of motivations.

1. I want to keep doing technical work so I don't become rusty. I guess this is the primary motivation for almost all of us team leads/managers. The more we not practice the art of code, the less likely we are to feel comfortable picking it up again next time when needed. So for that reason look for tasks that actually require you to develop and apply yourself. Do not choose admin work or just rubber stamping work and convince yourself that somehow they count as technical work. You will be lying to yourself and no on else.
2. I want to do something that would improve the working environment for my team. I mostly focus on Developer Experience because I am passionate about it and want to advocate for focusing on it. But it can be anything from FinOps to AI tooling that you think will make the most impact for your team as of right now.
3. It should allow for your team to take the work you did forward as a continuation. The best kind of work are not throw aways and allows your team to build on top of it. This allows your team to understand the contribution you made and appreciate it. It also allows your team that work like this that they initiate are valuable and appreciated by others.

## I don't know if I have time for this

You should always set aside time for your own development and this is a very important part of that. Consider ring-fencing this time. Create an appointment in your calendar to block out a time for you to do a bit of focus work. This does not have to be a huge block of work but it has to be enough so you can make enough progress every single day. And you need to commit to it as well, the more consistent you are, the better you become at getting this work done. Do not be afraid to tell other that you have a commitment to some work that you cannot forgo and to please schedule around you. 

It is ok to take a break, there can be extraordinary circumstances that require your full focus but always return back to your goal of getting some technical work done. There is going to be no substitute for putting in the hours.

And do use the new AI tooling as much as you can. You have experience to make sure that the hallucinations do not get through and impact the work and you know already what the problem to be solved your. You as a senior practitioner are in a perfect place to exploit CHOP to your benefit.
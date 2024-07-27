---
title: "What Determines Your Engineering Organization's Culture"
date: 2024-07-25T03:58:57+01:00
draft: false
image: "this-is-engineering.jpg"
author: "Osada Paranaliyanage"
description: "Exploring what factors determine engineering culture in engineering organizations"
theme: "full"
tags: [engineering-culture, engineering-organizations, engineering-leadership]
categories: [engineering-organizations]

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

# What Determines Your Engineering Organization's Culture

<div style="border: 1px solid #ccc; background-color: #f9f9f9; padding: 10px; margin-top: 10px; font-size: 0.9em; color: #555;">
    Photo by <a href="https://unsplash.com/@thisisengineering?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">ThisisEngineering</a> on <a href="https://unsplash.com/photos/person-holding-white-printer-paper-WDCE0T4khsE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

## All Happy Families

The [Anna Karenina Principle](https://en.wikipedia.org/wiki/Anna_Karenina_principle) states that "All happy families are alike; each unhappy family is unhappy in its own way." This was originally coined by the philosopher and writer Leo Tolstoy. The idea behind this principle is that all unhappy families are unhappy due to some trait that they have that prevents them from becoming happy. Happy families are alike in the sense that they avoid those traits to achieve happiness.

This principle can be seen in many real-world examples. One notable example comes from the book "Guns, Germs, and Steel" by Jared Diamond. In this book, the author argues that the rise of the modern world was due to the introduction of firearms and the spread of disease. He looks at domesticated animals as an application of the Anna Karenina principle, arguing that for an animal to be domesticated, several properties should hold for that species such as:
  1. It should be easy to feed.
  2. It should grow up quickly.
  3. It should breed in captivity.
  4. It should be easy to handle.
  5. It should be easy to train.
   
Any species that does not have at least one of these attributes will not be able to be domesticated. In this manner, all domesticated animals are alike in that they all share these attributes.

From my experience, engineering teams have a few key attributes that determine if they are effective. I do not believe dogmatically that there is only one right way to run a software engineering team, but rather, I want to argue that there are various wrong ways. Amongst the key attributes, two stand out for me:

  1. The overall engineering organization's reporting structure.
  2. The values that get the most airtime in the organization.

## The Overall Engineering Organization's Reporting Structure

I have been fortunate enough to work for several different companies in very different businesses and engineering organizations organized in various ways. I have also had the pleasure of working with and knowing folks from very different companies—from startups to enterprises, from contracting houses to product companies, and from 30+ year-old companies to ones that started within the last year.

One of the most crucial ways in which the organizations differed, and one that they responded most to, is who reported to whom. Note that the formal organizational structure does not really matter in this regard. More important is the informal structure. You can observe this by looking closely at the senior executive-level interactions in the company—who is holding who accountable. Mostly this will depend on whether there is explicit reporting of one discipline to another. But in organizations that ostensibly put these various disciplines on equal terms, you get a sense of who is ultimately holding who accountable when you look at senior-level interactions.

### Everyone Reports to Engineering

This is mostly true for engineering shops that do consulting and long-term contracting from what I have seen. The whole business is one of creating engineering talent and shopping that around. So the whole business is structured to allow that to be easy. Everyone from Delivery, Business Analysts to Marketing and Sales really report to the engineering counterparts. The CTO holds the most power at the executive level and that reflects back on the ranks. 

This has interesting consequences:
 * Engineering becomes, by necessity, multidisciplinary. Since they need to control all the other aspects, they become very good at understanding and directing other disciplines. They are most likely to know the vocabulary of other teams, the ways of working of them, and so on. These engineering teams interface with the other teams a lot so they learn how to direct them and get the output they want from the Delivery, Sales, and other teams.
 * Engineering feats become the most celebrated achievements, but they should be of the sellable variety. What gets people paid is creating the engineering output either in terms of actual software or in terms of processes/tools that can be sold, so they tend to celebrate that.

### Everyone Reports to Delivery

Some organizations I have seen have everyone reporting to delivery or project management teams. The delivery teams report back to a senior executive that is in charge of software services, and these companies, in general, tend to be in the software services business. The delivery teams are in charge because that is how people in these companies get paid. If the service is not delivered, no one gets paid. This again has some interesting characteristics:

 * Any piece of engineering is measured by how easy it was to deliver, how much effort it took, how many resources it consumed, and how on-time the delivery was. This becomes the yardstick by which the teams are measured. The actual engineering that goes into the product or the service does not matter as much as how quickly it was delivered. Therefore, these companies tend to be extremely conservative in tech usage and can take years to switch away from legacy tech.
 * Because output is all that matters, there tends to be a lot of corner-cutting and papering over issues. A bug that can be solved with a Standards Of Practice (SOP) document is a bug that does not have to be fixed. Every bug gets triaged with the idea that as long as it matches the customer requirement of the user story, it is not a bug. And if it needs changing, you need a Change Request (CR).
 * Consequently, these organizations tend to be process-heavy because the idea is to minimize risk. Everything will be documented, and the processes will be followed as much as possible to make sure there is no disruption or even if there was, it could not be traced back to the engineering organization.

### Everyone Reports to the Core Business

This is probably the case for the majority of product-centered organizations. In this case, engineering ends up reporting to the product team. The technical roadmap tends to be merged with the product roadmap, and the technical decisions are mostly driven by how much impact they have on the product. The quality of the engineering tends to be closely correlated to the quality of the product development vision and discipline.

* Any piece of engineering is measured by how much business value it delivers. In good organizations, this would be measured by a good OKR-based system that evaluates the impact it has on the fundamental agility of the product and the value delivered to the consumer. In other organizations, this may be measured by more superficial means such as the number of features a given piece of work enabled. The less deeply measured the impact is, the less inspired the team becomes, and that is the true danger here.
* If the team goes to the extreme end of feature delivery, they basically become a feature factory powered by short-term thinking, code-slinging with little thought given to the consequences of the architecture being created, and no real ownership of the system.
* The processes tend to be minimal, and even if they are in place, usually the organization tends to keep them as light as possible. Because the product team tends to have a bigger say in the deadlines, you usually get more cases where engineering works to given deadlines and tries to shape the work to fit the time available. This means the output is much faster compared to engineering-led organizations but mostly not as consistent.

## What Gets Valued in the Engineering Organization

This may seem like a surprising aspect to consider in determining how a given engineering team performs, but I think it is one of the most overlooked pieces of information. Even when you are interviewing with an organization, pay attention to what the interviewers seem to consider great achievements their organization has made. Note that none of these are either good or bad. Each should be valued to some extent, and we should take care not to go to extremes on any of them. Because when that happens, we create an imbalanced culture that has blind spots to its own weaknesses.

### Amount or Impact of Product Features the Team Developed

Organizations that score themselves based on the product features they deliver tend to be very lean and delivery-driven. Engineering quality will often take a backseat and be only talked about in the context of how much it makes it easier to deliver the next product features.

### The Depth of Knowledge and Experience in the Product

This one surprised me when I first encountered it. But there are some organizations where the arcane knowledge of the product is what is valued. Usually, this happens because of a poor knowledge-sharing culture and high attrition. A product that contains lots of surprises in its design causes everyone to be cautious in making changes. Deep product knowledge becomes more valuable because the barrier to understanding and changing the product is high.

### Engineering Prowess and Innovativeness

This tends to be the case for some of the larger tech-focused businesses. The ones that pride themselves on their ability to hire the best of the best tend to have a great respect for engineering prowess and innovativeness. This can be good, but it can also lead to engineers working on shiny new tech for vanity projects. The organizations should always be on guard against this tendency.

## Final Thoughts

As I have mentioned before, this post is mostly based on my experiences and the discussions I have had with others in the industry. While I am generalizing here based on anecdotal evidence, I think there are strong correlations between what I have seen and what I am arguing here. At the end of the day, human nature and incentives are likely to create the outcomes I have described above. However, if you believe I have misrepresented something here or if you have had very different experiences, please reach out to me on [LinkedIn](https://www.linkedin.com/in/osadalakmal/).

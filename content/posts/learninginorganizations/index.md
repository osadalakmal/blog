---
title: "Learning In Engineering Organizations"
date: 2021-09-25T11:00:50+05:30
draft: false
image: "img/learning-in-orgs.jpg"
author: "Osada Paranaliyanage"
description: "Discussion about learning in organization. We go over why learning matters, how to do it in large organizations and what tools you can use to do it effectively"
theme: "full"
tags: [learning,organizations,knowledge]
categories: [learning]

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
# Learning In Engineering Organizations

## Learning in Organizations

!["The Learning Organization: A Lit Review" by giulia.forsythe licensed under CC BY 2.0](https://live.staticflickr.com/1815/42907807575_553abc078d_b.jpg)

In almost all organizations that I have been part of since I graduated there have come a time when we had to teach something to the whole team. This may have been my own team, a team I managed or a team I interacted with. But something I have seen most of the time is the inability or the disinclination to do the learning in a structured way. Most teams would not, given the chance jump at the oppertunity to make sure they make the best of the situation. In my opinion this is one of the worst mistakes leaders and teams make in their journey.

Learning something in the workplace is an interesting experience. The workplace is not exactly the school, university or an opperatunity for earning continouing professesional development points. Most of the time our activitities are arranged so that we all work towards the company mission and the goals. Now learning something new doesnt directly impact the bottom line but that doesn't need to be the sole goal here. Learning pays dividends later down the road so it's effects are felt with a delay which makes evaluating the effectiveness of such activitities an interesting experience. However if we are to have a efficient and impactful learning experience we should definitely measure it's effectiveness. After all we do know that the best kind of organizations are the ones that are [data driven](https://hbr.org/2020/02/10-steps-to-creating-a-data-driven-culture).

## Why Learning Matters for Organizations

Learning as a specific need may not be critical for some roles within an organizations. Manual labor tasks that are repetitive doesnt exactly need a currculum of material to be dispensed every month. But most of the modern orgnizational personal do need to keep up with the pace of technology, economy, state of industry and various other forces that the orgnization interacts with. And if they are to understand and make use of those interactions to benefit the company, they need to be up to speed on all of these things. Thats where organizational learning come in to play.

Most of the time the easy way out is to just hire the talent or knowledge you lack. But this can be a very costly affair. Multiple anecdotes have definitely shown me that hiring specific talent can be a very time consuming and costly endevour. So in most cases it might be easier to just build that knowledge in house.

## How to learn in Big Organizations

I have worked at larger oraganizations for the most part of my carrer. And there are multitutdes of benefits for working in such companies. But there are also
[many things that inhibit chances for learning at large oraganizations](https://learn.filtered.com/thoughts/learning-at-big-companies). So you have to be aware of these limitations and then overcome them in order for you to be successful. There are reasons to do with management and incentives but they again deserve their own blog post.

Lets talk about tooling for learning. The good thing about larger oraganizations is that they have cash to burn. There are boxes to be ticked and systems to be put in place - no one will bat an eyelid when you ask for a chat app or a documentation server. Here are some of the tooling you can leverage to make it easier for employees to learn.

### Corporate Knowledge Systems.

![](img/kms-infographic.png)

Most of the time employees are going to be looking for information on common problems and they will just turn to google/stackoverflow/quora. But there will be some cases where there is no publicy available information on the particular problem. This may be due to legacy systems that are not publicly known or due to particular tech stacks used within the company. Whatever the reason, the chances are the bigger the organization, the higher the probability of someone else in the company of having faced the same situation. And having the good, modern, efficient knowledge sharing system is cruicial to leveraging this knowledge. This is how you avoid those moments of "Oh, wow. We already fixed that. Should have asked first!". There are a plethora of products in the market these days for knowledge sharing systems so it helps to do some research beforehand to understand your organizations requirements and how to fulfill them. The good news is there are a lot of material on how to select these systems as well such as [this article by deloitte](https://www2.deloitte.com/us/en/insights/focus/technology-and-the-future-of-work/organizational-knowledge-management.html).


### Index, tag and disseminate


Use technology to index and automatically tag content. With todays deeep learning ML models and NLP processing, this has never been easier. Then use the knowledge system platforms you have built to share this content with the wider audiences. An example might be how one development team overcomes a certain issue with a legacy system the company is using - maybe your companies legacy relational DB cant add read replicas without huge costs and a team figured out how to get around this using CDC feeds. Now an intelligent knowledge sharing system will tag these with replication, relational and CDC tags and the next time another team is looking for a relation db replication solution that result will automatically come up.

### Automate with APIs

[API Economy](https://www.mulesoft.com/resources/api/what-is-an-api-economy) is here to stay. Everything should be an API in today's company culture. And that is a good thing. It being transparency to envrironments and allows us to leverage the API for automation and integration. There are a number of tools any developement/engineering team will use in their day to day life - an issue tracker (Jira/Trello), a chat program (Slack/Teams), a code repo (github/gitlab). Each of these products expose an API interface to the outside world. This is how you make sure tools work together to capture information and knowledge that would otherwise be lost. Certain channels/chat rooms can be created to allow people to share knowledge and ask questions. These can in turn be digested by an indexer and made searchable. Make it easier to search and find things. You can even use tools such [zapier](https://zapier.com/) and [Power Automate](https://powerautomate.microsoft.com/en-us/) to make things work together. These can be the glue you need. For example you can create a poll in TEAMs chat to get feedback and this is much more effective than a seperate email sending a link to a survey. These results can then we summarized by a tool such as power automate and you can thank the participants via the same tool. 

### Chat your way to knowledge

Realtime chat tooling is now everywhere. And as ubiquitous as they are we are definitely not using them to the full potential. As seen above we can definitely add more features on top of them. Even before that, allowing them to work alongside or closer to actual content we work with is a very effective way to leverage these tools. [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software) is a leader in this space. Many applications can be embedded in the chat program itself and it is very easy to switch from editing a file collaboratively to chatting about it to another stakeholder and back. This is a topic deserving it's own post so expect one in the near future.

### Newsletters and Blogs

Have an organizational newsletter and blog set. You will be surprised at how effective this will be. RSS never really stopped working - blogs are still surprisingly effective in communicating structured technical knowledge. They also let influencers and power shareers natuarally access a platform that lets them reach a wider audience. This is very effective as this is ground up content so will actually be useful information for folks on the ground, in the trenches. 



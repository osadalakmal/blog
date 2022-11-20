---
title: "Review of 12 Factor Principles"
date: 2022-07-17T16:38:17+0530
draft: true
image: saas-description.png
author: Osada Paranaliyanage
description: What are the 12 factors of Good SAAs apps. How does ot sand today.
theme: full
tags: [software, architecture, 12factor, software-engineering]
categories: [architecture]
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

> Legacy of Heroku and App Deployment

{{< table_of_contents >}}

## 12 Factor App and Its legacy?

.

### What is 12 Factor App?

The 12 factor app is a concept introduced by a manifesto style document at [https://12factor.net/](https://12factor.net/) that attempts to codify how a good SaaS software solution should work. The full details are at that web address but basically they declare some properties as the desireable aspects of a solution in the SaaS era and then descrive a 12 factor process that allows teams to achieve that.

### Who wrote this and why ?

The most important thing to know is that this document was mostly created by folks who were involved with Heroku at the time. You have to understand that for it's time, Heroku was a revolutionary product. Coinciding with the rise of rails in popularity, it made great strides in public web app platform space. In fact until AWS came along and started offering a variety of public cloud services, Heroku was the biggest name in public cloud space. And it was very user friendly and intuitive to boot.

The importance of the ergonically clean workflow that heroku enabled cannot be overstated here - They were probably one of the better known companies to enable 'git push to production' workflows. More history on Heroku can be found in this [blog post](https://leerob.io/blog/heroku). And if you look at hacker news archives you will find tons and tons of nostalgic hackers who started out hacking RoR apps on heroku and got their entry in to the industry from there.

Now you understand why Heroku folks had to publish this manifesto. The web development had come out of the dot com bust, bloodied and bruised. The tools of choice were PHP or Classic ASP for backend programming. And frontend design was a nightmaris quagmire of PSD files, singe pixel images and HTML tables. Emergence of RoR was changing all this out of underneath the developers. jQuery was just starting out and Angular and it's ilk were just a couple of years away.

This change in development tooling and practices were also bringing in changes in the related areas of the deployment and release procedures. The Web was becoming the biggest medium of delivery for new apps and people needed a new way to deploy these things fast and easily. Hobbyists and hackers needed a way to go from zero to proof of concept to live site in a matter of hours. And this is when heroku comes in to the picture.

Heroku needed a way to get developers to understand the new ways of deployment they were creating and come up with applications and web pages that would play nicely with the workflows Heroky insisted on having. 12 factor app document was a great way to achieve that. It laid out clearly and conciously what attributed application developers should focus on to enable faster deployment and scalable architectures.

### So what has changed since then?

Well a lot has changed since then

* 2012 - Google Spanner paper is released
* 2013 - Docker is released
* 2014 - Kubernetes is released
* 2014 - AWS Lambda is released
* 2014 - ChatOps started gaining traction
* 2014 - AWS Aurora is released
* 2021 - New Heroku lookalikes like fly.io are released

Back in the late 200s when heroku was getting started containers were still a novelty being limited to things like IllumOS and FreeBSD. Docker changed all of that and made developers aware that they can take a single unit of release and move that with all the dependencies from dev to prod at the execution of a single command.

Kubernetes accelerated the move the platforms where hetrogenous applications could be deployed easily and manged entirely by a single team. And Lamda started popularizing the fabuoulously misnamed "serverless" architectures. Github started the chat ops movement giving dev ops another tool in their toolbox to make sense of the increasingly complex application deployment processes.

And now platforms like fly.io are starting to emerge as heirs to heroku's legacy. They aim to add newer capabilities that developers have started caring about since the introduction of Heroku to the tried and tested friction free workflow that Heroku introduced. For example fly.io is concentrating on edge deployments.

But let's take a bit of detour to understand what these things and are why they are important

#### Abstractions all the way down. K8s, Containers and Computing at scale

Nowadays K8s have become the top buzzword at all the enterprise technology forums. Rightly or wrongly everyone wants to get on the bandwagon. You may or may not think this is justified and in 90% of the cases, it would not be justified. But there is a reason that kubernetes is taking the enterprise world by storm. Tech teams the world over need a way to deploy and manage hetrogenous applications on a shared worker pool on top of public cloud resources. They need to do this in a uniform mannter and do it fast. Having Google as the main backer has not hurt K8s much either. CNCF actually seems to be a good steward for the project as well.

The good thing is that this is making the application deployment a bit more democratized again. Of course there will be managed services and the like that gets deployed outside this common compute pool. But the more the company can stuff in to this pool, the more leeway they have when it comes to migration

#### What exactly is Serverless and why is it sorely misnamed?

One of the most common things for Computer Science snobs to turn their nose up is regarding the term Serverless. Understandably the term really does not make much sense - If there are no servers, where exactly would we run our compute workloads? But more significant is the use of such services to deploy a large amount of compute workloads in a typical enterprise setting. Whenever we are not sure of the work load, or when we do actually know the invocations to be limited and small enough, any solution architect will reach out for FaaS products becasuse it make economical sense as well as technical sense due to lesser burden on maintainance.

Serverless usually means Function as a Service in most of the cases, specially in the context of AWS Lambda. There are many other forms of serverless infrastructure - services that enable running of containers without worrying about the host server for example AWS ECS. These all have the same characteristic though. The only thing you specify is how your workload should be run and the infrastructure will figure out how to achieve that. This focus on making the application the focal point is not without it's drawbacks. It will be more economical and efficient to run the workloads in your own computing infrasutrcture almost always.

### How have the apps evolved since the inception of 12 Factor App?

The web is no longer the king. The tug of war between web and app worlds are still on going but what is clear is that the late 2010s view that Web will be the definitive platform for delivery of applications has not panned out. There is a certain app first mentality that has permeated the developer landscape since the hey day of Web. This means that most of the time the web is a bit of an after thought and has to share the compute backend with mobile for the most part

The clients have evolved to have significantly high compute power. Since the moores law went out the window, the servers and the personal computers have been getting closer and closer to each other in terms of computing power. Current crop of mobile processors and desktop processors have ridiculous power compared to just a decade ago. This has seen a move back to embedding logic on the frontend again. Frameworks from React, Ember to Angular and concepts like JAMStack and SPAs

#### SPAs, SSR and Live View

This does not mean that Server side rendering has died out. On the contrary it is being reinforced with newer technologies like Phoenix and Live view. Phoenix LiveView is new library which enables rich, real-time user experiences with server-rendered HTML. LiveView powered applications are stateful on the server with bidirectional communication via WebSockets, offering a vastly simplified programming model compared to JavaScript alternatives. The fact that this is based on Elixer, a newer language has maybe delayed and limited the exposure of this particular solution.

But the pushback is there to bring the rendering back to the server and in some cases it will be justified. Discussing the merits of Server Side Rendering vs Client Side Rendering is out of scope for this blog post. But suffice to say that the pendulum had swung to client side so much that there is now momentum building for a push back. The technologies involved try to make the server side rendering as efficient as possible through technologies like websockets so that we can just reuse an established socket connection unlike in the bad past where a completly new page request would be required if you were not very care in SSR implementation.

#### Geographically distributed database

Another interesting development is geographically distributed databases. These can replicate data safely across multiple geographically disparate regions unlike traditional RDBMS or NoSQL data bases where as ping times increase the replication protocols fall apart. This allows the application developers to _almost_ pretend that they are talking to a local zone hosted database whereas in truth the database is distributed across multiple continents.

And for the most part they tend to take care of their own failover and high availability protocols on their own. For example AWS Aurora actually runs a common backend for storage that is completely unrelated to the wire protocol the frontend talks weather that be MySQL or PostgreSQL. And they tend to be easy to maintain since mostly they are managed services

#### Compiled languages strike back

And the focus is right now mostly back on compiled languages. From the late 2000s hey day interpreted languages with loose type systems  have fallen out of favor now. Back then PHP, RoR and Python were probably the most popular languages. Now the focus has switched mostly back to Kotlin, C# and Golang which are compiled languages with strict typing.

#### Away from the web. On to the apps

And as the final trend, as mentioned before the focus is more on apps. There are a lot of teams out there that are looking for solutions that will enable them to reuse the bakend developed for the mobile app for the web page as well. This has implications in that app stores are closed off ecosystems and deployments are now gated by gatekeepers that are not accountable to you.

#### So what does it all mean?

### Picking up the mantle. New contenders for the title of new Heroku

#### No Ops Movement

#### fly.io

.

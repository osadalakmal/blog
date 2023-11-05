---
title: "Lies, Damn Lies and Engineering Metrics"
date: 2023-10-31T21:18:00Z
draft: false
image: "banner.jpg"
author: "Osada Paranaliyanage"
description: "We discuss what engineering metrics are, what function they perform, why they are important. We also discuss why Engineering teams do not usually trust them."
theme: "full"
tags: [engineering-excellence, engineering-leadership, engineering-metrics]
categories: [engineering-leadership]

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

## TL;DR Summary:

In the world of engineering, metrics are critical for evaluating performance and progress. But relying on subjective views and opinions can lead to flawed assessments. To determine the effectiveness of engineering practices, we need unbiased and objective metrics. The choice of metrics depends on an organization's specific goals. Metrics should be automated, transparent, and integrated into the culture. Avoid using easily gamed or individual-level metrics. The post also explores DORA and SPACE metrics and emphasizes that there is no one-size-fits-all solution in engineering metrics.

## How Do We Know We're Good?

In engineering, a discipline underpinned by the scientific method, it seems we should always seek validation of our progress using scientific methods. However, in many engineering teams I've encountered, there is a propensity to rely on phrases like "I feel like," "I think," and "My point of view is." Such subjective views, unconscious biases, and preconceived opinions can skew measurements.

Presuming that the goal of an engineering management structure is to enable the formation and maintenance of high-performance teams, we need to ask how we will recognize a high-performing team. Some aspects can be measured manually, such as team health and team happiness, through surveys and one-on-one meetings. However, the measurement of the effectiveness of engineering practices requires unbiased and objective metrics. These metrics are the only way we can truly know if our engineering practices are achieving the goals we set out to accomplish.

Now, whenever metrics are mentioned people tend to get skeptical and usually with good cause. After all as the title alludes to statistics and metrics have been used to dubious effect since they were invented. You may have heard any number of horror stories regarding the misuse of these. However it does not have to be that bad necessarily. Used with prudence these can provide a huge benefit to any software engineering team. That prudence is what I am setting out to put in to words in this blog post.

## Do We Agree on What "Blue" Is?

A meme that originated on Reddit comes to mind. It featured a dress found in a charity or second-hand shop. What made it notable was the debate surrounding its color. The poster thought it was blue, but a significant number of replies argued it was gold. This seemingly simple question, "Do we all agree on what blue is?" led to a divisive dispute. It may seem strange that a seemingly straightforward matter could be so divisive. After all, defining "blue" isn't a complex concept; even a preschooler could define it confidently.

{{< figure src="The_dress_blueblackwhitegold.jpg" title="The controversial dress in question" link="https://en.wikipedia.org/wiki/The_dress">}}

This story illustrates how challenging it is to reach a consensus, even on straightforward matters, within a group. Now, imagine trying to measure things like software engineering team or organizational performance and achieve a consensus within your entire organization on whether engineering is doing a good job or not. Let's heed the lesson of the blue/gold dress people!

## What Do We Want to Measure, Anyway?

Before defining the exact metrics, let's consider what qualities of teams we want to measure. While this question seems straightforward, it's fraught with perils for those attempting to answer it. The most important thing to understand is that this is likely to vary from one organization to another. Like many of the best answers, the answer to this question is "it depends." The main point to keep in mind is to consider the needs of your business. Unless you're working on a hobby project, any organization, whether it's a business or not, will have goals. Your software engineering team does not operate in isolation but supports the organization's goals. 

For example, if you're working in a charity organization helping vulnerable women in the community, your goals for your systems might include:

1. Ease of use and accessibility
2. Security and confidentiality
3. Availability

These are top priorities because you serve vulnerable individuals who need help promptly, securely, and without unnecessary effort. Security is paramount because their personal data is stored in the systems, and lives may be at stake. Availability is crucial because helping people is not an optional service; it's a critical service.

However, if you're working for an e-commerce startup in private beta, your goals might be different:

1. Team velocity
2. Bug leakage
3. Website performance

Your priorities are to ship features quickly and make them fast at any cost. Your company's survival depends on emerging from stealth mode as swiftly as possible.

## From Objectives to Metrics

In the business world, you've probably heard of OKRs (Objectives and Key Results). OKRs function similarly. You identify the areas you want your development team to focus on and select representative metrics that signify your work in those areas. Selecting these metrics is as much an art as a science. There are numerous courses available, from LinkedIn Learning and Coursera to Udemy and elsewhere. However, I can offer a couple of pointers specific to the software world.

- **Do Not Select Metrics Directly Correlated with Development Actions**

    This should be obvious given all the horror stories circulating in the community regarding metrics such as lines of code or bugs closed. Elon Musk famously touted lines of code committed as a measure of developer productivity and was roundly ridiculed for it, quite rightly. [Here](https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html) is an essay where another developer talks about a colleague who was the least productive under this metric. The problem here is selecting a simple one-to-one correlation metric, which will contain all the noise and gaming that can occur in the real world.

- **Do Not Select Individual-Level Metrics**

    Select metrics that you can collectively hold a team responsible for. After all, your goal is to build high-performing teams, not high-performing individuals. There will always be individuals, like in the essay above, who may not directly work on something, but without them, the team would fall far short of the metrics being measured. This would be unfair to those individuals.

- **Do Not Choose Targets and Metrics**

    This departs from the central idea in key results. For key results in OKRs, they are clearly targets to be achieved. However, the problem with targets in the engineering domain is that any metric that becomes a target will end up being gamed. This most famously happens with unit testing coverage metrics. There have been numerous cases of people writing nonsensical "unit tests" that do not test anything but call all the functions they can fit in so that the coverage target can be gamed. The only effect of this is to increase the amount of code you have to change every time you modify an interface. So, please do not do this.

## What Gets Measured Gets Done

To measure the chosen metrics, you'll need to put automated facilities in place. Unless the input is human-dependent, it should always be automated. These metrics should:

1. Be simple to calculate
2. Be always available
3. Be transparent
4. Be easily verifiable

The rationale behind these requirements should be self-evident by now. Without these qualities, you cannot create a pervasive metric-driven culture.

### People Need to Know the Metrics

This information should be easily accessible. It should be included in as many documents as possible, from onboarding documentation for newcomers to the main page of your chosen Wiki or documentation site, be it Confluence, SharePoint, or Asana. There should be no doubt in anyone's mind regarding where to find the metrics.

### People Need to Talk in Terms of Metrics

Ensure that team members, managers, and even senior leaders speak the language of the metrics. They should bring up metrics whenever discussions about team performance arise. Make sure to incorporate metrics into the conversation if someone uses softer language that doesn't explicitly reference relevant metrics. For example:

Senior Manager: "I've seen that the backend team for the app has done a marvelous job in managing the infrastructure and keeping the app available."
You, as a Team Lead: "Absolutely, Jeff, and all the credit should go to my wonderful team who worked diligently to maintain our availability metric at 99.995%, exceeding the target availability of 99.99%. Great work, team!"

Don't correct people but add this as a clarification or elaboration. This is crucial because you want people to ultimately think in terms of the language of the metrics. You want them to think not "What will happen if we improve our app's performance?" but "What will happen if we improve the response time for the main app to an average of 150ms from 200ms."

### The measurements have to be transparent, public and IN YOUR FACE

The more pervasive the metric is, the stronger it get's ingrained to peoples minds. I worked in one organization where there was only one metric that mattered. And that metric was everywhere. It was on any number of TV screens scattered across the office. It was on the login screen some days. All big meetings started with that number and the causes of that. The bonus was directly linked to that. There was no ambiguity in where the number came from, what value it had at any given point.

Same applies to engineering metrics have a single live dashboard where the metric gets displayed and updated in real time. And make sure it is prominently visible in whatever work environment you have. Obviously this will change according if your organization is office based, hybrid or remote only. Whatever the format, make sure that this information is easily accessible.

## Examples

This is something I have put together in the past in some of the organizations I have worked with. This mostly emphasizes devops, delivery, and performance metrics. The nature of the business was a mobile application serving a large amount of data. The team was starting to get around to doing their own devops, so this was a big part of the spotlight. Also, we were under tight deadlines to deliver the project, so delivery metrics were crucial. The performance was the biggest ask from the product team, so we added a metric for that as well.

- Objectives
  - Excel at implementing devops practices within the team
  - Delivering the project under the agreed deadlines
  - Maintain the response times for the app under 300ms

- Metrics
  - Lead time for change
  - Deployment frequency
  - Bug leakage
  - Team delivery velocity
  - Mean response time on the homepage

We got the sign-off from the project team and then the management for the metrics and created a dashboard containing real-time tracking for the above metrics. The team knew where they stood as well as management and the business.

## What About DORA or SPACE?

A final note about [DORA](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance) (DevOps Research and Assessment) and SPACE. DORA metrics represent Deployment Frequency (DF), Lead Time for Changes (LT), Time to Restore Service (TRS), and Change Failure Rate (CFR). DORA metrics are widely used to assess the performance of DevOps and Continuous Delivery practices. First of all, the team you are in may not even practice DevOps. And even if you do, you may not want those DORA metrics to be a component of the full team's metric set. You can and should probably use DORA metrics for evaluating your DevOps team's performance if you have such a team. But that does not mean the full organization should be measured on it or that it should form the full criteria upon which you measure the performance of the team.

SPACE is an emerging framework aimed at evaluating the competencies within software development teams. It stands for Satisfaction & Well-Being, Performance, Activity, Collaboration & Communication, and Efficiency & Flow. SPACE is designed to optimize the team's capabilities and well-being. It looks beyond technical processes to include 'soft' factors like team morale, communication, and overall well-being. Again, it is a good measure if your goal is to create an environment where your teams thrive, innovate, and grow. But it may not directly correspond to business requirements.

The conclusion in both cases is the same as what Fred Brooks said in his seminal work, ["The Mythical Man-Month"](https://en.wikipedia.org/wiki/The_Mythical_Man-Month), there is no silver bullet. There is no one solution that will work in all situations for all teams. Choose the right tool for the job and ignore the current hype.

---
title: "Broken Window Theory in Software Teams"
date: 2023-09-03T10:51:19+01:00
draft: true
image: "broken-windows.jpg"
author: "Osada Paranaliyanage"
description: "Broken Window theory says broken windows in a neighborhood leads to more crime. What does this mean for software engineering culture."
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

## Broken Window Theory - Origins

The Broken Windows Theory emerged in the early 1980s as a response to the rising concerns about crime and urban decay in American cities. James Q. Wilson, a prominent social scientist, and George L. Kelling, a criminologist, co-authored an article titled "Broken Windows: The Police and Neighborhood Safety," which was published in the Atlantic Monthly in 1982.

### Key Concepts

1. Visible Signs of Disorder: Wilson and Kelling proposed that visible signs of disorder in neighborhoods, such as broken windows, graffiti, or litter, create an environment that fosters crime. They argued that when one broken window in a building goes unrepaired, it sends a signal that no one cares about the area, leading to more windows breaking and an overall sense of neglect.
2. Quality-of-Life Policing: The authors advocated for a shift in policing strategies from solely focusing on serious crimes to addressing low-level offenses and maintaining order in communities. They emphasized that addressing minor infractions and maintaining a sense of order would prevent the emergence of more serious criminal behavior.

### Practical Application

The practical application of the Broken Windows Theory led to significant changes in law enforcement and community policing:

1. Community Policing: Police departments began adopting community policing strategies, which involved officers engaging with the community, building relationships, and addressing quality-of-life issues. This approach aimed to create a sense of partnership between law enforcement and residents.

2. Crime Mapping and Data Analysis: Law enforcement agencies started using data analysis and crime mapping to identify areas with high levels of disorder and crime. This allowed them to allocate resources more effectively and target specific problem areas.

3. Community Engagement: Beyond law enforcement, the Broken Windows Theory inspired community organizations and local governments to take an active role in neighborhood revitalization. Cleanup initiatives, graffiti removal programs, and neighborhood watch groups aimed to address visible signs of disorder.

Note that there were other practices that took inspiration from this theory ( such as zero tolerance policies ). I do not discuss them as I do not believe they resulted in a net positive for the society. If anything blanket policies like that has a disproportionate impact on the minorities and exacerbates problems. Therefore we will discuss what we believe are the policies that actually made a difference here.

### Impact and Controversies:

While there were clear benefits where this theory was applied, the practical application of the Broken Windows Theory has been both praised and criticized. While some attribute reductions in crime rates to its implementation, others argue that it can lead to over-policing and the criminalization of minor offenses, disproportionately affecting marginalized communities. Additionally, the theory's effectiveness in addressing serious crime remains a subject of debate. Having said all of that we can all agree I think that intuitively this idea holds water.

## Software Engineering as a Social Endeavour

What does all of this sociological theories have to do with software engineering you say? Well, unruliness have the same effect on software engineering systems. Think of it this way, if your technical estate is a street, then missing unit tests, no consistent styling, and other little things that may correspond to a broken window. And these indicate to your team that you no longer really care about these things. This means the team values, however you may have promoted them before, no longer really applies and are no longer important to the team's management.

Signaling within a team refers to the deliberate actions and behaviors of leaders that convey their intentions, values, and expectations to team members. These signals are pivotal in influencing team dynamics and guiding individual behavior. Leaders employ both explicit and implicit forms of communication. Explicitly, leaders use clear verbal communication to articulate their objectives, mission, and guidelines. Implicitly, their actions and decisions send strong signals. For example, a leader who consistently exhibits dedication and punctuality sets a precedent for the team. Leadership signals extend to decision-making. Choices regarding resource allocation or project priorities convey the leader's priorities and strategic direction, directly affecting team perceptions.

When the signalling within the team indicates implicitly by the way of no resource allocation to addressing _"broken windows"_ or explicitly by dictating that _"broken windows"_ are too unimportant to address, the leadership seems to communicate that these are not pivotal to the engineering standards of a team. That in turn leads the team to read in between the lines and doubt where exactly then is the proverbial line in the sand? How much can they let the engineering standards lax before the leadership holds them to account?

## So what exactly is a broken window in a Software Engineering Team then?

And this is the most important point - you need to communicate the expectation to the team. Lack of standard for the one Rust program within the full Java based technical estate does not constitute a _"broken window"_. Consistency in communication and expectation setting matters a lot here. If your team's primary language is C# and you do not have a style guide for it, then there is potential for trouble. If people apply different rules in different contexts leading to inconsistency and you do not intervene, then it becomes a _"broken window"_. There is no hard and fast rule here I think. Use your judgement for the most part but simple few criteria should help you out for the most part

1. Does the issue in question apply broadly across your technical estate? If so it probably is significant enough
2. Had you previously communicated that the issue in hand is important enough to have a team-wide consensus?
3. Is the excellence or following the best practice in the aspect in question a priority for your wider organization? If so, yes it probably will be a _"broken window"_.

## Why you should care as a Software Engineering Manager?

There are lots of reasons I can list but the following would probably be the top of the list

1. Cultural Significance: Just as the Broken Window Theory suggests that neglecting visible signs of disorder can create a culture of apathy, allowing cosmetic issues to persist in a codebase or development process can set a precedent for a lack of attention to detail. Over time, this can erode the team's commitment to engineering excellence and high standards.

2. Attention to Detail: Software engineering thrives on precision and meticulous attention to detail. Addressing cosmetic issues demonstrates a commitment to getting the small things right. It sends a message that the team values craftsmanship and is dedicated to delivering high-quality software.

3. Preventing Technical Debt: Cosmetic issues, if left unaddressed, can accumulate and contribute to technical debt. Technical debt refers to the cost of fixing issues and improving code quality that accrues over time when shortcuts are taken or issues are ignored. By tackling visible but cosmetic issues early, teams can prevent the accumulation of technical debt and maintain a codebase that is easier to maintain and extend.

4. Code Quality and Maintainability: Cosmetic issues, such as inconsistent formatting or poor documentation, can make code less readable and maintainable. This can slow down development and increase the likelihood of introducing bugs during future changes. By addressing these issues, teams ensure that the codebase remains clean, comprehensible, and easier to work with.

5. Enhancing Collaboration: Clear and well-maintained code fosters effective collaboration among team members. When everyone can easily understand and work with the code, it reduces the risk of misunderstandings and conflicts. It also allows for smoother code reviews and knowledge sharing.

6. Professionalism and Customer Perception: Software engineering is a professional discipline, and professionalism extends to the quality of the work produced. Visible cosmetic issues can detract from the professional image of the team and the organization as a whole. Additionally, customers and end-users often judge software quality by its visible aspects, such as user interface design and consistency.

7. Continuous Improvement: Addressing cosmetic issues is an integral part of a culture of continuous improvement. Teams that are committed to excellence understand that improvement starts with the small details. By consistently addressing these details, teams set themselves up for a cycle of improvement that extends to all aspects of their work.

As you can see I may have stolen some talking points from the agile manifesto there. This is not an oversight - I truly do believe in agile teams it is very important that we keep up the engineering excellence lest we lose sight of the trees for the forest and sacrifice technical excellence for business value.

## Summary

Addressing visible but cosmetic issues is not merely about aesthetics; it's about maintaining a culture of engineering excellence, professionalism, and continuous improvement within a software engineering team. By valuing and addressing these issues, teams can prevent the deterioration of code quality, foster collaboration, and ultimately deliver software that meets high standards and exceeds customer expectations.

Note :
{{< rawhtml >}}
Photo by <a href="https://unsplash.com/@christopherphigh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Christopher Paul High</a> on <a href="https://unsplash.com/photos/Iv7x6fmJ8Og?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
{{< /rawhtml >}}
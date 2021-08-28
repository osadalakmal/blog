---
title: "Cloud9 - A cloud based IDE for your code"
date: 2021-03-29T12:33:51+0530
draft: false
---

## Cloud9 - A cloud based IDE for your code

I first heard of cloud9 before it was acquired by AWS in 2016. In those days it was a novelty. But the good sort - the sort of thing you think of and say "Man, if only I had that sort of flexibility". This was before Google docs was a widespread thing and collaborating on a cloud IDE that existed independently of your computer was unheard of. Everytime I wanted to send some code snippet to a coworker and they needed more context, I would think to myself, there has to be a better way to do this.

Cloud9 was originally founded in 2010 and created the open source product. This was then acquired by Amazon and turned in to their own offering of a cloud IDE running on EC2.

### Provisioning a developer environment

The IDE itself is actually free. What you pay for is the environment that it runs on. Lets see how to provision one of these. Go to cloud9 on the management console and start spinning up an environment and you are presented with the initial screen.
![](/img/cloud9-1.png)

After that you get to choose the environment that you run the cloud9 IDE on. I am of course choosing a t2.micro so that I can use the free tier for it.
![](/img/cloud9-2.png)

Finally you get to review and approve the request.
![](/img/cloud9-3.png)


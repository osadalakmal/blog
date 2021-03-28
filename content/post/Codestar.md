---
title: "Codestar - A new way to get started on AWS Projects"
date: 2021-03-28T20:08:50+05:30
draft: true
---

## Codestar - A new approach to development on AWS

Codestar is a relatively new approach to creating new application that run on AWS infrastructure. The interesting thing about this seems to be that it gives newbie developers like myself to get bootstrapped and go from zero to hundred in a relatively short time period.

![InitialScreen](/img/codestar-1.png)

This is the initial screen shown when you first try to create a codestar project. There are several options to choose from but it is mostly elastic beanstalk and lambda focused. I selected golan based lambda project.

![SecondScreen](/img/codestar-2.png)

Then you get to choose a project ID and a project name. Simple enough!. Then comes the choice of where to host the project repository. For now only [AWS codecommit](https://aws.amazon.com/codecommit/) and [github](https://github.com) are supported.

![ThirdScreen](/img/codestar-3.png)

I chose github as the hosting option since I only wanted to try one new thing at a time. After going through the usual permission windows, it creates the initial project.

![FourthScreen](/img/codestar-4.png)

The final review screen before things are created fully.

![FifthScreen](/img/codestar-5.png)

And these are all the different resources that are created by the codestar tool. Looking at that list there are several different things that you may be hard pressed to get right if you were doing this by hand. Considering the whole process took me less than 2 mins to complete, this seems like a no brainer to use.

![CodeBuild](/img/codebuild-1.png)

This is my first time seeing AWS CodeBuild and it seems usable enough and easy enough to navigate for even a first timer like me. I have been an avid user of Jenkins and CircleCI for the most part of my carrer. Lately I have been toying around with Gitlab and Github built in automation frameworks. Compared to them Codebuild does seem to have a lot more room for growth. But it seems promising enough to warrent a post of its own.

![CodeDeploy](/img/codedeploy-1.png)

Codedeploy is probably the one part of the puzzle that I took the least effort to review. It seems to be handling the deployment ok and I stopped looking at it after that cursory glance. Hopefully I can correct that in my next post about CodeBuild and CodeDeploy.

![CodePipeline](/img/codepipeline-1.png)

And together CodeBuild and CodeDeploy form CodePipeline. The CI/CD solution on AWS. Again compared to something like Jenkins it seems to leave a lot to desire but for the task at hand it seems to work pretty well. And best of all I didnt have to create any of it!

So there it is. The application was created, built and deployed all within the space of a few minutes. Here is a smple REST request

![REST-Codestar](/img/REST-codestar-1.png)

All in all codestar seems like an awesome solution if you are just getting started in AWS solution building like me. It covers a lot of ground and lets you focus on the problem at hand.

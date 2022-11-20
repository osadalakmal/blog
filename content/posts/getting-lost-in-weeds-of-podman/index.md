---
title: "Getting lost in weeds of Podman"
date: 2022-11-07T15:31:29+0530
draft: false
image: "img/podman-logo-full-vert.png"
author: "Osada Paranaliyanage"
description: "Switching to podman in practice. We explore how we can switch to podman in reality and how to make use of rootless containers"
theme: "full"
tags: [docker,virtualization,podman]
categories: [virtualization]

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

{{< table_of_contents >}}

Podman is a tool developed by Redhat that is intended to replace docker at the command line level. It has full compatibility with docker CLI. At least this is true on Linux. Like docker it is written in golang and is quite performant. But unlike docker it does not have a lot of legacy warts, compatibility issues and quirks. It also has better integration with other tools in anything-but-docker space including buildah and skopeo

## What are rootless containers

![How Rootless Containers Work](img/rootless-containers.png)
\
A big selling point of using podman is that you will be able to run rootless containers. This means that the full virtualized container runs as the non-root user that you are logged in as usually. This is important in various aspects. One is that on shared servers where you just don't get to have root, you can still get containers running. Also even on a machine where it is possible to become root for running docker containers, it is good in security point of view to be running as a non-privileged user.

At a more technical level the issue is bugs that enable malicious code to breakout of the virtualization env on to the host. And if it is able to exploit such a bug the attacker suddenly has root access to the host system. Now there are ways to mitigate those risks such as

1. Specifying the USER for each of the Docker CMDs
2. Specifying the USER for the docker RUN command on the command line
3. Using a supervisor framework such as [s6](https://github.com/just-containers/s6-overlay) or [supervisord](https://gdevillele.github.io/engine/admin/using_supervisord/)

But again, these are mitigating measures and not a solution to the underlying issue of running containers as the root user. rootless containers address the root cause by allowing you to run containers as a non privileged user. This means that even if there were to be a breakout, the attacker still would need a privilege escalation bug on the host env to be effective at attacking the host system

### My use case for rootless containers

\
A friend had asked me for advice on best practices in FTPing files around. Now the best advice that I can give is not to FTP files around in 2022 anymore and there are much better data transfer mechanisms out there. But if you had to do it, there are ways to take most of the pain out of it such as using checksums and delta encoding and so on. While I was thinking of writing a blog post on those practices, I needed to write some test code. To test out this code, I needed a FTP server. Now I would rather not put any server on my primary workstation that need not be there and this meant I had to do this inside a docker container.

### But I don't have docker

I had tried to switch to podman sometime back but it was mostly limited to pulling images directly off docker/quay and using them. I had not gotten around to building images with podman or buildah much. But this time I had lucked out and the most commonly used FTP image seemed to lack support for running as a rootless container binding to ports higher than 1024 for the listening port. If you did not know about this - unprivileged users on linux cannot bind to ports lower than 1024 usually as explained [here](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html). There are ways around this for example by using [authbind](https://en.wikipedia.org/wiki/Authbind) to achieve this via a setuid helper executable or using POSIX [capabilities system](https://man7.org/linux/man-pages/man7/capabilities.7.html)

But each of those workarounds come with their own pitfalls, vulnarabilities and risks. Therefore the better way would be to use a non-root user and use a non-standard port. But docker does not usually run in non-root mode. So I switched to podman and I cloned the repo that I had chosen - [docker-vsftpd](https://github.com/fauria/docker-vsftpd) to [here](https://github.com/osadalakmal/podman-vsftpd) and started from there. It was a simple change to add the new port. And add the change to the README. The full pull request is [here](https://github.com/fauria/docker-vsftpd/pull/76)

### Adding finishing touches

I am a bit of a perfectionist and once I had started work on this repo I had to add a couple of finishing touches. The first was an automated build process. I had used github workflows and actions to achieve this. Here is the code for that

{{<github repo="osadalakmal/podman-vsftpd" file=".github/workflows/container_build.yml" lang="yaml" options="linenos=true">}}

Things to note here are the build image action. Note that we are using buildah action to build the image and not docker. This means we keep the pipeline clear of docker even though we will still use docker.io to distribute the image.

Then note the secret mechanism. Github workflows manage secrets injection through envrionment variables as most other CI/CD pipelines do. The actual secret is input at the github settings level. Then it gets injected in to the CI/CD envrionment and is available for use by any action given access to it through the YAML code.

The next to do thing in my list is adding shellcheck support to the CI/CD pipeline. That will be left for another day. But for now I have cleared the shellcheck comments manually. The pull request is [here](https://github.com/osadalakmal/podman-vsftpd/pull/1/files#diff-fc8d3c534affdef352ee2e218f1bf36e45b9991b2b0e0b9f4b844eea147643c5). This mostly involves 

1. Breaking down assignment and export in to two lines. This is a good idea because otherwise they do not individually fail. So you can get a case where the generation of the variable fails but you still won't know because the export worked and the return code was zero

2. Convert backtick escaped sheel command output capturing to "$()" syntax. This is much better and less error prone. This deserves it's own blog post so I will only point to [POSIX spec](https://pubs.opengroup.org/onlinepubs/009695399/utilities/xcu_chap02.html#tag_02_06_03) for now.

3. Quotin variable usage. You never know when spaces in values will trip you up otherwise.

### The preamble becomes the main act

So there you have it. We set out to write about good FTP system practices instead wrote a blog post about how to use podman and shellcheck. The next one I promise will be on topic!

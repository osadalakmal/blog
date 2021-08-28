---
title: "Not your grandmas' docker - Part 2"
date: 2021-08-26T10:00:50+05:30
draft: false
image: img/container-arial.jpg
author: Osada Paranaliyanage
description: We discuss container tooling beyond docker. Runtime engines, container build, deployment and registry tooling
theme: full
tags: [docker,virtualization,buildah]
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

Now that we have discussed the basics of containers, lets dive in to the details. Modern container tooling goes way beyond simply running an OS image in a separate context.

## Components of the container ecosystem

![Container Ecosystem](img/DockerEcosystem.png)

### Container Engines

A container engine will run a container given the user input to do so. You can customize it's behavior through several parameters. Note that it does not necessarily need to know where images are on remote servers and how to get them. In fact it even does not actually run them by itself, usually thats delegated to the container runtime. More on that later. And there are of course proprietary implementations of container engines at various cloud providers.

The basic responsibilities of this layer include

* Using various input to determine runtime behavior of the container (network, storage, etc)
* Decompressing and expanding the container image on disk using a Graph Driver
* Preparing a container mount point, typically on COW (copy on write) storage
* Creating a config.json file with metadata to be passed to the container runtime
* Invoking the Container Runtime

Options for this component include

* [Docker](https://www.docker.com)
* [RKT](https://github.com/rkt/rkt)
* [CRI-O](https://cri-o.io/)
* [LXD](https://linuxcontainers.org/lxd/introduction/#LXD)

### Container Host

The container host is the system that runs the containers. This could be your local machine running an *nix OS, a VM on the same or a VM/baremetal machine on public/private cloud. Once a container image is pulled from a Registry Server to the local container host, it is said to be in the local cache.

### Registry Server

A registry server is essentially a server that is used to store and server docker images from. These are just URIs usually connected to over HTTPS. you would usually use REST API to interact with them.

When a container runtime finds that a container image cannot be found in the local cache, it _can_ invoke a tool to fetch the container image (aka repository) from the registry server. The most well known registry server is docker.io but there are several public alternatives as well as implementations that can be hosted privately for more customization and security. There are also registries that can be reached publicly but only hosts private container images/repositories. Note that these should handled very carefully due to supply chain attacks. It is very important that you think out the consequences of what registries you enable and the security around that.

#### Public container registries

* [DockerHub](https://docker.io)
* [CoreOS Quay](https://quay.io/)

#### Public reachable - private repository registries

* [Elastic Container Registry](https://aws.amazon.com/ecr/)
* [Google Container Registry](https://cloud.google.com/container-registry/)
* [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/)

#### Self hosted registries
* [Docker Trusted Registry](https://docs.docker.com/datacenter/dtr/2.4/guides/)
* [Harbor](https://github.com/vmware/harbor)
* [JFrog Artifactory](https://www.jfrog.com/confluence/display/RTF/Getting+Started+with+Artifactory+as+a+Docker+Registry)

### Container Orchestration

Container usage usually starts with a single developer using a docker image to test out his software and making sure it is working as intended. But once multiple teams and multiple applications get involved, you run in to more facets to consider such as shared networking, storage, monitoring and a whole host of others. This is basically the difference between "run on my machine" vs "should run on production". Shipping these applications to production and running these there involves a lot more scaffolding than just running a single container on a developers machine.

#### Responsibilities of the Container Orchestration System

* Scheduling and running container workloads on top of a resource provisioning system
* Providing networking layer for containers to inter-communicate
* Providing network traffic control
* Service Discovery (optional)
* Providing a standardized system definition file (helm charts, k8s yaml, docker compose etc)

#### Container Orchestration Systems

* [kubernetes](https://kubernetes.io/)
* [mesos + marathon](https://mesosphere.github.io/marathon/)
* [Docker Swarm](https://docs.docker.com/engine/swarm/)

### Container Runtime

A container runtime actually runs the container image that is on disk essentially converting the on-disk container image to a running process set. The Open Containers Initiative (OCI) Runtime Standard reference implementation  is runc. This is the most widely used container runtime, but there are others OCI compliant runtimes. There are various types of them as well. Some are native runtimes that run the container directly on the host. Some are sandboxed runtimes that run either on a kernel proxy layer or a unikernel. And the latest addition to this space is the standardized interface into kubernetes container runtime - Container Runtime Interface. Kubernetes started with docker runtime as the only option for this and as time went by they started to migrate away from the docker dependency. As they did, they introduced CRI as a way to democratizing/virtualizing the runtime tooling. Now there are multiple conforming implementations

#### Responsibilities of the container runtime

* Setting up the container image fs view at the mount point given
* Using the config json to customize the container runtime parameters
* Starting the containerized process using clone or similar syscall
* Setting the isolation and security constructs such as cgroups,  namespace and SELinux


#### Container Runtime Systems

* Open Container Initiative (OCI) Runtimes
  * Native Runtimes
    * runC
    * Railcar
    * Crun
    * rkt
  * Sandboxed and Virtualized Runtimes
    * gviso
    * runV
    * kata-containers
* Container Runtime Interface
  * containerd
  * cri-o

---
title: "Cost Of Allocation in High Performance Systems"
date: 2021-02-05T08:08:50+05:30
draft: false
---

## Impact of unproductive work

In high performance systems we try to make sure we do as little unproductive work as we possible. As Andrei Alexdrascu points out in one of his presentations on the subject, the fastest bit of code is the code that does not run. So it is essential that we try to avoid as much unproductive work as possible.

When we say unproductive work it usually seems we are talking about unwanted calculations, operations, file access and db access. But this goes beyond that - Any operation that does not directly contribute to calculating the output that your application is responsible for is a waste. This includes GC in garbage collected languages, memory allocation and deallocation in languages with manual memory management languages such as C++

## Memory is unessential?

![Surpised Pikachu](https://i.imgflip.com/4wxk03.jpg)

No it is essential. But it is a supporting operation. So try not to do it in the critical path. When you know you need memory, allocate it beforehand and reuse what you can. Try and avoid fragmentation as much as you can. There are several ways to do this.

1. Preallocate enough memory and reuse
2. Use a smart factory pattern that allows object level reuse
3. Use an allocator that reduces cost of memory allocation and deallocation ( eg: [tcmalloc](https://google.github.io/tcmalloc/) )

## In practise

We will use the following code sample to simulate the effect of malloc causing thread contention.

{{< gist osadalakmal e0a3bd5c8f9d27c2de20163fde1c4af9 >}}

This allows us to benchmark the completion time for two threads when they are allocating memory vs when they are not. The following is the result when running on my machine

![system-malloc-perf](/img/perf-with-system-malloc.png)

As can be seen there is a significant slow down when two threads are both running malloc at the same time. You can see that the slow down purely due to malloc when running the same two function calls serially is much less when compared to the slow down in threads. This is because by default malloc has to synchronize across threads due to there being a single allocator for the whole program.

This synchronization causes a delay that exceeds the cost of pure malloc call. Now this can be reduced by using an allocator that performs better in multithreaded applications. One example of this is tcmalloc as explained earlier. Here is the same code running but this time linked against tcmaloc

![system-malloc-perf](/img/perf-with-system-malloc.png)

As can be seen this signiicantly reduces the cost of malloc synchronisations. This is better than using system malloc but still worse than not mallocing at all.

## Takeaways

Memory management is not essential to produce the out of an application. Since it is an auxilary function, try to keep it away from the critical path at all times. Specially when you are running multithreaded workloads where thread contention due to global locks in malloc become a big bottleneck.

You can use better allocator if you absolustely have to do allocation in the critical path to do it more efficiently than system malloc

As always remember to measure. YMMV
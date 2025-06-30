---
title: "Starting With Realtime Data"
date: 2021-11-20T20:15:01+05:30
draft: false
image: realtime-splash.webp
author: Osada Paranaliyanage
description: We discuss how to get started with real time data processing
theme: full
tags: [realtime,kafka,STOMP]
categories: [data]
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

> (or why realtime data is elusive in most organizations)

{{< table_of_contents >}}

## Data, Data and Data

{{< figure src="hand-out-of-water.webp" title="Drowning in Data but Thirsting for Insights" >}}

These days the mantra is always data, data and more data. No organization can apparently get enough of data. And more and more of that data is coming in realtime in streaming systems.

The ubiquity of kafka is proof that these days the real time delivery of data is the norm rather than the exception. But most of the time the processing of this data is being relegated to the usual suspects in the data lake.

Due to the fact that most of the competency in the Data Engineering team usually lies with the batch processing side, they usually consider the real time processing as one of several different things

1. Too expensive
2. Too hard
3. Has no real use case

Now this is not to suggest that these are necessarily untrue - it is harder to process, and probably expensive to do so as well. And half the time the product owners and/or business users have absolutely zero imagination and cannot come up with a decent real time use case even if their lives depended on it.

But the fact remains that once the stars do align, when there is a good use case we end up being unable to execute because we dont really have a lot of experience with the real time streaming systems.

## How to break out of the cycle

As with any other use case or technology that is unfamiliar - you need to break out of the vicious cycle that allows this learned helplessness to persist. I have alluded to this in an earlier post of mine where I discuss conscious learning.

The first thing to do is acquire some practice. The problem with this is that streaming data is really hard to come by in the wild. There are enough big data sets that can be used for pet projects now. Sources like [awesome public datasets](https://github.com/awesomedata/awesome-public-datasets) allow us to do pet projects on batch processing side of the things really easily.

But when it comes to real time streaming data, the story is much more different. Since distributing such data requires significant server power, there aren't servers out in the open internet that will let you subscribe to kafka feeds. So we need to look for alternatives. The easiest way would be to down load a time series data file source in a program that will write that data to a kafka stream. If required it can even modify the timestamps to match.

The other way would be to find a real time data source that is actually publicly available and use that. There aren't that many of them around and they ones that are there are not kafka streams. The protocols for distribution of real time data in these cases tend to be much more varied. There are

1. MQTT - Message Queue Telemetry Protocol is a lightweight pub sub network protocol popular in IOT
2. STOMP - Simple Text Oriented Message Protocol is one that works over web sockets and works with message oriented middleware such as MQ systems
3. AMQP - Advanced Message Queuing Protocol was created for unifying the middleware layer

The one source of actual useful realtime information I could find was national rail in the UK. The Transport for London was also supposed to host several real time streaming data feeds but I could not find any information on this.

## National Rail to the Rescue

{{< figure src="national-rail-realtime.webp" title="An Unlikely Rescuer" >}}

The national rail provides a set of open data feeds and files for anyone who creates a developer account. There are several sets of data in there. The full data can be found at the [wiki](https://wiki.openraildata.com/index.php?title=Darwin:Push_Port). You can sign up for the developer account at [open data portal](https://opendata.nationalrail.co.uk/)

The feed is in STOMP format and the serialization format is XML. And it is compressed using gzip. So we will have to read the data in STOMP protocol format, unzip it and then convert to a more modern format that most of the tools understand such as json and then write it to kafka to be processed further.

Let's go through each of these concerns and figure out how we are tackling each one

## STOMP Protocol ( which I didn't know was a thing )

Before this project I had never heard of the STOMP format. But reading up on it, it seems quite a small, easy to understand spec that you can read [here](https://stomp.github.io/). Since it is quite easy to understand and implement, I was expecting the clients to work quite smoothly. Specially since there seemed to have been such a small amount of churn in the protocol specification itself.

But it turned out that the python library was having issues. Right after connecting, the client gets disconnected. The strange thing is the command line client seems to work just fine. I had assumed that my code was having issues and I did not understand something about the library I was using - [stomp.py](https://github.com/jasonrbriggs/stomp.py). But it turned out that even the [official client](https://github.com/openraildata/stomp-client-python) did not work either.

```

❯ pipenv shell
Launching subshell in virtual environment...
❯  . /home/osada/.local/share/virtualenvs/tfltest-7b5b1zAz/bin/activate
❯ cd stomp-client-python
❯ ./opendata-nationalrail-client.py
Connecting to darwin-dist-44ae45.nationalrail.co.uk
Disconnected waiting 5 seconds before exiting
^CTraceback (most recent call last):
  File "/home/osada/progs/tfltest/stomp-client-python/./opendata-nationalrail-client.py", line 108, in <module>
    time.sleep(1)
KeyboardInterrupt

```

So that was a dead end because I didn't really have the temerity to debug this right then. Rummaging around in that openraildata org in github, the next repo was a java client. I have not done any Java development in years but I decided to give it a go since that seemed the quickest way to get things going.

## Re-learning Java in a pinch

The first thing to do was setup the developer environment. Since I had not done so before, I install the JDK. Since I wasn't sure which version to go with I installed both java 11 version and java 17 versions. I decided to give java 17 version a try. Since I am on arch (well, technically manjaro) I have to use the following command to update the alternatives where alternative is the term used on Ubuntu side.

```

❯ sudo archlinux-java status
Available Java environments:
java-11-openjdk (default)
java-17-openjdk
❯ sudo archlinux-java set java-17-openjdk
❯ java --version
openjdk 17.0.1 2021-10-19
OpenJDK Runtime Environment (build 17.0.1+12)
OpenJDK 64-Bit Server VM (build 17.0.1+12, mixed mode)

```

Ok, now on to actually building and running the official client. Replace the username and password with what was assigned to you when you signed up. And build and run.

```

    ❯ mvn spring-boot:run
    [INFO] Scanning for projects...
    [INFO] 
    [INFO] ------------< com.openraildata:openwire-camel-client-java >-------------
    [INFO] Building openwire-camel-client-java 1.2
    [INFO] --------------------------------[ jar ]---------------------------------
    ....
    2021-11-21 21:38:52.480 ERROR 17340 --- [           main] c.s.x.b.v2.runtime.reflect.opt.Injector  : null

    java.security.PrivilegedActionException: null
   at java.base/java.security.AccessController.doPrivileged(AccessController.java:573) ~[na:na]
   at com.sun.xml.bind.v2.runtime.reflect.opt.Injector.<clinit>(Injector.java:197) ~[jaxb-impl-2.3.0.jar:2.3.0]
```

Well, that was unexpected. Turns out that newer Java versions don't like some optimization used in JAXB core libraries. According to this [Stackoverflow](https://stackoverflow.com/questions/50237516/proper-fix-for-java-10-complaining-about-illegal-reflection-access-by-jaxb-impl) answer it seems that using any version of JAXB above 2.3.0 should do the trick but after several attempts at changing dependencies and other futile attempts, I just gave up and switched to Java 11. And that seems to work fine with just a warning. Homework for later!

Switching to Java 11 made everything work and finally we were getting some data from the feed, Success!

## Note about the Java solution and how it works

Taking a step back and actually reading through the source code for the Java Client showed me that the code is unusually succinct, specially compared to my memories of bloated hunks of code that I remember being the standard enterprise Java fare. Turns out it was due to mostly the library that they were using Camel. Camel itself probably deserves a blog post of it's own but for the moment let's quickly dive in to what it is because boy its interesting.

This library traces it's roots back to [Enterprise Integration Patterns book](https://www.enterpriseintegrationpatterns.com/) by Gregor Hohpe and Bobby Woolf. That book comes about after the GoF book gets published about the design patterns in OO programming. Now the very second design patterns are mentioned the functional purists amongst you will scoff at the mere mortals who are forced to use Java because _we don't need design patterns_. But the reality is that patterns transcend individual languages and are a quite useful tool to save people time and effort when developing enterprise application. The honest truth is that Enterprise programmers have to manage with fewer resources than their Web 2.0 brethren, the same sort of expectations. And patterns that can be easily recognized, applied and shared are life savers since it makes the job easier for architects that have to come up with the blueprints and programmers that have to implement them.

The book defined a set of 65 common integration patterns and the [Camel library](https://camel.apache.org/) implements those patterns. It also has support for numerous data formats and endpoints via a unified URI system. This makes it extremely easy to integrate different data sources and sinks. Best thing about this is that the library core is very lightweight and the rest of the functionality uses a plugin architecture. This was a surprise finding and I am somewhat dissapointed to find that no golang library fills the same niche.

## On to writing to Kafka

Now the only thing left to do was writing to Kafka. To accomplish only a very few changes needed to be done. Configuring the connection to Kafka is simple enough. Add the dependencies to pom.xml

```xml

<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-kafka</artifactId>
    <version>${camel.version}</version>
</dependency>

```

And configure routing for route builder so the STOMP messages gets processed and sent to kafka

```java

String topicName = "stomp";
String kafkaServer = "kafka";
String toKafka = new StringBuilder().append(kafkaServer).append(":").append(topicName).append("?")
                        .append("brokers=localhost:9092").toString();

from("activemq:topic:" + feedTopic + "?durableSubscriptionName=" + username)
        .unmarshal()
        .gzip()
        .process(darwinMessageHandler)
        .to(toKafka);

```

All that is left is for the XML to be converted to JSON because that's the only language hip enough for 2021. For that I ended up using jackson instead of a simpler alternative like [JSON Java](https://github.com/stleary/JSON-java) because of the namespaced XML found in the feed.

```java

    @Override
    public void process(Exchange exchange) throws Exception {

        String messageBody = exchange.getIn().getBody(String.class);
        XmlMapper xmlMapper = new XmlMapper();
        JsonNode node = xmlMapper.readTree(messageBody.getBytes());

        ObjectMapper jsonMapper = new ObjectMapper();
        String json = jsonMapper.writeValueAsString(node);
        exchange.getMessage().setBody(json);
    }

```

And done! Now we just run a kafka process along with the associated zookeeper instance, create the topic called "stomp" and viola!

## What Next?

So you have a system that writes some set of JSON messages in to a kafka topic, what next? Well the next steps can be anything you want to learn and experiment with really. For me I am hoping to use this to toy with two pet projects.

1. I want to learn flink including it's CEP engine.
2. I want to take [materialize](https://materialize.com/) for a spin

expect more writings on those topic based on this setup in the coming weeks.
---
title: "Valkey: The New Redis Alternative"
date: 2024-11-17T13:29:22Z
draft: false
image: "valkey.png"
author: "Osada Paranaliyanage"
description: "We consider how to approach implementation of feature flags in a careful "
theme: "full"
tags: [software-architecture, cloud, was]
categories: [software-architecture]

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

## What is Redis?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store that functions as a database, cache, and message broker. Known for its high performance and versatility, Redis supports low-latency operations crucial for real-time applications. At its core, Redis organizes data as key-value pairs but extends its functionality with advanced data structures (ADTs), streaming capabilities, and persistence options.

Redis offers rich data types, including strings, lists, sets, sorted sets, hashes, bitmaps, and hyperloglogs. These enable complex operations like leaderboard maintenance, set intersections, or approximate cardinality estimation. Redis Streams further enhance its capabilities, enabling real-time data processing and message queuing with features like consumer groups, automatic message acknowledgment, and ordered, append-only data logs.

Redis also supports data durability through mechanisms like snapshots (RDB files) and append-only file (AOF) logs. Snapshots provide periodic states of the database, while AOF logs persist each write operation. These features make Redis suitable for both ephemeral and long-term data storage. With additional functionalities like replication, clustering, Lua scripting, and pub/sub messaging, Redis remains a critical component in modern web architectures.

## A Brief History of Redis

Redis was created in 2009 by Salvatore Sanfilippo to address the performance limitations of disk-based databases for his Italian startup. Redis quickly gained traction for its innovative, memory-first design and simple API, becoming a go-to tool for applications requiring fast and reliable data access.

Redis transitioned to open-source early in its development, encouraging community contributions. By 2015, Redis Labs (now Redis Inc.) became the commercial steward of the project, adding enterprise-grade features and cloud-based services. Today, Redis powers platforms ranging from small startups to tech giants like Twitter and Airbnb.

In 2018, Redis Inc. introduced the Server Side Public License (SSPL) for certain modules to prevent cloud providers from monetizing Redis without contributing back. This sparked debates within the open-source ecosystem about software freedom. Around this time, the community-driven Valkey project emerged as an open-source alternative to Redis under a permissive BSD license, addressing concerns over licensing restrictions while retaining Redis compatibility.
Valkey on AWS

When Valkey was announced, major PaaS providers rapidly adopted it. AWS, in particular, introduced a Valkey-based caching option with two notable characteristics:

- Pricing Advantage: AWS provides a 20% discount on Valkey caches compared to Redis OSS caches. AWS even promotes Valkey through console notifications encouraging users to switch, with text like "Create clusters for as little as $6 per month."
- Serverless Only: Unlike traditional serverful Redis offerings, AWS Valkey is exclusively available as a serverless service. While I am usually skeptical of AWS's serverless and managed options—such as Aurora Serverless, which can be prohibitively expensive for consistent workloads—this approach intrigued me enough to explore further.

AWS offers Valkey as an engine in its ElastiCache service. So provisioning a valkey cluster is largely similar to the process of getting any other elasticache cluster. Below is a sample AWS CDK script for provisioning a Valkey cache:

```java
        // Create the User for the valkey cache
        var user = CfnUser.Builder.create(this, "ServerlessCacheUserDefault")
                .engine("redis")
                .userId("valkey-user"))
                .userName("valkey-user")
                .noPasswordRequired(true)
                .build();

        generatedUserIds.add(user.getUserId());
        generatedUsers.add(user);

        // Now create the user group to include the user in
        var userGroup = CfnUserGroup.Builder.create(this, "ServerlessCacheUserGroup")
                .engine("redis") 
                .userGroupId("valkey-cache-usergroup"))
                .userIds(generatedUserIds)
                .build();

        userGroup.getNode().addDependency(generatedUsers.toArray(CfnUser[]::new));

        // Now for the security group for the elasticache cluster
        var serverlessCacheSG = SecurityGroup.Builder.create(this, "ServerlessCacheSecurityGroup")
                .securityGroupName("valkey-cache-sg")
                .vpc(mainVPC)
                .build();
        // Allow traffic in to default redis/valkey port
        serverlessCacheSG.addIngressRule(Peer.ipv4(cidrIpRange.getValueAsString()), Port.tcp(6379));

        // Build the actual cache
        var serverlessCache = CfnServerlessCache.Builder.create(this, "ServerlessCache")
                .serverlessCacheName("shared-cache")
                .engine("valkey")
                .userGroupId(userGroup.getUserGroupId())
                .securityGroupIds(List.of(serverlessCacheSG.getSecurityGroupId()))
                .subnetIds(Vpc.getPrivateSubnets().stream().map(ISubnet::getSubnetId).toList())
                .build();

        serverlessCache.getNode().addDependency(userGroup);
```

from the top, we start setting up users for the valkey cache, then a user group for it. The documentation for each can be found [here](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnUser.html) and [here](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnUserGroup.html). For more information you can refer to their Cloudformation counterparts [here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticache-user.html) and [here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticache-usergroup.html).After that is done, we create the security group and add a ingress rule allowing incoming connections to server port 6379 which is the default for valkey. Then finally we build the actual cache using the user, usergroup and security group.

## How Valkey compares with serverful redis.

I was already benchmarking a couple of different approaches for one our applications and had a benchmarking script lying around that I used for this not-so-scientific benchmarking process. The salient points of the benchmarking points are as follows.

1. I wanted to see what the best way to store relatively large blobs of json efficiently in redis were. Note that the best practice for storing values on redis is to break large values down to smaller parts. But that is not possible in this case. We are basically utilizing elasticache as a shared (amongst instances of a micro-service) look aside cache.
2. The alternatives I was testing were
   1. JSON capability via [redisJSON](https://github.com/RedisJSON/RedisJSON).
   2. Just plain old string after converting from in memory representation of JSON
   3. Compressing in order to make it more efficient while in transit and storage. For compression algorithm I was weighing between using [LZ4](https://github.com/lz4/lz4) and [Zstd](https://github.com/facebook/zstd) and opted for zstd in the end.
3. I used faker because just generating random values does not really reflect the characteristics of the data we store. I have aspirations to turn this in to general tool for stressing our databases and caches for given traffic patterns and this might become useful in that sense.
4. We are not including time for compressing the data as I didn't include the time for JSON encoding the data either. Ideally we would measure Wall time from data being in-memory to 
5. The workloads that we typically see in our workloads tend to be rather write heavy. This is to be expected since the personalized content that we serve are really one use for the most part. Therefore I set the read/write split of the workload at 20/80 for this run of the benchmarking script.

{{< details title="Click to Expand: Python script for benchmarking redis/valkey for our use-case">}}
```python
#!/usr/bin/env python3

import redis
import json
import random
import time
from faker import Faker
import string
import zstandard as zstd 

# Configs
HOST = '127.0.0.1'
PORT = 7000
NUM_KEYS = 2000
OPERATIONS = 10000
READ_PERCENTAGE = 0.2
WRITE_PERCENTAGE = 0.8
VALUE_SIZE_KB = 150
KEY_LENGTH = 50

def generate_json_value():
    fake_data = {
        "name": faker.name(),
        "address": faker.address(),
        "email": faker.email(),
        "phone": faker.phone_number(),
        "company": faker.company(),
    }
    json_data = json.dumps(fake_data)
    return json_data[:VALUE_SIZE_KB * 1024]

def generate_random_key(length):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def compress_data(data):
    cctx = zstd.ZstdCompressor()
    compressed_data = cctx.compress(data.encode('utf-8'))
    return compressed_data

def decompress_data(compressed_data):
    dctx = zstd.ZstdDecompressor()
    return dctx.decompress(compressed_data).decode('utf-8')

def benchmark_json():
    read_ops_json = 0
    write_ops_json = 0
    start_time = time.time()

    num_reads = int(OPERATIONS * READ_PERCENTAGE)
    num_writes = OPERATIONS - num_reads
    for key, value in zip(keys, values):
        client.execute_command('JSON.SET', key, '$', value)

    for _ in range(num_reads):
        key = random.choice(keys)
        client.execute_command('JSON.GET', key) 
        read_ops_json += 1

    for _ in range(num_writes):
        key = random.choice(keys) 
        json_value = random.choice(values) 
        client.execute_command('JSON.SET', key, '$', json_value) 
        write_ops_json += 1

    end_time = time.time()
    duration = end_time - start_time
    print(f"JSON Workload benchmark completed in {duration:.2f} seconds.")
    print(f"Read operations: {read_ops_json}, Write operations: {write_ops_json}\n")

def benchmark_string():
    read_ops_string = 0
    write_ops_string = 0
    start_time = time.time()

    num_reads = int(OPERATIONS * READ_PERCENTAGE)
    num_writes = OPERATIONS - num_reads

    for key, value in zip(keys, values):
        client.set(key + ":string", value)

    for _ in range(num_reads):
        key = random.choice(keys) 
        client.get(key + ":string") 
        read_ops_string += 1

    for _ in range(num_writes):
        key = random.choice(keys) 
        json_value = random.choice(values) 
        client.set(key + ":string", json_value) 
        write_ops_string += 1

    end_time = time.time()
    duration = end_time - start_time
    print(f"String Workload benchmark completed in {duration:.2f} seconds.")
    print(f"Read operations: {read_ops_string}, Write operations: {write_ops_string}\n")

def benchmark_compressed_string():
    read_ops_string = 0
    write_ops_string = 0
    start_time = time.time()

    num_reads = int(OPERATIONS * READ_PERCENTAGE)
    num_writes = OPERATIONS - num_reads

    for key, value in zip(keys, values):
        if value: 
            compressed_value = compress_data(value) 
            client.set(key + ":binary", compressed_value) 

    for _ in range(num_reads):
        key = random.choice(keys) 
        compressed_data = client.get(key + ":binary") 
        if compressed_data: 
            decompressed_data = decompress_data(compressed_data)
            read_ops_string += 1

    for _ in range(num_writes):
        key = random.choice(keys) 
        json_value = random.choice(values) 
        if json_value: 
            compressed_value = compress_data(json_value) 
            client.set(key + ":binary", compressed_value) 
            write_ops_string += 1

    end_time = time.time()
    duration = end_time - start_time
    print(f"String Workload (Compressed) benchmark completed in {duration:.2f} seconds.")
    print(f"Read operations: {read_ops_string}, Write operations: {write_ops_string}\n")

client = redis.StrictRedis(host=HOST, port=PORT, db=0, ssl=True, ssl_cert_reqs="none", username="rms-tyga", password="password12345678")
faker = Faker()
keys = []
values = []
for _ in range(NUM_KEYS):
    key = "rms-tyga:" + generate_random_key(KEY_LENGTH-9) 
    json_value = generate_json_value()
    values.append(json_value) 
    keys.append(key)
    client.execute_command('JSON.SET', key, '$', json_value) 
    client.set(key + ":string", json_value) 

benchmark_json()
benchmark_string()
benchmark_compressed_string()
```
{{< /details >}}

The results from running this script against a t4g.medium based 2 node, 1 shard redis cluster was as follows

```
(redis-json-benchmark) ➜  redis-json-benchmark ./benchmark.py
JSON Workload benchmark completed in 386.04 seconds.
Read operations: 2000, Write operations: 8000

String Workload benchmark completed in 381.14 seconds.
Read operations: 2000, Write operations: 8000

String Workload (Compressed) benchmark completed in 381.77 seconds.
Read operations: 2000, Write operations: 8000
```

Same script when run against the Serverless valkey cache yeilds

```
(redis-json-benchmark) ➜  redis-json-benchmark ./benchmark.py
JSON Workload benchmark completed in 324.97 seconds.
Read operations: 2000, Write operations: 8000

String Workload benchmark completed in 326.84 seconds.
Read operations: 2000, Write operations: 8000

String Workload (Compressed) benchmark completed in 324.98 seconds.
Read operations: 2000, Write operations: 8000
```

So as can be seen valkey performs roughly 15% better than the serverful version. Now, the fact that it is a burstable VM may have something to do with it, but note that the CPU usage did not go beyond 5% the whole time I ran the benchmark for the redis version. So I do not think it had a huge impact. The scaling seems pretty good as well. According to docs from cold it can scale up to 30K ECPU operations for a single shard and for read replicas can scale up to 90K.

Note that using redisJSON has more advantages than pure speed. You also get ability to operate on the JSON using operators that understand the JSON structure. For example you can use [JSONPath](https://github.com/json-path/JsonPath) queries on the data and fetch partial fragments from the data if needed.

### Side note on compression algorithms for use with data storage/transfer.

I tried out a couple of different options for the compression algorithm here starting with standard gzip. What I found out was the unless you were using a newer standard that optimized for faster compression/decompression, it was really hard to get the compression to make a difference.

The options I tried were

1. ZLib for GZip - This is included in the standard library for python and very easy to use. But since decompression seems highly costly, it took the scores way higher than it should have. So I abandoned that option.
2. LZ4 - This is the first of a new breed of compression formats that was introduced to make inline compression of data possible for large streams of data. Created by google and widely adopted since then, this improved matters quite a bit. Note that it optimizes for compression speed and not size. It is also quite light on the CPU usage compared to others.
3. Zstd - This is the newest kid on the block from what I know and was created at facebook. This is what I ended up using and game me the best results out of the three. This algorithm gives much better compression ratios than lz4 at the cost of more CPU usage. So as always, it is a tradeoff.

If you are interested in these algorithms and are considering which one to use, you can find an interesting discussion where author of Zstd shows up on hacker news [here](https://news.ycombinator.com/item?id=19678115).

## Valkey pricing

You would have noticed the unit ECPU in the paragraph above and as is customary for AWS this is a very complicated term that seems to be used for billing for it's serverless option. In simple terms a GET or a SET of a 1 KB data blob will take 1 ECPU. For commands that have higher CPU usage like HMGET, the CPU usage dimension becomes higher and for HMGET specifically it is 3 times the base case. And the pricing is set by the dimension that is the highest. Thus if you do an operation that GETs 2 KB of data using HMGET you get charged 3 ECPUs.

This all makes for a rather complex pricing structure as you can imagine but if you use redis servers today, a rough idea of pricing can be had by looking at the no of GET/SET/etc operations and your traffic in and our in your metrics. In our cases the cache nodes were quite underutilized so there was an upside to using valkey in pricing as well.

## Should I use Valkey?

So for AWS, GCP and Azure it is a no brainer that everyone should switch to Valkey. But should you? For me that depends. Redis is a very very complex beast nowadays. It is no longer a memcached replacement only and has everything from ADTs, probabilistic data structures, streaming to vector storage. And as always the best practice is to compare your use case amongst the two options. Start by creating a sample workload that simulates your real workload and then run it on both infrastructure and compare the results so you have an apples to apples comparison. Don't forget to take in to account all the aspects like cost and performance.

What about the serverless aspect? Is it worth it to avoiding sys admin work on the nodes and engine when you are running on your own provisioned servers? So far that does not seem like a huge task. RDS upgrades are by far a bigger headache with trying to convince DMS and pg_replication to play nicely and making sure to move the bits of the schema that DMS won't move. Redis by comparison seems so simple but it _is_ another thing to do.

All in all, this seems like something that is worth evaluating at least so give it a go. Only thing I am wondering where else the same drama will play out now that the VCs are coming for their pound of flesh and the OSS startup are pulling the draw bridges up?
---
title: "Hyperscan C++ Wrapper"
date: 2021-12-19T22:16:45+05:30
draft: false
image: Hyperspace_falcon.webp
author: Osada Paranaliyanage
description: Using Hyperscan regex library in C++
theme: full
tags: [c++,cpp,regex,intel,hyperscan,wrapper]
categories: [programming]
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

> (or why using the phrase "C/C++" is crime against programming)

{{< table_of_contents >}}

## Being a C library in a C++ World

This weekend I was looking at a regex library written by intel called [hyperscan](https://github.com/intel/hyperscan/). I had needed to use a regex library that was performant  and easy to use. I needed the library to use all the new hardware features such as new instructions such as AVX2 and AVX512. This library was the best one I came across.

It has support for block mode for bounded data and also supports streaming mode for unbounded or streaming data. It uses graph decomposition and hybrid automata based approach to match the data and uses the [ragel library](https://en.wikipedia.org/wiki/Ragel) for parsing the regex. It also uses SIMD instructions and has a lot of optimizations as is to be expected from a CPU vendors library.

## Why C is still being used

Now, given all that had transpired during the last decade from Heartbleed to POODLE, you might be forgiven for asking why anyone in their right frame of mind, would implement a regex library in C. But the fact of the matter is for performant idiomatic code that is portable, nothing comes as close as C. Rust is a promising language and I wish that all the very best and a bright future. But it still has a long ways to go to grab the same mind share as C. The biggest thing is that C is such a simple language.

It is based on a very simple mental modal and once you have mastered it, it pays dividends over and above. It has barely changed over the time I first learned it around 14 years ago. And this durability is a huge plus in the practical world. This means that for projects that will stay relatively stable, C is a great choice.

## C is nice but C++ is nicer

{{< figure src="A12SR71.webp" title="For every nice thing, there is a nicer thing - A12 vs SR71" >}}

As a user of C++ primarily for 12 years and counting, It brings lots of nice things to the table. Talking about C++ is a topic in and of itself and this margin is definitely not enough large enough to contain those notes. But for the purpose of explaining this post, I will cover the highlights of what it provides over C. 

The biggest of these is the ability to do easier resource management. [RAII](https://en.cppreference.com/w/cpp/language/raii) is a very simple but very powerful concept. Along with automatically called destructors, this concept makes it very easy to enforce clean up of resources.

The "dot method" of programming as I like to call it, is a very convenient way to experiment quickly. Basically the idea is that you include the main header file for the library you are experimenting with, then you instantiate whatever seems to be the most relevant class for what you want to achieve. And finally you type the object name and then press dot and wait for autocompletion of the IDE to kick in. Assuming the library author was a sensible person, you would be off to the races at this point. You would have everything you need to do right there and it will be a matter of calling the right methods with the right parameters.

Now this is not how you would necessarily do the actual development for the production code but this is very useful in prototyping and testing.

Another nice thing about C++ is it's capability to hide unwanted complexity. And make sure the code moves only within the parameters set by the library. Enum classes and other features introduced in C++11 is the main driver for this functionality.

## Implementing a C++ Wrapper for Hyperscan

With all that in mind, let's get down to business of creating the wrapper. Lets start with the header file.

```cpp
class HyperScanDatabase {
public:
    typedef match_event_handler EventHandler;
    enum class ScanMode {
        BLOCK,
        STREAM
    };
    HyperScanDatabase(ScanMode scanMode);
    virtual ~HyperScanDatabase();
    int addPattern(const char* pattern, int flags);
    int scan(const char* data, size_t dataSize, EventHandler);
private:
    std::vector<char*> m_patterns;
    std::vector<unsigned int> m_flags;
    std::vector<unsigned int> m_ids;
    bool m_compiled = false;
    ScanMode m_scanMode;
    hs_database_t* m_database;
    hs_scratch_t* m_scratch;
};
```

The first thing to note is I am converting the configuration options and parameter types to C++ equivalents. This can be as simple as changing integer flags to enum classes and up lifting function pointers in to C++ typedefs. Or they can be more elaborate ones where we cover up return codes with an exception hierarchy, change C data structures to C++ STL ones and so on. The important thing is that you keep the interface of the wrapper within the C++ realms and remove the "C" ness of the interface.

Then note that the internal data structures are all C++ ones, even when ultimately they will be passed to the C code. ```m_patterns``` for example is a vector of char pointers. In C world this would become a two dimensional dynamically allocated array of char pointers. But in C++ world, it is a vector of char pointers. The difference being that memory management is far easier on the vector. Note that I couldn't use a vector of vectors because there is no guarantee in C++ about contiguousness of nested vectors.

A virtual destructor because we are holding resources that need to be freed and a state variable for holding internal state is also present.

The methods themselves are very simple. The construction of the object only requires you to know if you are processing a stream or block of characters. Then a single method for adding a pattern for matching which returns a unique id for the pattern. Then a method scanning the data and calling the event handler for each match.

Switching over to the implementation it looks like following

```cpp
#include "hs_wrapper.h"
#include <string.h>

namespace 
{

    bool
    compile(HyperScanDatabase::ScanMode scanMode,
            std::vector<char*> patterns,
            std::vector<unsigned int> flags,
            std::vector<unsigned int> ids,
            hs_database** database,
            hs_scratch** scratch)
    {
      hs_compile_error_t* compileError;
      if (hs_compile_multi(&patterns[0],
                           &flags[0],
                           &ids[0],
                           patterns.size(),
                           (scanMode == HyperScanDatabase::ScanMode::STREAM
                              ? HS_MODE_STREAM
                              : HS_MODE_BLOCK),
                           nullptr,
                           database,
                           &compileError) != HS_SUCCESS) {
        fprintf(
          stderr, "ERROR: Unable to compile patterns: %s\n", compileError->message);
        hs_free_compile_error(compileError);
        hs_free_database(*database);
        return false;
      }
      if (hs_alloc_scratch(*database, scratch) != HS_SUCCESS) {
        fprintf(stderr, "ERROR: Unable to allocate scratch space. Exiting.\n");
        hs_free_database(*database);
        return false;
      }
      return true;
    }
} // anonymous namespace

HyperScanDatabase::HyperScanDatabase(ScanMode scanMode)
  : m_scanMode(scanMode)
  , m_database(nullptr)
  , m_scratch(nullptr)
{
  m_ids.push_back(0);
}

HyperScanDatabase::~HyperScanDatabase()
{
  if (m_database) {
    hs_free_database(m_database);
  }
  if (m_scratch) {
    hs_free_scratch(m_scratch);
  }
  for (auto pattern : m_patterns) {
    delete[] pattern;
  }
}

int
HyperScanDatabase::addPattern(const char* pattern, int flags)
{
  char* d_pattern = new char[strlen(pattern) + 1];
  strncpy(d_pattern, pattern, strlen(pattern) + 1);
  m_patterns.push_back(d_pattern);
  m_flags.push_back(flags);
  m_ids.push_back(m_ids.back()++);
  return m_patterns.size() - 1;
}

int
HyperScanDatabase::scan(const char* data1, size_t dataSize, EventHandler eventHandler)
{
  int rc = HS_SUCCESS;
  if (!m_compiled) compile(m_scanMode, m_patterns, m_flags, m_ids, &m_database, &m_scratch);
  if ((rc = hs_scan(
         m_database, data1, dataSize, 0, m_scratch, eventHandler, nullptr)) !=
      HS_SUCCESS) {
    fprintf(
      stderr, "ERROR: Unable to scan input buffer. rc = %d. Exiting.\n", rc);
  }
  return rc;
}

```

All the usual suspects really. Try to follow the best practices. Everything from [Effective Modern C++11](https://www.oreilly.com/library/view/effective-modern-c/9781491908419/) to [Guru of the week](https://herbsutter.com/gotw/). But in particular pay attention to the fact we hid the implementation of the compile function from the header in an anonymous namespace. This is something that I have seen almost all the C++ newbies, specially ones that started out with Java make. Those functions do not need to be part of the header file. Even if you make it private, it ends up polluting the namespace and needing recompiles of all the translation units including this header for no real gain. And no, you do not have to test that. The whole point of TDD is to test the unit - i.e. the interface you defined in the header. The public interface of the class can and should be tested and the ```compile``` function will get tested while you do that. You don't need to write a specific test for that function.

Also note that we delegate resource management to the constructor and destructor as much as possible. The user of the class should not have to worry about freeing the resources. Obviously resource holding classes should not ideally be value semantic classes, so copying etc should be prevented. So in hindsight I should have used something like [rule of three](https://en.cppreference.com/w/cpp/language/rule_of_three) and defined a copy constructor and assignment operator as well. So strike one for me :)

## Takeaways

In general the first thing that I instinctively do when I have to use a non-trivial C library is to look for a C++ wrapper. It is much easier to work with a C++ interface and not have to worry about manual resource management. This pattern of creating C++ wrappers go back to when we had to use OpenSSL in one of my previous jobs and we ended up writing a pretty comprehensive C++ wrapper for that. In case you have to do that for your work, try to make sure that you never ever leak the resource management details to outside. The moment you do that, you lose all advantage that C++ gives you.

Make sure that your wrappers public interface is independent from the underlying C libraries. Redefine enums to enum classes, use narrower types, use types with custom validation - whatever you do, define your own interfaces since that will allow you to customize the internal behavior to your hearts content as well upgrade or modify the underlying C library without having to change the clients of your library.

---
title: "Writing a Dictation Application"
date: 2025-10-05T19:52:51+01:00
draft: false
description: "Why and How I wrote an application that uses local ML models for dictation/writing."
image: "dictation.webp"
author: "Osada Paranaliyanage"
theme: "full"
tags: ["local-first","dictation","voice-to-text","Parakeet","MLX","Python packaging","macOS development","open-source","small models"]
categories: ["developer tools","machine learning"]

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

share:
enable: true


---

## Trouble with typing

Typing is one of those things that we do all day without thinking about how much friction it adds. Every pause for a typo, every moment spent rephrasing or adjusting syntax, breaks the flow of thought. It’s like there’s a bottleneck between your brain and the screen.

Sure, every time a conversation about GenAI comes up, someone always pops up in the discussion and says "typing was never the bottleneck". Sure, it may not have been for you but it is very annoying for me. I’ve always found speaking easier and was never an aspiring or otherwise touch typist. Talking feels natural, it flows at the speed of ideas. Typing, even when you’re fast, still feels like translating thoughts into keystrokes.

I simply wanted talk to my Mac, and have it type for me, anywhere, in any app, as if I were typing it myself? I didn’t want a cloud service or some subscription-based AI pipeline. I just wanted a small, local, privacy-friendly dictation app that stayed out of the way and let me speak freely.

That’s how [**Parakeet Dictation**](https://github.com/osadalakmal/parakeet-dictation) started - out of a small but persistent frustration, and the belief that sometimes, the simplest tools come from building the thing you wish existed.

That and the fact that I had not done a fun side project in a long while. While I enjoy wardley maps and process improvements at work, I missed the joy of building something from scratch, wrestling with code, and shipping a tiny app that solves a real problem.

---

## Why Local-First

When I started building Parakeet Dictation, I knew I didn’t want it to rely on any external servers. The goal was for it to work even if I was offline, without sending audio anywhere. Privacy was one reason, but not the only one. Local models also mean lower latency, zero API costs, and full control over what happens on your machine.

At the time, there were two realistic open-source options for speech-to-text: [**Whisper**](https://github.com/openai/whisper) from OpenAI and [**Parakeet**](https://github.com/NVIDIA/NeMo) from NVIDIA. Whisper is great for multilingual support, but it’s large and not the fastest on-device. Parakeet, on the other hand, is lightweight and tuned for English. That trade-off made sense for my use case, so I went with Parakeet.

Then came the question of how to actually run it. I didn’t want to depend on external runtimes like [Ollama](https://ollama.com) or anything that required Docker images or heavy system dependencies. Since I was building on a Mac, [**MLX**](https://github.com/ml-explore/mlx) - Apple’s framework for running ML models natively on Apple Silicon - was the obvious choice. It’s fast, efficient, and feels like the right foundation for something that’s meant to stay local.

The combination of Parakeet and MLX turned out to be a perfect match: small enough to run locally, smart enough to keep up with natural speech, and private by design.

---

## Setting Up the Environment

I picked Python right away, because that’s just how machine learning ecosystems work. Every model, every framework, every experimental idea eventually comes wrapped in Python. The only issue is that the Python ecosystem itself can be a bit fragile.

Getting everything to run together wasn’t smooth. MLX wanted newer dependencies, while Parakeet depended on older ones. Some libraries simply wouldn’t build with the latest interpreters. After a long round of trial and error, I pinned it down to Python **3.12**. It’s the only version that works reliably. 3.13 is too new, and 3.11 is too old.

It’s one of those moments where you realize how brittle Python packaging still is. For a language that dominates data science, it shouldn’t be this hard to have a working environment. Maybe it’s because the interpreter changes too much between versions, or because maintainers can’t keep up with the churn. Either way, it feels like something the community needs to solve.

Once I finally had the environment sorted out, the rest of the build started to come together nicely.

---

## Making It Work: Keybindings, Logging, UX

Once the core dictation loop worked, I turned to the small things that make an app actually pleasant to use.

The first problem was getting the hotkey to behave. I used [**pynput**](https://pypi.org/project/pynput/) for global key listening, but the original implementation used the `GLFW_KEY_GLOOP` constant as a shortcut, which didn’t actually register on macOS. After a lot of testing, I settled on **Ctrl + Alt + A**. It’s comfortable to press, doesn’t conflict with other system shortcuts, and works reliably.

The intended flow is simple: press **Ctrl + Alt + A**, speak naturally, and the app types your words instantly. Press the same hotkey again to stop dictation. It’s designed to be invisible until you need it, then out of the way when you don’t.

Then I added proper logging. I didn’t want it to be noisy, so I set it up to respect an environment variable, meaning it only logs in debug mode. When you’re using the app day to day, it stays silent. When something goes wrong, you can flip the flag and see what’s happening.

For the UI, the app started off as a [**RUMPS**](https://github.com/jaredks/rumps) status bar app, which is a tiny framework for building macOS menu bar tools in Python. It’s minimal and does the job, but it’s also limited. I plan to replace it with a proper GUI later using native macOS components, so it can show a small floating control panel for toggling dictation and displaying status.

Each of these small tweaks made the app feel more natural, more like a built-in tool than a Python script running in the background.

---

## Key Code Snippets & Diffs

Below are a few focused diffs that show how the app evolved. They’re simplified for clarity, but map to the repo layout.

### 1) Pin the Python interpreter and tidy packaging

For this tiny diff, it caused the most pain. Getting the right Python version, and then making sure all dependencies worked together, took a lot of trial and error.

> Files: [`pyproject.toml`](https://github.com/osadalakmal/parakeet-dictation/blob/main/pyproject.toml), [`requirements.txt`](https://github.com/osadalakmal/parakeet-dictation/blob/main/requirements.txt), [`constraints.txt`](https://github.com/osadalakmal/parakeet-dictation/blob/main/constraints.txt)

```diff
# pyproject.toml
 [project]
 name = "parakeet-dictation"
-version = "0.1.0"
-requires-python = ">=3.10"
+version = "0.1.1"
+requires-python = ">=3.12,<3.13"  # 3.12 works reliably; 3.11 too old, 3.13 too new
 description = "Local dictation for macOS using Parakeet (MLX)"
 readme = "README.md"
 license = {file = "LICENSE"}
 authors = [{name = "Osada Lakmal"}]
 
 dependencies = [
-  "parakeet-mlx",
-  "pyaudio",
-  "pynput",
-  "rumps",
-  "numpy",
+  "parakeet-mlx>=0.0.8",   # MLX-backed Parakeet builds
+  "mlx>=0.18.0",
+  "pyaudio>=0.2.14",
+  "pynput>=1.7.7",
+  "rumps>=0.4.0",
+  "numpy>=1.26",
 ]
 
 [build-system]
 requires = ["setuptools>=68", "wheel"]
 build-backend = "setuptools.build_meta"
```

If you need a hard pin for transitive packages, use `constraints.txt` and install with:

```bash
pip install -r requirements.txt -c constraints.txt
```

References: 
* [PEP 621 project metadata](https://packaging.python.org/en/latest/specifications/declaring-project-metadata/)
* [requires-python](https://packaging.python.org/en/latest/specifications/core-metadata/#requires-python)

---

## Shipping a Python App: PyPI vs. Homebrew

My first instinct was to ship it with [Homebrew](https://brew.sh/). It felt like the natural route for macOS, but as soon as you try to bundle a Python virtual environment inside a formula, you hit walls. Brew is great for C or Rust style binaries, but Python apps with tight interpreter and wheel constraints do not have a clean path. The problem lies with the fact that brew applications are global by default and really only setup to work with system python version. After chasing workarounds, I dropped the idea, removed the formula, and went the way most Python tools go - publish to [PyPI](https://pypi.org/).

That meant converting the project to a standards based build with `pyproject.toml`, and adding a CLI entry point so people can run it directly. I used [pypa/build](https://pypi.org/project/build/) to produce wheels, and set up publishing with [Trusted Publishers](https://docs.pypi.org/trusted-publishers/) so GitHub Actions can release without storing API tokens.

**Build and publish, locally:**

```bash
python -m pip install --upgrade build twine
python -m build                  # creates dist/*.whl and dist/*.tar.gz
twine check dist/*               # sanity checks
```

**Install to try it out:**

```bash
# clean, isolated install for CLI tools
python -m pip install --user parakeet-dictation
# or
pipx install parakeet-dictation  # https://pypa.github.io/pipx/
```

**GitHub Actions sketch** - using Trusted Publishers:

```yaml
name: publish-to-pypi
on:
  release:
    types: [published]
jobs:
  publish:
    permissions:
      id-token: write   # OIDC for PyPI
      contents: read
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: python -m pip install --upgrade build
      - run: python -m build
      - uses: pypa/gh-action-pypi-publish@release/v1
```

This is the least surprising path for Python today. Brew is still great for installing system tools, but for Python applications with native ML wheels, PyPI and `pipx` give users a smoother experience.

---

## Local Text Rewriting: Adding a Tiny LLM

One of my favorite features from the original project was the ability to select some text, speak an instruction, and get a rewritten version. The original used [AWS Bedrock](https://aws.amazon.com/bedrock/) to call a hosted model. I wanted the same workflow without any network calls, so I swapped it for a small on device model.

I picked a tiny [Qwen](https://huggingface.co/Qwen) instruct model that runs on [MLX](https://github.com/ml-explore/mlx). It is fast enough on Apple Silicon, and it can handle simple editing prompts like “make this friendlier,” or “be more concise.”

**Minimal editing helper:**

```python
from mlx_lm import load as mlx_load, generate as mlx_generate

_qwen, _tok = mlx_load("Qwen/Qwen2.5-0.5B-Instruct-MLX")

def rewrite_selected_text(instruction: str, text: str) -> str:
    system = "You are an editor. Keep meaning, change tone and clarity only."
    prompt = f"<|system|>{system}\n<|user|>Instruction: {instruction}\n\nText:\n{text}"
    out = mlx_generate(_qwen, _tok, prompt=prompt, max_tokens=256)
    return out.strip()
```

Wire this so that if the user has a selection, the app sends that to `rewrite_selected_text`, otherwise it performs normal dictation. Simple, predictable, and it never leaves your machine.

---

## What’s next: beyond RUMPS

Right now the app uses [RUMPS](https://github.com/jaredks/rumps) for a minimal menu bar presence. It works, but I want a proper macOS experience, with a small floating panel and clearer feedback.

Plans:

* Replace the status bar only approach with a lightweight GUI, likely using [PyObjC](https://pyobjc.readthedocs.io/en/latest/) to reach native controls.
* Show a tiny always on top panel with a microphone indicator, a big toggle button, and the current hotkey hint.
* Add small start and stop sounds, or a [NSUserNotification](https://developer.apple.com/documentation/foundation/nsnotification) style nudge so you know when capture starts and stops.
* Make hotkeys, models, and logging fully configurable from the UI, stored in a simple config file.
* Make an actual installer. It has been ages since I have built a desktop application. So this will be fun.

That should make it feel like a first class macOS tool, while keeping the model on device, fast, and private by default.

---

## Conclusion

What started as a small frustration with typing turned into a full project that rethinks how voice can fit into daily workflows. **Parakeet Dictation** is a tiny experiment in what local-first AI can feel like - instant, private, and under your control. There’s no cloud dependency, no telemetry, no waiting for a response from someone else’s server. It’s just your voice, your machine, and your words.

Building it was a reminder that simplicity is harder than it looks. Getting Python dependencies to cooperate, fighting with packaging, and wrestling with macOS quirks all took time. But once it came together, it felt worth it. There’s something deeply satisfying about pressing a hotkey and watching your thoughts appear on screen in real time.

The next step is polishing the experience - turning it from a script into a true macOS app with a clean, native interface. But even as it stands, it’s a small proof of concept for a bigger idea: that powerful AI tools don’t have to live in the cloud. They can live right here, on your desk, quietly doing their job.* 
Make an actual installer. It has been ages since I have built a desktop application. So this will be fun.

If you want to try it out or contribute, check out [**Parakeet Dictation on GitHub**](https://github.com/osadalakmal/parakeet-dictation).

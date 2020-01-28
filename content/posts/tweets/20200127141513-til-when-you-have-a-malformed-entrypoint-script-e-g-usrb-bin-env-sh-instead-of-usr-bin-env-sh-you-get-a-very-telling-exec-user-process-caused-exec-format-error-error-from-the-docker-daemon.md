---
title: Tweet
date: 2020-01-27T14:13:28.360Z
categories:
  - shorts
tags:
  - docker
  - command
  - entrypoint
---
TIL when you have a malformed entrypoint script e.g. `#/usr/bin/env sh` instead of `#!/usr/bin/env sh` you get a very telling `exec user process caused "exec format error"` error from the Docker daemon.

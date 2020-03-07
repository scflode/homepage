+++
categories = ["development "]
date = 2020-03-07T17:01:13Z
draft = true
tags = ["css", "dark mode"]
title = "Dark mode in CSS"

+++
CSS nowadays is more powerful and convenient than ever before. It makes it very easy to let webpages feel native, adapt to complex styles in a quite easy way.

More recently operating systems like iOS, Android, macOS, Windows got added a feature called dark mode. The OS can even be told to switch to the alternate mode at specific times so the user does not need to do this manually. 

Wouldn’t it be nice to have your website react to it as well? That might sound like a job for Javascript, doesn’t it? But CSS has you (almost) covered here. There are media selectors that get this information from the underlying OS allowing you to override the “light” theme with an additional dark version.

## How does this work?
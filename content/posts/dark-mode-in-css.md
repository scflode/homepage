+++
categories = ["development "]
date = 2020-03-07T17:01:13Z
draft = true
tags = ["css", "dark mode"]
title = "Dark mode in CSS"

+++
![CSS is aweso...](/uploads/2020/03/07/E25396F4-ABA3-4CD2-B543-BB25F38F86F3.jpeg "CSS is aweso...")

CSS nowadays is more powerful and convenient than ever before. It makes it very easy to let webpages feel native, adapt to complex styles in a quite easy way.

More recently operating systems like iOS, Android, macOS, Windows got added a feature called dark mode. The OS can even be told to switch to the alternate mode at specific times so the user does not need to do this manually.

Wouldn’t it be nice to have your website react to it as well? That might sound like a job for Javascript, doesn’t it? But CSS has you (almost) covered here. There are media selectors that get this information from the underlying OS allowing you to override the “light” theme with an additional dark version.

## How does this work?

There are different approaches that can be taken. The easiest is to directly have the alternating styles within one file inside the respective query selector which might be OK for smaller CSS amounts. Most likely a site has a bit more to it and this approach does not suffice.

Another approach to simplify this is to have CSS variables in place. These are then the knobs you’d adjust for different styles. This is likely the most elegant way to solve the problem.

The third approach is to have a `base.css` file with all the settings except the colors, a `light.css` for the light colors and a `dark.css` for the dark ones. This approach requires some basic Javascript thought. This blog uses that approach currently.

Let’s go through all of them with small examples.

### Inline approach

> As written above this might not scale too much.

### CSS variables

### Separate light and dark files
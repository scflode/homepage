+++
categories = ["development "]
date = 2020-03-07T17:01:13Z
tags = ["css", "dark mode"]
title = "Dark mode in CSS"

+++
<img src="/uploads/2020/03/07/E25396F4-ABA3-4CD2-B543-BB25F38F86F3.jpeg" alt="CSS is aweso..." title="CSS is aweso..." width="100%" />

CSS nowadays is more powerful and convenient than ever before. It makes it very easy to let webpages feel native, adapt to complex styles in a quite easy way.

More recently operating systems like iOS, Android, macOS, Windows got added a feature called dark mode. The OS can even be told to switch to the alternate mode at specific times so the user does not need to do this manually.

Wouldn’t it be nice to have your website react to it as well? That might sound like a job for Javascript, doesn’t it? But CSS has you (almost) covered here. There are media selectors that get this information via the browser from the underlying OS allowing you to override the “light” theme with an additional dark version.

## How does this work?

There are different approaches that can be taken. The easiest is to directly have the alternating styles within one file inside the respective query selector which might be OK for smaller CSS amounts. Most likely a site has a bit more to it and this approach does not suffice.

Another approach to simplify this is to have CSS custom properties (variables) in place. These are then the knobs you’d adjust for different styles. This is likely the most elegant way to solve the problem.

The third approach is to have a `base.css` file with all the settings except the colors, a `light.css` for the light colors and a `dark.css` for the dark ones.

Let’s go through all of them with small examples.

### Inline approach

> For the sake of brevity the CSS is inlined in the HTML. It works as well in a separate file though.

```html
<html>
  <head>
    <title>Dark mode - inline</title>
    <style>
      html {
        background-color: #eee;
        color: #333;
      }
      @media (prefers-color-scheme: dark) {
        html {
          background-color: #222;
          color: #ddd;
        }
      }
    </style>
  </head>
  <body>
    <p>Page content</p>
  </body>
</html>
```

There is also the selector for light mode available via `prefers-color-scheme: light` as well as the fallback `prefers-color-scheme: no-preference`.

For further information see the [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme "prefers-color-scheme"). The browser support is \~80%, see [Can I use](https://caniuse.com/#feat=prefers-color-scheme "prefers-color-scheme media query").

### CSS custom properties / variables

[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--* "Custom properties (--*): CSS variables") allow you to have placeholders defined for various purposes that get overwritten in other contexts i.e. media queries f.e..

This feature allows us to write normal CSS but the aspects we want to replace, in this case the colors mainly, we add custom properties as values instead.

In code that looks like this:

```html
<html>
  <head>
    <title>Dark mode - variables</title>
    <style>
      :root {
        --bg-color: #eee;
        --fg-color: #333;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg-color: #222;
          --fg-color: #ddd;
        }
      }

      html {
        background-color: var(--bg-color);
        color: var(--fg-color);
      }
    </style>
  </head>
  <body>
    <p>Page content</p>
  </body>
</html>
```

This looks a bit much in this simple example but IMO this scales better than the above approach (but is very similar to it) as you have this sort of design system in place.

The downside is that you should start right ahead with this as it could become a bit cumbersome once you have a lot of CSS in place. I for instance normally start with writing CSS for the light / default mode and only later come to the conclusion that a dark mode might have some use.

From my PoV this is the most elegant way to handle this if you are writing plain CSS and have control over every aspect of it. It also has the least duplication and is as DRY as possible.

### Separate light and dark files

The last approach I will handle in this post is the separate files approach. The basic idea is outlined above already. One might argue that this is also something you need to do from the start on and I have to admin that I agree.

`index.html`

```html
<html>
  <head>
    <title>Dark mode - separate files</title>
    <link rel="stylesheet" href="css/dark.css" media="(prefers-color-scheme: dark)">
    <link rel="stylesheet" href="css/light.css" media="(prefers-color-scheme: no-preference), (prefers-color-scheme: light)">
    <link rel="stylesheet" href="css/base.css"></style>
  </head>
  <body>
    <p>Page content</p>
  </body>
</html>
```

`css/base.css`

```css
/* Common layout except colors etc. */
```

`css/dark.css`

```css
html {
  background-color: #222;
  color: #ddd;
}
```

`css/light.css`

```css
html {
  background-color: #eee;
  color: #333;
}
```

## Summary

All the above outlined approaches achieve the same. They are just different forms of organization depending on what you need or what you can use. If you for instance use a CSS framework you might prefer another approach as when you are completely free.

The dark mode support in browsers though is something very underestimated in my opinion. It is failry easy to implement and shows that you and/or your company has thought a bit more about your users and customers.
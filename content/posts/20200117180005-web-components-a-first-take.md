---
title: 'Web Components, a first take'
date: 2020-01-17T17:13:29.139Z
draft: false
tags:
  - html
  - javascript
  - web components
categories:
  - longs
  - development
---
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) is a technology to create reusable components for the web. This works by enhancing the developer's possibilities to be able to create custom HTML elements that consist of their own DOM. All major browsers support Web Components. For others there are polyfills.

## Basics

Generally speaking you are able to create something like

{{< highlight html "linenos=false" >}}
<my-element attr1="some">
  Nested content
  <my-nested-element/>
  <p>Other normal HTML</p>
</my-element>
{{< / highlight >}}

Browsers provide the developer with a bunch of APIs to accomplish this. These APIs though are pretty low-level and in some regards a bit more complicated than desired. F.e. a vanilla Web Component could look like this:

{{< highlight javascript "linenos=false" >}}
class MyElement extends HTMLElement {
  constructor() {
    super();
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');
    wrapper.innerText = this.getAttribute('text');
    this.appendChild(wrapper);
    console.log('Created my-element');
  }
}
customElements.define('my-element', MyElement);
{{< / highlight >}}

Within an HTML page you can then access it like this:

{{< highlight html "linenos=false" >}}
<html>

<head>
  <style>
    .wrapper {
      background-color: green;
      min-width: 10px;
      min-height: 10px;
      display: block;
    }
  </style>

</head>

<body>
  <p>Normal HTML</p>
  <hr>
  <my-element text="A component property's text"></my-element>
  <hr>
  <my-element>
    <p>Some content inside the component without component property</p>
  </my-element>
  <hr>
  <my-element text="Web Component text">
    <p>Nested HTML content's text</p>
  </my-element>
  <script src="./index.js"></script>
</body>

</html>
{{< / highlight >}}

This should then print out something like the following:

![Simple Web Comonent usage](/images/uploads/simple_webcomponent.png "Simple Web Comonent usage")

## Advanced

As you can see this looks like it could become a bit cumbersome when the component should have a bit more functionality. Luckily there are some libraries that make composing Web Components easier by abstracting some of the low level APIs away.

Some of the libraries I looked at are:

* [Hybrids](https://hybrids.js.org): Functional and declarative approach
* [LitElement](https://lit-element.polymer-project.org) from the [Polymer project](https://www.polymer-project.org): OO approach
* [StencilJS](https://stenciljs.com) from the makers of the [Ionic Framework](https://ionicframework.com): OO approach

## Summary

Web Components really have a good idea in mind. I struggled mainly with getting how to style the component which can be quite a challenge as components can consist of quite complex element compositions. It gets "complicated" when you are used to using CSS frameworks and want to reuse some of their base classes. This would mean that you need to have the framework as dependency which is against the idea of reusability. If you go with embedded CSS on the other hand you need to take care that it works across browsers. All in all it's again a question of what drawbacks to accept.

When you have a lot of elements that compose to components in your web application I think extracting those to Web Components is a good idea though. It keeps your DOM clean and clear so maintenance will become easier.

This post is only scratching the surface as Web Components also are able (and need) to handle state changes (like for example in form elements). You also should look into the workings of [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) if you are developing more complex components with nested elements.

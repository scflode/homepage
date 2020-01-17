---
title: 'WIP Web Components, a first take'
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

Generally speaking you are able to create something like

```html
<my-element attr1="some">
  Nested content
  <my-nested-element/>
  <p>Other normal HTML</p>
</my-element>
```

Browsers provide the developer with a bunch of APIs to accomplish this. These APIs though are pretty low-level and in some regards a bit more complicated than desired. F.e. a vanilla Web Component could look like this:

```javascript
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
```

Within an HTML page you can then access it like this:

```html
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
```

This should then print out something like the following:

![Simple Web Comonent usage](/images/uploads/simple_webcomponent.png "Simple Web Comonent usage")

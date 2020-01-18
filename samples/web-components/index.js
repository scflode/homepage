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

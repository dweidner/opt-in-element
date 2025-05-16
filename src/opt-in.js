import {Store} from './store.js';

export class OptIn extends HTMLElement {
  constructor() {
    super();

    this.store = new Store(this.localName);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /** @returns {string[]} */
  get acceptedServices() {
    return this.store.getAll();
  }

  /** @returns {boolean} */
  get accepted() {
    return this.store.contains(this.service);
  }

  /** @returns {string} */
  get service() {
    return this.getAttribute('service');
  }

  /** @param {?string} value */
  set service(value) {
    if (value) {
      this.setAttribute('service', value);
    } else {
      this.removeAttribute('service');
    }
  }

  /** @returns {HTMLFormElement} */
  get form() {
    return this.querySelector('form[data-dialog]');
  }

  /** @returns {HTMLInputElement} */
  get checkbox() {
    return this.form?.querySelector('input[name="remember"]');
  }

  /** @returns {HTMLTemplateElement} */
  get template() {
    const templateId = this.getAttribute('template') || `${this.localName}-template`;
    const templateElement = document.getElementById(templateId);

    return templateElement || this.querySelector('template[data-content]');
  }

  /** @param {?string} value */
  set template(value) {
    if (value) {
      this.setAttribute('template', value);
    } else {
      this.removeAttribute('template');
    }
  }

  connectedCallback() {
    if (this.accepted) {
      this.showContent();
    }

    this.form?.addEventListener('submit', this.handleFormSubmit);
  }

  disconnectedCallback() {
    this.form?.addEventListener('submit', this.handleFormSubmit);
  }

  showContent() {
    this.appendChild(this.template.content.cloneNode(true));

    this.form.remove();
    this.template.remove();

    this.setAttribute('ready', '');
  }

  /** @param {SubmitEvent} event */
  handleFormSubmit(event) {
    event.preventDefault();

    const remember = this.checkbox?.checked ?? false;

    if (remember) {
      this.store.add(this.service);
    }

    this.showContent();
  }

  /** @param {string} tagName */
  static define(tagName = 'opt-in') {
    if (! ('customElements' in window)) {
      console.warn('Custom elements are not supported by your browser.');
      return;
    }

    const elementName = customElements.getName(this);

    if (elementName) {
      console.warn(`${this.name} already defined as <${elementName}>.`);
      return;
    }

    const customElement = customElements.get(tagName);

    if (customElement && customElement !== this) {
      console.warn(`<${tagName}> already defined as ${customElement.name}`);
      return;
    }

    customElements.define(tagName, this);
  }
}

const importUrl = new URL(import.meta.url);
const preferredTagName = importUrl.searchParams.get('define') || 'opt-in';

if (preferredTagName !== 'false') {
  OptIn.define(preferredTagName);
}

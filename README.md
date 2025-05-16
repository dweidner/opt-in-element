# `<opt-in>`

A custom element to embed third party content with user consent.

**[Demo](https://dweidner.github.io/opt-in-element/demo.html)**

## Examples

```html
  <!-- Use a template as direct child of the component -->
  <opt-in service="youtube">
    <form data-dialog>
      <!-- Form HTML omitted for brevity -->
    </form>

    <template data-content>
      <iframe src="https://www.youtube.com/…"></iframe>
    </template>
  </opt-in>
```

```html
  <!-- Use an external template element -->
  <opt-in service="youtube" template="youtube-video">
    <form data-dialog>
      <!-- Form HTML omitted for brevity -->
    </form>
  </opt-in>
  <template id="youtube-video">
      <iframe src="https://www.youtube.com/…"></iframe>
  </template>
```

- Use the `template` attribute to point to the 3rd party content to embed (default: `template[data-content]`).
- Use the `service` attribute to customize the service ID to store in localStorage.

## Installation

Choose one of the following options:

1. Install via [npm](https://www.npmjs.com/package/@dweidner/opt-in-element): `npm install @dweidner/opt-in-element`
1. [Download the source manually from GitHub](https://github.com/dweidner/opt-in-element/tags) into your project.
1. Skip this step and use the script directly via a 3rd party CDN (not recommended for production use)

## Usage

Make sure you include the `<script>` in your project (choose one of these):

```html
<!-- Host yourself -->
<script type="module" src="opt-in.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script type="module" src="https://www.unpkg.com/@dweidner/opt-in-element@1.0.0"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script type="module" src="https://esm.sh/@dweidner/opt-in-element@1.0.0"></script>
```

## Features

- Load 3rd party contents with user consent
- Remember a users decision for future requests
import {AriaAttributes, DOMAttributes} from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    /**
     * Indicates that the browser will ignore this element and its descendants,
     * preventing some interactions and hiding it from assistive technology.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert
     * @todo Remove this stub declaration after react update to v19+
     */
    inert?: '';
  }
}

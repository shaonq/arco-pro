export function removeEventListen(target: Window | HTMLElement, event: string, handler: EventListenerOrEventListenerObject, capture = false) {
  if (target.removeEventListener && typeof target.removeEventListener === 'function') {
    target.removeEventListener(event, handler, capture);
  }
}

export default {
  on(element: Window | HTMLElement, event: string, handler: EventListenerOrEventListenerObject) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false);
    }
  },
  off(element: Window | HTMLElement, event: string, handler: EventListenerOrEventListenerObject) {
    if (element && event) {
      element.removeEventListener(event, handler, false);
    }
  },
  // 位置信息
  position(el: HTMLElement) {
    const box = el.getBoundingClientRect();
    // html元素对象的上/左边框的宽度
    const { clientTop, clientLeft } = document.documentElement;
    const { pageYOffset, pageXOffset } = window;
    return {
      top: box.top - clientTop,
      left: box.left - clientLeft,
      height: box.height,
      width: box.width,
      pageYOffset,
      pageXOffset,
    };
  },
  el(attr: string, doc?: any) {
    if (!this.isHTMLElement(doc)) return document.querySelector(attr);
    return doc.querySelector(attr);
  },
  els(attr: string, doc?: HTMLElement | Document) {
    if (!doc) doc = document;
    return [].slice.call(doc.querySelectorAll(attr));
  },
  hasClass(el: HTMLElement, cls: string) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
      return el.classList.contains(cls);
    }
    return ` ${el.className} `.indexOf(` ${cls} `) > -1;
  },
  addClass(el: HTMLElement, cls: string) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    // eslint-disable-next-line no-plusplus
    for (let i = 0, j = classes.length; i < j; i++) {
      const clsName = classes[i];
      // eslint-disable-next-line no-continue
      if (!clsName) continue;

      if (el.classList) {
        el.classList.add(clsName);
      } else if (!this.hasClass(el, clsName)) {
        curClass += ` ${clsName}`;
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  },
  removeClass(el: HTMLElement, cls: string) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ` ${el.className} `;

    // eslint-disable-next-line no-plusplus
    for (let i = 0, j = classes.length; i < j; i++) {
      const clsName = classes[i];
      // eslint-disable-next-line no-continue
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else if (this.hasClass(el, clsName)) {
        curClass = curClass.replace(` ${clsName} `, ' ');
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  },
  append(el: HTMLElement, doc?: HTMLElement | Document) {
    if (!doc) doc = document.body;
    doc.appendChild(el);
  },
  remove(el: HTMLElement) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  },
  isHTMLElement(node: any) {
    return node instanceof window.HTMLElement || node instanceof HTMLElement;
  },
  getScrollParent(node: any): any {
    try {
      // eslint-disable-next-line no-inner-declarations, no-shadow
      function isScrollParent(node: any, type = 'y') {
        // Firefox wants us to check `-x` and `-y` variations as well
        // eslint-disable-next-line no-underscore-dangle
        const _getComputedStyle = window.getComputedStyle(node);
        const { overflow } = _getComputedStyle;
        const { overflowX } = _getComputedStyle;
        const { overflowY } = _getComputedStyle;
        const str = (type === 'y' ? overflowY : overflowX) || overflow;
        // auto|scroll|overlay|hidden
        return /scroll|overlay|auto/.test(str);
      }
      const { parentNode } = node;
      if (!this.isHTMLElement(parentNode)) return node;
      if (isScrollParent(parentNode)) {
        return parentNode;
      }
      return this.getScrollParent(parentNode);
    } catch (e) {
      //
    }
    return window;
  },
  setTransform(node: any, vale: string) {
    const arr = ['webkit', 'Moz', 'O', 'ms'].map((i) => `${i}Transform`);
    arr.unshift('transform');
    if (!this.isHTMLElement(node)) return;
    // eslint-disable-next-line no-restricted-syntax
    for (const index in arr) {
      if (node.style[arr[index]] !== undefined) {
        // eslint-disable-next-line consistent-return, no-return-assign
        return (node.style[arr[index]] = vale);
      }
    }
  },
};

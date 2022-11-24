import indexOf from 'lodash-es/indexOf';

const re = /\s+/;

export class ClassList {
  el: Element;
  list: DOMTokenList;

  constructor(el: Element) {
    if (!el || !el.nodeType) {
      throw new Error('A DOM element reference is required');
    }
    this.el = el;
    this.list = el.classList;
  }

  array() {
    const className = this.el.getAttribute('class') || '';
    const str = className.replace(/^\s+|\s+$/g, '');
    const arr = str.split(re);
    if ('' === arr[0]) arr.shift();
    return arr;
  }

  add(name: string): ClassList {
    if (this.list) {
      this.list.add(name);
      return this;
    }

    const arr = this.array();
    const i = indexOf(arr, name);
    if (!~i) arr.push(name);
    this.el.className = arr.join(' ');
    return this;
  }

  remove(name: string | RegExp): ClassList {
    if ('[object RegExp]' === toString.call(name)) {
      return this._removeMatching(name as RegExp);
    }

    if (this.list) {
      this.list.remove(name as string);
      return this;
    }

    const arr = this.array();
    const i = indexOf(arr, name);
    if (~i) arr.splice(i, 1);
    this.el.className = arr.join(' ');
    return this;
  }

  _removeMatching(re: RegExp): ClassList {
    const arr = this.array();
    for (let i = 0; i < arr.length; i++) {
      if (re.test(arr[i])) {
        this.remove(arr[i]);
      }
    }
    return this;
  }

  toggle(name: string, force: boolean): ClassList {
    if (this.list) {
      if ('undefined' !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name);
        }
      } else {
        this.list.toggle(name);
      }
      return this;
    }

    if ('undefined' !== typeof force) {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }
    return this;
  }

  has(name: string) {
    return this.list ? this.list.contains(name) : !!~indexOf(this.array(), name);
  }

  contains(name: string) {
    return this.has(name);
  }
}

export default function (el: Element): ClassList {
  return new ClassList(el);
}

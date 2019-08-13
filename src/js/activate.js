// activate.js

export default class Activation {
  constructor(targetId, target, cls) {
    this.targetId = document.getElementById(targetId);
    this.targets = [...this.targetId.querySelectorAll(target)];
    this.cls = cls;
    this.prev = null;
    this.next = null;
    this.isActivated = false;
  }

  activate(target) {
    this.next = target;
    if (this.next.classList.contains(this.cls)) {
      this.isActivated = false;
      return;
    }
    this.prev = this.targetId.querySelector(`.${this.cls}`);
    if (this.prev) {
      this.prev.classList.remove(this.cls);
    }
    this.next.classList.add(this.cls);
    // Handle focus for assistive tecnologies
    this.next.focus();
    this.isActivated = true;
  }
}

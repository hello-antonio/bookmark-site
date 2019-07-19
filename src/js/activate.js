// activate.js

export default class Activation {
  constructor(targetId, target, activeClass) {
    this.targetId = document.getElementById(targetId);
    this.targets = [...this.targetId.querySelectorAll(target)];
    this.activeClass = activeClass;
    this.prev = null;
    this.next = null;
    this.isActivated = false;
  }

  activate(target) {
    this.next = target;
    if (this.next.classList.contains(this.activeClass)) {
      this.isActivated = false;
      return;
    }
    this.prev = this.targetId.querySelector(`.${this.activeClass}`);
    if (this.prev) {
      this.prev.classList.remove(this.activeClass);
    }
    this.next.classList.add(this.activeClass);
    // Handle focus for assistive tecnologies
    this.next.focus();
    this.isActivated = true;
  }
}

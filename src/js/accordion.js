// Accordion
import ActivateAccordion from "./activate.js";

class Accordion extends ActivateAccordion {
  constructor(elId, target, targetBody, activeClass, focusCls) {
    super(elId, target, activeClass);
    this.position = 0;
    this.contents = [...this.targetId.querySelectorAll(targetBody)];
    this.focusCls = focusCls;
    this.KEYS = {
      up: "ArrowUp",
      down: "ArrowDown",
      home: "Home",
      end: "End",
      enter: "Enter",
      space: "Space"
    };
  }

  selection(target) {
    if (target == null) return;
    let _state = target.classList.contains(this.activeClass);

    target.setAttribute("aria-expanded", _state);
    let temp = this.contents.find(
      c => c.id === target.getAttribute("aria-controls")
    );
    temp.setAttribute("aria-hidden", !_state);
    temp.tabIndex = !_state ? -1 : 0;
  }

  handleClick({ currentTarget }) {
    this.activate(currentTarget);

    if (this.isActivated) {
      this.selection(this.prev);
      this.selection(this.next);
    }
  }

  init() {
    this.targets.forEach((target, index) => {
      let id = `ID-b-${index}`;
      target.setAttribute("aria-expanded", false);
      target.setAttribute("aria-controls", id);
      target.addEventListener("click", this.handleClick.bind(this));

      this.contents[index].id = id;
      this.contents[index].setAttribute("role", "region");
      // this.contents[index].setAttribute("aria-live", "polite");
      this.contents[index].setAttribute("aria-hidden", true);
    });
    this.targetId.classList.add(this.focusCls);
  }
}

const accordionComponent = new Accordion(
  "js-accordion",
  "button",
  ".accordion__body",
  "js-active-accordion",
  "js-focus-accordion"
);
accordionComponent.init();

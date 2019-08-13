// tabs.js

/**
 * Tabs:
 * - Target ID
 * - Target Controls
 * - Target Contents
 * - Add activation for each Target Control
 * - Add click events for users using mouse/pointer
 * - Add keyboard event for users using keyboard
 * - Set appropiate aria to all the targets
 */
import ActivateTab from "./activate.js";

class Tabs extends ActivateTab {
  constructor(target, tabs, contents, activeTab, activeContent) {
    super(target, tabs, activeTab);
    this.contents = [...this.targetId.querySelectorAll(contents)];
    this.activeTab = activeTab;
    this.activeContent = activeContent;
    this._tabPosition = 0;
  }
  // Set attributes helper
  attr(target, obj) {
    if (typeof obj === "object") {
      if (Object.entries(obj).length > 0) {
        for (const key in obj) {
          target.setAttribute(key, obj[key]);
        }
        return;
      }
      target.setAttribute(Object.keys(obj)[0], Object.values(obj)[0]);
    } else return;
  }
  // Remove attributes helper
  removeAttr(target, arr) {
    if (arr.length === 0) return;
    if (arr.length > 0) {
      for (const value of arr) {
        target.removeAttribute(value);
      }
      return;
    }
    target.removeAttribute(arr[0]);
  }
  // Previous tab
  prevTab() {
    if (this.prev == null) return;
    let prevContent = this.selectContent(this.prev.name);
    prevContent.classList.remove(this.activeContent);
    this.attr(prevContent, {
      tabindex: -1
    });
  }
  // Next tab
  nextTab() {
    if (this.next == null) return;
    let nextContent = this.selectContent(this.next.name);
    nextContent.classList.add(this.activeContent);
    this.attr(nextContent, {
      tabindex: 0
    });
  }
  // Handle content selection
  selectContent(id) {
    return this.contents.find(content => content.id === id);
  }

  // Handle tab selection
  selectTab(target) {
    this.activate(target);

    if (this.isActivated) {
      this.targets.forEach(item => {
        if (item.classList.contains(this.activeTab)) {
          this.attr(item, {
            tabindex: 0,
            "aria-selected": true
          });
        } else {
          this.attr(item, {
            tabindex: -1,
            "aria-selected": false
          });
        }
      });

      this.prevTab();
      this.nextTab();
    }
  }

  // handle click events
  handleClick({ target }) {
    this.selectTab(target);
  }
  // Add keyboard controls
  handleKeyboard(evt) {
    const { code } = evt;
    const KEYS = {
      home: "Home",
      end: "End",
      left: "ArrowLeft",
      right: "ArrowRight"
    };
    if (evt.defaultPrevented) return;
    if (Object.values(KEYS).includes(code)) {
      // switch between tabs with keyboard
      const { home, end, left, right } = KEYS;
      switch (code) {
        case left:
          this._tabPosition--;
          break;
        case right:
          this._tabPosition++;
          break;
        case home:
          this._tabPosition = 0;
          break;
        case end:
          this._tabPosition = this.targets.length - 1;
          break;
      }
      // Test start and end, loop back.
      if (this._tabPosition >= this.targets.length) this._tabPosition = 0;
      else if (this._tabPosition < 0)
        this._tabPosition = this.targets.length - 1;
      // Now make tab selection
      this.selectTab(this.targets[this._tabPosition]);
      evt.preventDefault();
    }
  }
  // initialize
  init() {
    this.contents[0].classList.add(this.activeContent);
    this.targets[0].classList.add(this.activeTab);
    this.targets.forEach((target, index) => {
      let id = `tabID-${index}`;
      this.attr(target, {
        role: "tab",
        name: id,
        tabindex: index > 0 ? -1 : 0,
        "aria-selected": index > 0 ? false : true,
        "aria-controls": id
      });

      this.attr(this.contents[index], {
        id: id,
        tabindex: index > 0 ? -1 : 0,
        role: "tabpanel"
      });
      target.addEventListener("click", this.handleClick.bind(this));
    });
    // Finds targets parent and adds keyboard event
    this.targets[0].parentElement.addEventListener(
      "keydown",
      this.handleKeyboard.bind(this)
    );
    console.log(this);
  }
}

const tabs = new Tabs(
  "js-tabs",
  "button",
  ".tabs__content",
  "js-active-tab",
  "js-active-content"
);

tabs.init();

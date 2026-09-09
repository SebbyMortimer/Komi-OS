import { dragElement } from "./draggable-window.js";

let windows = [];

class App {
    constructor(name) {
        this.name;
    }
}

export class Window {
    constructor(title) {
        this.title = title;
        this.element = this.#createElement();

        moveWindowToTop(this.element);
        this.element.addEventListener("mousedown", () =>
            moveWindowToTop(this.element)
        );
        this.element.querySelector(".closeButton").addEventListener("click", () =>
            this.close()
        );
        dragElement(this.element);
    }
    // encapsulate this function since its only meant to be used in the window class constructor
    #createElement() {
        const template = document.getElementById(`${this.title}-template`)

        // we get a fragment that basically holds everything inside the template in case theres multiple divs, but it gets dumped by javascript automatically
        const fragment = template.content.cloneNode(true);
        // get the actual element and return that
        const actualElement = fragment.firstElementChild;

        actualElement.id = crypto.randomUUID();

        document.body.appendChild(fragment);
        return actualElement;
    }
    close() {
        windows = windows.filter(w => w !== this.element);
        this.element.remove();
    }
}

function updateWindowOrder() {
    windows.forEach((window, i) => {
        window.style.zIndex = i + 1;
    });
}

function moveWindowToTop(element) {
    windows.at(-1)?.classList.remove("focusedWindow");
    element.classList.add("focusedWindow");

    // remove element from array and reinsert it at the end to have it focus on top
    windows = windows.filter(w => w !== element);
    windows.push(element);
    updateWindowOrder();
}
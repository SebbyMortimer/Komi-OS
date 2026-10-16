import { Window } from "../window.js";

export class Minecraft extends Window {
    constructor() {
        super("minecraft");

        this.iframe = this.element.querySelector('[data-element="minecraft-iframe"]');

        this.iframe.addEventListener("load", () => this.focusIframe());
        this.iframe.addEventListener("click", () => this.focusIframe());
    }

    focusIframe() {
        this.iframe.focus();
        this.iframe.contentWindow.focus();
    }
}
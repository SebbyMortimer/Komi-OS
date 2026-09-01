import { Window } from "./window.js";

var selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

export function handleIconTap(element, window) {
    element.classList.remove("selected");
    new Window(window);
}
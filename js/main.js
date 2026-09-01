import { initClock } from "./modules/clock.js";
import { handleIconTap } from "./modules/desktop.js";
import { dragElement } from "./modules/draggable-window.js";
import { Window, closeWindow, initWindow, openWindow } from "./modules/window.js";

initClock();
// initWindow("welcome");
// initWindow("chocolat");

const welcome = new Window("welcome");

document.getElementById("chocolat-desktop").addEventListener("dblclick", () => handleIconTap(document.getElementById("chocolat-desktop"), "chocolat"));

document.getElementById("welcomeopen").addEventListener("click", () => openWindow(document.getElementById("welcome")));

document.getElementById("welcomeopen").addEventListener("click", () => openWindow(document.getElementById("welcome")));

document.addEventListener("click", function(event) {
    document.querySelectorAll(".desktopApp.selected").forEach(el => el.classList.remove("selected"));

    const desktopAppTarget = event.target.closest(".desktopApp");
    if (desktopAppTarget) {
        desktopAppTarget.classList.add("selected");
    }
});
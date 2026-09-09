import { initClock } from "./clock.js";
import { handleIconTap } from "./desktop.js";
import { Window } from "./window.js";

initClock();

new Window("welcome");

for (const child of document.getElementById("desktopApps").children) {
    child.addEventListener("dblclick", () => handleIconTap(child, child.dataset.app));
}

document.addEventListener("click", function(event) {
    document.querySelectorAll(".desktopApp.selected").forEach(el => el.classList.remove("selected"));

    const desktopAppTarget = event.target.closest(".desktopApp");
    if (desktopAppTarget) {
        desktopAppTarget.classList.add("selected");
    }
});

document.getElementById("boot-button").addEventListener("click", function(event) {
    document.getElementById("boot-button").parentNode.style.display = "none";
    document.getElementById("boot-video").volume = 0.7;
    document.getElementById("boot-video").play();

    setTimeout(() => {
        document.getElementById("boot-div").style.display = "none";
    }, 7000);
});
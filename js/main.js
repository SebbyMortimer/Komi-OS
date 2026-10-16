import { initClock } from "./clock.js";
import { copyText, pasteText } from "./contextMenu.js";
import { handleIconTap } from "./desktop.js";
import { Window } from "./window.js";

initClock();

new Window("welcome");

for (const child of document.getElementById("desktopApps").children) {
    child.addEventListener("dblclick", () => handleIconTap(child, child.dataset.app));
}

for (const child of document.getElementById("taskbar").children) {
    child.addEventListener("click", () => handleIconTap(child, child.dataset.app));
}

document.addEventListener("click", function(event) {
    contextMenu.style.display = "none";
    
    document.querySelectorAll(".desktopApp.selected").forEach(el => el.classList.remove("selected"));

    const desktopAppTarget = event.target.closest(".desktopApp");
    if (desktopAppTarget) {
        desktopAppTarget.classList.add("selected");
    }
});

document.getElementById("boot-button").addEventListener("click", function(event) {
    document.getElementById("boot-button").parentNode.style.display = "none";
    document.getElementById("boot-video").volume = 0.5;
    document.getElementById("boot-video").play();

    document.getElementById("boot-video").addEventListener("timeupdate", function() {
        if (document.getElementById("boot-video").currentTime >= 6.75) {
            document.getElementById("boot-div").style.display = "none";
        }
    });
});

const contextMenu = document.getElementById("contextMenu")

document.addEventListener("contextmenu", function(event) {
    event.preventDefault();

    const isInput = event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA";

    if (isInput) {
        targetedInput = event.target;
    }

    const x = event.pageX;
    const y = event.pageY;

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.display = "block";
})

document.getElementById("contextMenuCopy").addEventListener("mousedown", (event) => {
    // prevent pressing the button from removing the focus of selected text, so we can actually copy it
    event.preventDefault();
})
document.getElementById("contextMenuCopy").addEventListener("click", () => {
    copyText();
})

document.getElementById("contextMenuPaste").addEventListener("mousedown", (event) => {
    event.preventDefault();
})
document.getElementById("contextMenuPaste").addEventListener("click", () => {
    pasteText();
})
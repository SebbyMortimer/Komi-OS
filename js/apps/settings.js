import { Window } from "../window.js";

export class Settings extends Window {
    constructor() {
        super("settings");

        this.leftButtons = this.element.querySelector('[data-element="left-buttons"]');
        this.rightTabs = this.element.querySelector('[data-element="right-tabs"]');

        this.wallpaperTab = this.element.querySelector('[data-element="wallpaper-tab"]');
        this.aboutTab = this.element.querySelector('[data-element="about-tab"]');

        this.wallpaperContainer = this.element.querySelector('[data-element="wallpaper-container"]');

        this.#setupSettings();
    }

    #setupSettings() {
        fetch('./media/wallpapers/wallpapers.json')
            .then(response => response.json())
            .then(jsonData => {
                this.#loopWallpapers(jsonData);
            });
        
        for (const button of this.leftButtons.children) {
            button.addEventListener("click", () => {
                this.changeTab(button.dataset.tab);
            });
        }
    }

    #loopWallpapers(wallpapers) {
        for (let wallpaper of wallpapers) {
            const wallpaperElement = new Image(200);
            wallpaperElement.src = `./media/wallpapers/${wallpaper}`;
            wallpaperElement.style.display = "block";
            this.wallpaperContainer.appendChild(wallpaperElement);

            wallpaperElement.addEventListener("click", () => {
                this.changeWallpaper(wallpaper);
            });
        }
    }

    changeTab(tab) {
        for (const tab of this.rightTabs.children) {
            tab.style.display = "none";
        }

        this.element.querySelector(`[data-element="${tab}"]`).style.display = "block";
    }

    changeWallpaper(wallpaper) {
        document.body.style.backgroundImage = `url('./media/wallpapers/${wallpaper}')`;
        localStorage.setItem("wallpaper", wallpaper);
    }
}
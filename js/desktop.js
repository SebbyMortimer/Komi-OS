import { Minecraft } from "./apps/minecraft.js";
import { MusicPlayer } from "./apps/musicPlayer.js";
import { Notes } from "./apps/notes.js";
import { Settings } from "./apps/settings.js";

const apps = {
    chocolat: Notes,
    hyaku: MusicPlayer,
    settings: Settings,
    minecraft: Minecraft
}

export function handleIconTap(element, appName) {
    element.classList.remove("selected");

    const App = apps[appName];
    new App();
}
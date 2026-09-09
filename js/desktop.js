import { MusicPlayer } from "./apps/musicPlayer.js";
import { Notes } from "./apps/notes.js";

const apps = {
    chocolat: Notes,
    hyaku: MusicPlayer
}

export function handleIconTap(element, appName) {
    element.classList.remove("selected");

    const App = apps[appName];
    new App();
}
// const musicPlayer = document.getElementById("music-player-audio");

// const backgroundCoverArt = document.getElementById("music-player-background");
// const coverArt = document.getElementById("music-player-cover-art");
// const title = document.getElementById("music-player-title");
// const artist = document.getElementById("music-player-artist");

import { Window } from "../window.js";

const playlist = [
    "シンデレラ - Cidergirl",
    "Hikare Inochi - Kitri",
    "青100色 - 伊藤美来",
    "小喋日和 - FantasticYouth"
]

function formatTime(seconds) {
    // Return early if the duration is not a valid number yet
    if (isNaN(seconds)) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    const formattedMins = mins.toString();
    const formattedSecs = secs.toString().padStart(2, '0');

    return `${formattedMins}:${formattedSecs}`;
}

export class MusicPlayer extends Window {
    constructor() {
        super("hyaku");

        this.audio = new Audio();
        this.currentSongIndex = 0;

        this.backgroundCoverArt = this.element.querySelector('[data-element="cover-art-background"]');
        this.coverArt = this.element.querySelector('[data-element="cover-art"]');
        this.songName = this.element.querySelector('[data-element="song-name"]');
        this.artistName = this.element.querySelector('[data-element="artist-name"]');
        this.previousButton = this.element.querySelector('[data-element="previous-button"]');
        this.playButton = this.element.querySelector('[data-element="play-button"]');
        this.skipButton = this.element.querySelector('[data-element="skip-button"]');
        this.playbackSlider = this.element.querySelector('[data-element="playback-slider"]');
        this.timestampCurrent = this.element.querySelector('[data-element="timestamp-current"]');
        this.timestampTotal = this.element.querySelector('[data-element="timestamp-total"]');
        this.volumeSlider = this.element.querySelector('[data-element="volume-slider"]');

        this.#setupMusicPlayer();
    }

    #setupMusicPlayer() {
        this.loadSong(playlist[this.currentSongIndex]);

        this.previousButton.addEventListener("click", () => {
            this.previous();
        })

        this.playButton.addEventListener("click", () => {
            this.togglePlay();
        })

        this.skipButton.addEventListener("click", () => {
            this.skip();
        })

        this.playbackSlider.addEventListener("input", () => {
            this.audio.currentTime = this.playbackSlider.value;
        })

        this.volumeSlider.addEventListener("input", () => {
            this.audio.volume = this.volumeSlider.value;
        })

        this.audio.addEventListener("ended", () => {
            this.skip();
        })
        this.audio.addEventListener("loadedmetadata", () => {
            this.playbackSlider.max = this.audio.duration;
            this.timestampTotal.innerText = formatTime(this.audio.duration);
        })
        this.audio.addEventListener("timeupdate", () => {
            this.playbackSlider.value = this.audio.currentTime;
            this.timestampCurrent.innerText = formatTime(this.audio.currentTime);
        })
    }

    previous() {
        if (this.currentSongIndex > 0) {
            this.currentSongIndex--;
        } else {
            this.currentSongIndex = playlist.length - 1;
        }
        this.loadSong(playlist[this.currentSongIndex]);
    }

    skip() {
        if (this.currentSongIndex < playlist.length - 1) {
            this.currentSongIndex++;
        } else {
            this.currentSongIndex = 0;
        }
        this.loadSong(playlist[this.currentSongIndex]);
    }

    togglePlay() {
        if (this.audio.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    play() {
        this.audio.play();
        this.playButton.querySelector("img").src = "media/pause.png";
    }

    pause() {
        this.audio.pause();
        this.playButton.querySelector("img").src = "media/play.png";
    }

    loadSong(musicName) {
        const coverArtURL = `media/audio/coverArt/${musicName}.jpg`;
        const musicURL = `media/audio/music/${musicName}.mp3`;

        this.backgroundCoverArt.src = coverArtURL;
        this.coverArt.src = coverArtURL;

        const wasPlaying = (!this.audio.paused) || this.audio.ended;
        this.audio.src = musicURL;
        if (wasPlaying) {
            this.audio.play();
        }
        
        [this.songName.innerText, this.artistName.innerText] = musicName.split(" - ");
    }

    close() {
        this.audio.pause();
        this.audio.src = "";

        super.close();
    }
}
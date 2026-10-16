export function initClock() {
    var topBarClock = document.getElementById("top-bar-clock");

    topBarClock.innerHTML = new Date().toLocaleTimeString(); // set immediately
    setInterval(function() {
        topBarClock.innerHTML = new Date().toLocaleTimeString();
    }, 1000);
}
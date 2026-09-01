export function initClock() {
    var topBarClock = document.getElementById("top-bar-clock");

    setInterval(function() {
        topBarClock.innerHTML = new Date().toLocaleString();
    }, 1000);
}
"use strict";

const songsList = [
    { id: 0, title: "Let Me Hold You", author: "Cheat Codes, Dante Klein", song: "../images/Let_Me_Hold_You.mp3" },
    { id: 1, title: "Criminal", author: "Britney Spears", song: "../images/Criminal.mp3" },
    { id: 2, title: "Saxobeat", author: "Alexandra Stan", song: "../images/Saxobeat.mp3" },
    { id: 3, title: "Stay With Me", author: "Akcent", song: "../images/Stay_With_Me.mp3" },
    { id: 4, title: "That's My Name", author: "Akcent", song: "../images/Thats_My_Name.mp3" },
    { id: 5, title: "The Spark", author: "Akcent", song: "../images/The_Spark.mp3" },
    { id: 6, title: "We Found Love", author: "Rihanna", song: "../images/We_Found_Love.mp3" },
    { id: 6, title: "Love Stoned", author: "Rihanna", song: "../images/Love_Stoned.mp3" },
];

var list = document.querySelector("#list");
var title = document.querySelector("#title");
var author = document.querySelector("#author");
var play = document.querySelector("#play");
var range = document.querySelector("#range");
var playIcon = document.querySelector("#playIcon");
var pauseIcon = document.querySelector("#pauseIcon");
var songLength = document.querySelector("#songLength");
var updateTime = document.querySelector("#updateTime");
var fillColor = document.querySelector("#fillColor");

var audio = new Audio();
var currentSong = 0;
var currentTime = 0;
var durationVal = 0;
var isPlaying = true;
var playStatus = false;
// pauseIcon.style.display = "none";

const playSong = () => {
    const newSong = songsList.find(res => res.id === currentSong);
    // const newSong = songsList[currentSong];
    audio.src = newSong?.song;
    var promise = audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
    audio.onloadeddata = () => {
        // audio.muted = false;
        // audio.play();
        durationVal = audio.duration;
        range.max = durationVal;
        songLength.textContent = formatTime(durationVal);
        title.textContent = newSong?.title;
        author.textContent = newSong?.author;
        play.classList.remove("play1");
    }
    // isPlaying = false;

    play.addEventListener("click", () => {
        if (isPlaying) {
            audio.muted = false;
            audio.play();
            isPlaying = false;
            durationVal = audio.duration;
            range.max = durationVal;
            songLength.textContent = formatTime(durationVal);
            play.classList.remove("play1");
            // pauseIcon.style.display = "block";
            // playIcon.style.display = "none";
            title.textContent = newSong?.title;
            author.textContent = newSong?.author;
        } else {
            audio.muted = false;
            audio.pause();
            isPlaying = true;
            play.classList.add("play1");
            // playIcon.style.display = "block";
            // pauseIcon.style.display = "none";
        }

    });



    range.addEventListener("change", () => {
        audio.currentTime = range.value;
    });

    audio.addEventListener("timeupdate", () => {
        range.value = audio.currentTime;
        let updateWidth = audio.currentTime / audio.duration;
        fillColor.style.width = updateWidth * 100 + "%";
        updateTime.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
        // play.classList.add("play1");
        // audio.currentTime = 0;
        // audio.pause();
        if (currentSong <= songsList.length) {
            currentSong++;
        } else {
            currentSong = 0
        }
        playSong();
        playList();
    });
}

const nextSong = () => {
    if (currentSong <= songsList.length) {
        currentSong++;
    } else {
        currentSong = 0
    }
    playSong();
    playList();
}

const prevSong = () => {
    if (currentSong !== 0) {
        if (currentSong <= songsList.length && currentSong > 0) {
            currentSong--;
        } else {
            currentSong = 0
        }
        playSong();
        playList();
    }
}

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = (seconds % 60).toFixed(0);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
        .filter(a => a)
        .join(':')
}

const playList = () => {
    var newValues = [];
    songsList.map((list) => {
        let item = `<div class="playlist ${currentSong === list?.id ? 'active' : ''}" id=${list?.id}>
        <div class="songinfo">
            <h6 class="songinfo-name">${list?.title}</h6>
            <p class="songinfo-author">${list?.author}</p>
        </div>
        <div class="song-status">
            <button class="player-bottom play ${currentSong === list?.id ? 'play1' : ''}" onClick="playSongFromList(${list?.id})">
                <i class="fas fa-play ml-1"></i>
                <i class="fas fa-pause"></i>
            </button>
        </div>
    </div>`;
        newValues.push(item);
    });
    list.innerHTML = newValues.join("");
}

const playSongFromList = (val) => {
    if (currentSong === val) {
        return
    }
    currentSong = val;
    playSong();
    playList();
}
playList();
window.onload = playSong;
// window.onload = playList;
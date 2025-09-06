console.log("Welcome to Spotify");

//initial the variable 
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let masterSongName = document.getElementsByClassName('masterSongName')[0];
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let song = [
    {songName: "Jutti Meri", filePath:"songs/1.mp3", coverPath:"covers/1.jpeg"}, 
    {songName: "Pal Pal Dil Ke Paas", filePath:"songs/2.mp3", coverPath:"covers/2.jpeg"},
    {songName: "Dil Ibaadat", filePath:"songs/3.mp3", coverPath:"covers/3.jpeg"},
    {songName: "O' Meri Laila", filePath:"songs/4.mp3", coverPath:"covers/4.jpeg"},
    {songName: "Maula Mere Maula", filePath:"songs/5.mp3", coverPath:"covers/5.jpeg"},
    {songName: "Maahi", filePath:"songs/6.mp3", coverPath:"covers/6.jpeg"},
    {songName: "Tere Bina", filePath:"songs/7.mp3", coverPath:"covers/7.jpeg"},
    {songName: "Dil Ka Jo Haal Hai", filePath:"songs/8.mp3", coverPath:"covers/8.jpeg"},
]

songItems.forEach((element,i)=> {
    element.getElementsByTagName('img')[0].src = song[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = song[i].songName; 
});
//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } 
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});


//listen to events
audioElement.addEventListener('timeupdate', () => {
    //update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});


const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = song[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex < song.length - 1) {
        songIndex = (songIndex + 1) % song.length;
    }
    else {
        songIndex = song.length - 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex > 0) {
        songIndex = (songIndex - 1) % song.length;
    }
    else {
        songIndex = 0;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});



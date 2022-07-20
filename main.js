//intiliaze variable
let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songitem'));
let masterSongName=document.getElementById('masterSongName');
let five_pre=document.getElementById('5previous');
let five_next=document.getElementById('5next');

let songs = [
    { songName: "Survive The Night", filepath: "songs/1.mp3", coverPath: "cover/1.jfif" },
    { songName: "Count me Out", filepath: "songs/2.mp3", coverPath: "cover/2.jfif" },
    { songName: "Calling my Name", filepath: "songs/3.mp3", coverPath: "cover/3.jfif" },
    { songName: "Down Hill", filepath: "songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "First class", filepath: "songs/5.mp3", coverPath: "cover/5.jfif" },
    { songName: "Talk Of The Town", filepath: "songs/6.mp3", coverPath: "cover/6.jpg" },
    { songName: "Born Sinner", filepath: "songs/7.mp3", coverPath: "cover/7.jpg" },
    { songName: "Trouble", filepath: "songs/8.mp3", coverPath: "cover/8.jpg" },
]
songItem.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})
// audioElement.play();


//event listener
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
}
)



audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makePlayAll = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makePlayAll();
        songIndex = parseInt(e.target.id);
        if (audioElement.paused || audioElement.currentTime <= 0) {
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterSongName.innerHTML= songs[songIndex-1].songName;
        }
        else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            gif.style.opacity = 0;
            masterSongName.innerHTML= songs[songIndex-1].songName;
        }
    //     makePlayAll();
    //     songIndex = parseInt(e.target.id);
    //     e.target.classList.remove('fa-play');
    //     e.target.classList.add('fa-pause');
    //     audioElement.src = `songs/${songIndex}.mp3`;
    //     audioElement.play();
    //     audioElement.currentTime = 0;
    //     gif.style.opacity = 1;
    // masterSongName.innerHTML= songs[songIndex-1].songName;

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9)
    {
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    masterSongName.innerHTML= songs[songIndex-1].songName;
    audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play();
        audioElement.currentTime = 0;
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1)
    {
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    masterSongName.innerHTML= songs[songIndex-1].songName;
    audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play();
        audioElement.currentTime = 0;
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

})

five_pre.addEventListener('click',()=>{
    audioElement.currentTime=audioElement.currentTime-5;  
})

five_next.addEventListener('click',()=>{
    audioElement.currentTime=audioElement.currentTime+5;
})
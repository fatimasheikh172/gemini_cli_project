document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playlist = document.getElementById('playlist');
    const playerTitle = document.querySelector('.player__title');
    const playerSubtitle = document.querySelector('.player__subtitle');
    const playerImg = document.querySelector('.player__img-img');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const shuffleBtn = document.getElementById('shuffle');
    const progressContainer = document.querySelector('.player__progress-container');
    const progress = document.querySelector('.player__progress');
    const currentTimeEl = document.querySelector('.player__time-current');
    const totalTimeEl = document.querySelector('.player__time-total');
    const volumeSlider = document.getElementById('volume');
    const themeSwitch = document.getElementById('theme-switch');

    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    const songs = [
        {
            title: 'Acoustic Breeze',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
            img: 'https://www.bensound.com/bensound-img/acousticbreeze.jpg'
        },
        {
            title: 'Sunny',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
            img: 'https://www.bensound.com/bensound-img/sunny.jpg'
        },
        {
            title: 'Creative Minds',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
            img: 'https://www.bensound.com/bensound-img/creativeminds.jpg'
        },
        {
            title: 'Adventure',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-adventure.mp3',
            img: 'https://www.bensound.com/bensound-img/adventure.jpg'
        },
        {
            title: 'A New Beginning',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3',
            img: 'https://www.bensound.com/bensound-img/anewbeginning.jpg'
        },
        {
            title: 'All That',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-allthat.mp3',
            img: 'https://www.bensound.com/bensound-img/allthat.jpg'
        },
        {
            title: 'Badass',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-badass.mp3',
            img: 'https://www.bensound.com/bensound-img/badass.jpg'
        },
        {
            title: 'Dreams',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-dreams.mp3',
            img: 'https://www.bensound.com/bensound-img/dreams.jpg'
        },
        {
            title: 'Better Days',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-betterdays.mp3',
            img: 'https://www.bensound.com/bensound-img/betterdays.jpg'
        },
        {
            title: 'Clear Day',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-clearday.mp3',
            img: 'https://www.bensound.com/bensound-img/clearday.jpg'
        },
        {
            title: 'Cute',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-cute.mp3',
            img: 'https://www.bensound.com/bensound-img/cute.jpg'
        },
        {
            title: 'Dubstep',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-dubstep.mp3',
            img: 'https://www.bensound.com/bensound-img/dubstep.jpg'
        },
        {
            title: 'Endless Motion',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-endlessmotion.mp3',
            img: 'https://www.bensound.com/bensound-img/endlessmotion.jpg'
        },
        {
            title: 'Energy',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
            img: 'https://www.bensound.com/bensound-img/energy.jpg'
        },
        {
            title: 'Epic',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-epic.mp3',
            img: 'https://www.bensound.com/bensound-img/epic.jpg'
        },
        {
            title: 'Evolution',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-evolution.mp3',
            img: 'https://www.bensound.com/bensound-img/evolution.jpg'
        },
        {
            title: 'Extreme Action',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-extremeaction.mp3',
            img: 'https://www.bensound.com/bensound-img/extremeaction.jpg'
        },
        {
            title: 'Going Higher',
            artist: 'Bensound',
            src: 'https://www.bensound.com/bensound-music/bensound-goinghigher.mp3',
            img: 'https://www.bensound.com/bensound-img/goinghigher.jpg'
        }
    ];

    let songIndex = 0;
    let isShuffled = false;
    let shuffledSongs = [];

    function loadSong(song) {
        playerTitle.textContent = song.title;
        playerSubtitle.textContent = song.artist;
        audio.src = song.src;
        playerImg.src = song.img;
    }

    function playSong() {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        updatePlaylist();
    }

    function pauseSong() {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }

    function prevSong() {
        songIndex--;
        const currentSongs = isShuffled ? shuffledSongs : songs;
        if (songIndex < 0) {
            songIndex = currentSongs.length - 1;
        }
        loadSong(currentSongs[songIndex]);
        playSong();
    }

    function nextSong() {
        songIndex++;
        const currentSongs = isShuffled ? shuffledSongs : songs;
        if (songIndex > currentSongs.length - 1) {
            songIndex = 0;
        }
        loadSong(currentSongs[songIndex]);
        playSong();
    }

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Update time
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        };

        currentTimeEl.textContent = formatTime(currentTime);
        if (duration) {
            totalTimeEl.textContent = formatTime(duration);
        }
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }



    function setVolume() {
        audio.volume = volumeSlider.value;
    }

    function createPlaylist() {
        playlist.innerHTML = ''; // Explicitly clear the playlist
        const currentSongs = isShuffled ? shuffledSongs : songs;
        currentSongs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            li.dataset.index = index;
            playlist.appendChild(li);
        });
    }

    function updatePlaylist() {
        const playlistItems = playlist.querySelectorAll('li');
        const currentSongs = isShuffled ? shuffledSongs : songs;
        const currentSongIndex = isShuffled ? songIndex : songs.indexOf(currentSongs[songIndex]);

        playlistItems.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function selectTrack(e) {
        if (e.target.tagName === 'LI') {
            songIndex = parseInt(e.target.dataset.index);
            const currentSongs = isShuffled ? shuffledSongs : songs;
            loadSong(currentSongs[songIndex]);
            playSong();
        }
    }

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        themeSwitch.checked = isDark;
        localStorage.setItem('darkTheme', isDark);
    }

    function loadTheme() {
        const isDark = localStorage.getItem('darkTheme') === 'true';
        if (isDark) {
            document.body.classList.add('dark-theme');
            themeSwitch.checked = true;
        }
    }

    function shuffleSongs() {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);

        if (isShuffled) {
            shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
            songIndex = 0;
            loadSong(shuffledSongs[songIndex]);
            playSong();
        } else {
            const currentSong = shuffledSongs[songIndex];
            songIndex = songs.findIndex(song => song.src === currentSong.src);
        }
        createPlaylist();
        updatePlaylist();
    }

    // Event Listeners
    playBtn.addEventListener('click', () => {
        const isPlaying = audio.paused;
        if (isPlaying) {
            playSong();
        } else {
            pauseSong();
        }
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    shuffleBtn.addEventListener('click', shuffleSongs);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);

    progressContainer.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);
    playlist.addEventListener('click', selectTrack);
    themeSwitch.addEventListener('change', toggleTheme);

    // Initial load
    loadSong(songs[songIndex]);
    createPlaylist();
    updatePlaylist();
    loadTheme();
});

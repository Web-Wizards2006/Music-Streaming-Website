// Get all necessary DOM elements
const searchBar = document.getElementById('search-bar');
const songList = document.querySelectorAll('.song');
const audioPlayer = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const skipBtn = document.getElementById('skip-btn');
const volumeControl = document.getElementById('volume-control');
const currentSongTitle = document.getElementById('current-song-title');
const currentAlbumImg = document.getElementById('current-album-img');
const audioSource = document.getElementById('audio-source');

// Audio player variables
let currentSongIndex = 0;
let songData = [
  { 
    title: "Song 1", 
    src: "Esspresso.mp3",  // Local MP3 file
    album: "Album 1", 
    albumImg: "https://images.genius.com/f8d1d714034d97ace5e4884bb320a60e.1000x1000x1.png" 
  },
  { 
    title: "Song 2", 
    src: "Sajni.mp3",  // Local MP3 file
    album: "Album 2", 
    albumImg: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a27b6a5504e2415688d69628" 
  }
];

// Function to play or pause the song
function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play().catch((error) => {
      // Handle the error gracefully (for example, by logging it)
      console.error("Error trying to play the audio:", error);
    });
    playPauseBtn.textContent = 'Pause';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = 'Play';
  }
}

// Function to skip to the next song
function skipSong() {
  currentSongIndex = (currentSongIndex + 1) % songData.length;
  loadSong(currentSongIndex);
  audioPlayer.play().catch((error) => {
    // Handle the error gracefully (for example, by logging it)
    console.error("Error trying to play the audio:", error);
  });
}

// Function to load a song
function loadSong(index) {
  const song = songData[index];
  audioSource.src = song.src;  // Update source to the local MP3 file
  currentSongTitle.textContent = song.title;
  currentAlbumImg.src = song.albumImg;
  audioPlayer.load();
}

// Search functionality
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  songList.forEach(song => {
    const songTitle = song.querySelector('p').textContent.toLowerCase();
    song.style.display = songTitle.includes(query) ? 'block' : 'none';
  });
});

// Event listeners for song selection
songList.forEach((song, index) => {
  song.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audioPlayer.play().catch((error) => {
      // Handle the error gracefully (for example, by logging it)
      console.error("Error trying to play the audio:", error);
    });
    playPauseBtn.textContent = 'Pause';
  });
});

// Event listeners for controls
playPauseBtn.addEventListener('click', togglePlayPause);
skipBtn.addEventListener('click', skipSong);
volumeControl.addEventListener('input', () => {
  audioPlayer.volume = volumeControl.value;
});

// Initialize the first song
loadSong(currentSongIndex);

// Music data - Add your music files here
let musicData = [];

// Pagination settings
const itemsPerPage = 12;
let currentPage = 1;
let filteredData = [];

// Load music data from JSON file
async function loadMusicData() {
    try {
        const response = await fetch('music-data.json');
        musicData = await response.json();
        filteredData = [...musicData];
        displayMusic();
        updatePagination();
        
        // Check for direct link in URL
        checkDirectLink();
    } catch (error) {
        console.error('Error loading music data:', error);
        // Fallback to sample data if JSON file doesn't exist
        musicData = [
            {
                title: "Sample Song 1",
                artist: "Artist Name",
                image: "https://via.placeholder.com/250x250/667eea/ffffff?text=Song+1",
                audio: "path/to/audio1.mp3"
            },
            {
                title: "Sample Song 2",
                artist: "Artist Name",
                image: "https://via.placeholder.com/250x250/764ba2/ffffff?text=Song+2",
                audio: "path/to/audio2.mp3"
            }
        ];
        filteredData = [...musicData];
        displayMusic();
        updatePagination();
        checkDirectLink();
    }
}

// Check if there's a song ID in the URL and auto-open the player
function checkDirectLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get('id');
    
    if (songId !== null) {
        const songIndex = parseInt(songId);
        if (songIndex >= 0 && songIndex < musicData.length) {
            // Open the player for this song
            openPlayer(musicData[songIndex]);
        }
    }
}

// Display music cards
function displayMusic() {
    const musicGrid = document.getElementById('musicGrid');
    musicGrid.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    pageData.forEach((music, index) => {
        const card = document.createElement('div');
        card.className = 'music-card';
        card.innerHTML = `
            <img src="${music.image}" alt="${music.title}">
            <div class="music-info">
                <h3>${music.title}</h3>
                <p>${music.artist}</p>
            </div>
        `;
        card.addEventListener('click', () => openPlayer(music));
        musicGrid.appendChild(card);
    });
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Open music player modal
function openPlayer(music) {
    const modal = document.getElementById('playerModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalArtist = document.getElementById('modalArtist');
    const audioSource = document.getElementById('audioSource');
    const audioPlayer = document.getElementById('audioPlayer');
    const shareLink = document.getElementById('shareLink');

    modalImage.src = music.image;
    modalTitle.textContent = music.title;
    modalArtist.textContent = music.artist;
    audioSource.src = music.audio;
    audioPlayer.load();

    // Set the share link with the song ID
    const songIndex = musicData.findIndex(s => s.title === music.title && s.artist === music.artist);
    const baseUrl = window.location.origin + window.location.pathname;
    shareLink.value = `${baseUrl}?id=${songIndex}`;

    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('playerModal');
    const audioPlayer = document.getElementById('audioPlayer');
    modal.style.display = 'none';
    audioPlayer.pause();
    
    // Remove the ?id parameter from URL when closing
    const url = new URL(window.location);
    url.search = '';
    window.history.pushState({}, '', url);
}

// Search functionality
function searchMusic(query) {
    const searchTerm = query.toLowerCase();
    filteredData = musicData.filter(music => 
        music.title.toLowerCase().includes(searchTerm) ||
        music.artist.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    displayMusic();
    updatePagination();
}

// Copy share link to clipboard
function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    shareLink.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(shareLink.value).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy link. Please copy manually.');
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadMusicData();

    // Pagination buttons
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayMusic();
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayMusic();
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Search input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchMusic(e.target.value);
    });

    // Modal close button
    document.querySelector('.close').addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('playerModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

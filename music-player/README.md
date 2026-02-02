# Music Library - Static Webpage

A beautiful, responsive static webpage to display and play your music collection with album art, search functionality, and pagination.

## Features

- **Grid Layout**: Modern card-based design displaying music with album art
- **Audio Player**: Click any song to open a modal with an embedded audio player
- **Search**: Real-time search functionality to filter songs by title or artist
- **Pagination**: Automatically handles large collections (12 items per page)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Easy Configuration**: Simple JSON file to manage your music library

## Project Structure

```
music-player/
├── index.html           # Main HTML file
├── style.css            # Stylesheet
├── script.js            # JavaScript functionality
├── music-data.json      # Music library configuration
├── music/               # Place your MP3 files here
├── images/              # Place your album art images here
└── README.md            # This file
```

## Setup Instructions

### 1. Add Your Music Files

1. Place your music files (MP3, WAV, etc.) in the `music/` folder
2. Place corresponding album art images (JPG, PNG) in the `images/` folder

### 2. Update the Music Data

Edit `music-data.json` to list your music files:

```json
[
    {
        "title": "Song Title",
        "artist": "Artist Name",
        "image": "images/album-art.jpg",
        "audio": "music/song-file.mp3"
    }
]
```

**Important**: Make sure the file paths in `music-data.json` match your actual file names.

### 3. Test Locally

Open `index.html` in your web browser, or run a local server:

```bash
# Using Python 3
python3 -m http.server 8080

# Then open http://localhost:8080 in your browser
```

## Free Hosting Options

### Option 1: GitHub Pages (Recommended)

GitHub Pages is completely free and perfect for static websites.

**Steps:**

1. **Create a GitHub account** (if you don't have one): https://github.com/signup

2. **Create a new repository**:
   - Go to https://github.com/new
   - Name it `music-library` (or any name you prefer)
   - Make it **Public**
   - Click "Create repository"

3. **Upload your files**:
   - Click "uploading an existing file"
   - Drag and drop all files from the `music-player` folder
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://your-username.github.io/music-library/`

**Using Git (Alternative):**

```bash
cd music-player
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/music-library.git
git push -u origin main
```

Then enable GitHub Pages in repository settings.

### Option 2: Netlify

Netlify offers free hosting with drag-and-drop deployment.

**Steps:**

1. Go to https://www.netlify.com/
2. Sign up for a free account
3. Click "Add new site" → "Deploy manually"
4. Drag and drop the entire `music-player` folder
5. Your site will be live instantly with a random URL (you can customize it)

### Option 3: Vercel

Vercel provides free hosting for static sites.

**Steps:**

1. Go to https://vercel.com/
2. Sign up for a free account
3. Click "Add New" → "Project"
4. Import from GitHub or drag and drop your folder
5. Deploy with one click

### Option 4: Cloudflare Pages

Cloudflare Pages offers unlimited bandwidth for free.

**Steps:**

1. Go to https://pages.cloudflare.com/
2. Sign up for a free account
3. Click "Create a project"
4. Connect your GitHub repository or upload directly
5. Deploy your site

## Customization

### Change Colors

Edit `style.css` and modify the gradient background:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adjust Items Per Page

Edit `script.js` and change:

```javascript
const itemsPerPage = 12;  // Change this number
```

### Change Title

Edit `index.html`:

```html
<h1>🎵 My Music Library</h1>
<p class="subtitle">Browse and play your favorite tracks</p>
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## File Format Support

**Audio formats** supported by HTML5 audio element:
- MP3 (recommended)
- WAV
- OGG
- AAC/M4A (limited support)

**Image formats**:
- JPG/JPEG (recommended)
- PNG
- WebP
- GIF

## Tips

1. **Optimize images**: Keep album art under 500KB for faster loading
2. **Consistent naming**: Use clear, consistent file names
3. **Backup**: Keep a backup of your music-data.json file
4. **Large collections**: The page handles hundreds of songs with pagination
5. **Privacy**: Don't upload copyrighted music to public repositories

## Troubleshooting

**Songs not playing?**
- Check that file paths in `music-data.json` match actual file locations
- Ensure audio files are in supported formats (MP3 recommended)

**Images not showing?**
- Verify image paths in `music-data.json`
- Check that images are in the `images/` folder

**Search not working?**
- Clear browser cache and reload
- Check browser console for JavaScript errors

## License

This project is free to use and modify for personal and commercial purposes.

---

**Enjoy your music library! 🎵**

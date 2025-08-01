# 🎵 NameTune - Music Generator

Transform your name or birthday into a unique musical melody! This beautiful React application converts text into personalized music with a charming scribble/notebook-themed design.

**🌐 Live Demo**: [https://razee4315.github.io/NameTune](https://razee4315.github.io/NameTune)

## ✨ Features

- **🎼 Name to Music**: Convert any name or birthday into a unique melody
- **🎹 Piano Sound**: Beautiful piano tones with rich harmonics and realistic decay
- **📁 Multiple Formats**: Generate WAV audio, MIDI files, or both
- **🎶 Harmony Option**: Add harmony tracks for richer, fuller sound
- **👀 Preview Mode**: See your melody notes before generating files
- **📱 Responsive Design**: Perfect on desktop, tablet, and mobile
- **🎨 Beautiful UI**: Hand-drawn scribble theme with playful animations
- **⚡ Client-Side**: No server required - runs entirely in your browser

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Razee4315/NameTune.git
   cd NameTune
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Deployment to GitHub Pages

```bash
npm run deploy
```
This builds and deploys the app to GitHub Pages.

## � How It Works

1. **Enter Text**: Type your name or birthday (e.g., "Sarah" or "25-12-1995")
2. **Choose Format**: Select WAV audio, MIDI file, or both
3. **Add Harmony**: Optionally enable harmony for richer sound
4. **Preview**: See your melody notes before generating
5. **Generate**: Download your personalized music files

### 🔮 The Algorithm

- **Letters → Notes**: Each letter maps to a musical note (A-Z → C-D-E-F-G-A-B cycle)
- **Numbers → Octaves**: Numbers determine pitch height (higher = higher pitch)
- **Position → Rhythm**: Character position creates natural rhythm patterns
- **Length → Tempo**: Input length influences the overall tempo
- **Piano Synthesis**: Rich harmonics with realistic attack and decay

## 🏗️ Architecture

- **Frontend**: React with modern hooks and responsive design
- **Audio Engine**: Client-side WAV synthesis with piano harmonics
- **MIDI Engine**: Browser-based MIDI file generation
- **Static Deployment**: Runs entirely in the browser - no server required
- **GitHub Pages**: Hosted as a static site for maximum accessibility

## 🎨 Customization

### Styling
- `src/index.css` - Global styles and notebook background
- `src/components/MusicGenerator.css` - Main interface styles
- `src/components/Navigation.css` - Header navigation styles

### Audio Settings
To change the default instrument, edit `src/components/MusicGenerator.js`:
```javascript
instrument: 1 // Piano (default) - change to other instrument IDs
```

## 📱 Mobile Support

Fully responsive design with:
- Touch-optimized interface
- Adaptive layouts for all screen sizes
- Mobile-friendly typography and spacing

## 🛠️ Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Create production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm test` - Run tests

## � Browser Support

Modern browsers including Chrome, Firefox, Safari, Edge, and mobile browsers.

## 📄 License

MIT License - feel free to use and modify.

## 🎵 Start Creating Music!

Transform your name into a beautiful melody and discover the music hidden in your identity!

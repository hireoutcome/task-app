# ADHD Work Manager

A zero-build, CDN-powered React 18 task management application designed specifically for ADHD users who need visual time-blocking, project organization, and friction-free task capture.

## Features

- **Brain Dump First**: Instant task capture without cognitive overhead
- **Visual Time Blocking**: Google Calendar-style drag-and-drop scheduling
- **Project-Based Organization**: Group tasks by goals with progress tracking
- **Customization**: User-defined priorities and client/company tags
- **Zero Friction**: No build step, auto-save, simple deployment

## Getting Started

### Local Development

**Option A - Python:**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

**Option B - Node.js:**
```bash
npx serve
# Follow URL shown in terminal
```

**Option C - VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## Tech Stack

- React 18 (CDN)
- Tailwind CSS (CDN)
- Babel Standalone (CDN)
- localStorage for data persistence

## File Structure

```
/
├── index.html          # Entry point, CDN imports, mount script
├── app.jsx             # Complete React application
├── README.md           # This file
├── LAUNCH_PLAN.md      # Step-by-step build guide
├── REBUILD_PROMPT.md   # Complete specification
└── .gitignore          # Git ignore rules
```

## Usage

Simply open `index.html` in your browser, or serve it with any static file server. All data is saved locally in your browser's localStorage.

## License

MIT

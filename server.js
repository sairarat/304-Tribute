const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Target local directory path set perfectly to your singular 'message' folder structure
const uploadDir = path.join(__dirname, 'assets', 'images', 'message');

// Ensure target directory path exists automatically on setup (wrapped for serverless robustness)
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (e) {
  console.warn("Could not create local upload directory structure on read-only cloud instance environment.");
}

// Serve uploaded local images publicly
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Configure Multer storage naming logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Fallback to absolute OS temporary path directory if production directory is unwritable
    if (fs.existsSync(uploadDir)) {
      cb(null, uploadDir);
    } else {
      cb(null, '/tmp');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Local JSON database file data pipeline setup
const DB_FILE = path.join(__dirname, 'notes_db.json');
let notes = [];

// Secure reading configuration loop
try {
  if (fs.existsSync(DB_FILE)) {
    notes = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } else {
    throw new Error("No database seed file discovered");
  }
} catch (e) {
  // Production fallback state if file initialization is rejected by platform layers
  notes = [
    {
      id: 1,
      author: "Lena & The Dorm 4 Crew",
      text: "Four years flew by too quickly! Thanks for keeping us safe during finals week.",
      sticker: "❤️",
      image: null,
      bgColor: "bg-emerald-100",
      rotation: "rotate-[1.5deg]"
    }
  ];
}

// Fallback persistence handler bypasses crashing on read-only setups
function saveToDisk() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(notes, null, 2));
  } catch (err) {
    console.warn("Local disk mutation rejected. State kept active inside volatile serverless execution memory context.");
  }
}

// 1. GET ALL FREEDOM WALL ENTRIES
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// 2. CREATE ENTRY WITH MULTIPART FILE
app.post('/api/notes', upload.single('image'), (req, res) => {
  const newNote = {
    id: Date.now(),
    author: req.body.author || "Anonymous '26",
    text: req.body.text || "",
    sticker: req.body.sticker || "❤️",
    bgColor: req.body.bgColor || "bg-amber-100",
    rotation: req.body.rotation || "rotate-0",
    image: req.file ? `assets/images/message/${req.file.filename}` : null
  };
  
  notes.unshift(newNote);
  saveToDisk();
  res.status(201).json(newNote);
});

// 3. EDIT POST CONTENT
app.put('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (note) {
    note.author = req.body.author || note.author;
    note.text = req.body.text || note.text;
    saveToDisk();
    res.json({ success: true, note });
  } else {
    res.status(404).json({ success: false, message: "Note entry not located" });
  }
});

// 4. DELETE ENTRY AND PURGE DISK FILE REFERENCE
app.delete('/api/notes/:id', (req, res) => {
  const noteIndex = notes.findIndex(n => n.id == req.params.id);
  if (noteIndex !== -1) {
    const note = notes[noteIndex];
    
    // Attempt clean-up file asset extraction if image attachment is present
    if (note.image) {
      const targetFilePath = path.join(__dirname, note.image);
      try {
        if (fs.existsSync(targetFilePath)) {
          fs.unlinkSync(targetFilePath);
        }
      } catch (e) {
        console.warn("Asset unlinking ignored in ephemeral container environments.");
      }
    }
    
    notes.splice(noteIndex, 1);
    saveToDisk();
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "Note entry not located" });
  }
});

// Bind listener port fallback execution checks for running locally
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Yearbook backend process active on mapping port: http://localhost:${PORT}`);
  });
}

// CRITICAL FOR VERCEL: Export the application layer container directly
module.exports = app;
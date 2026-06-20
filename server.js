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

// Ensure target directory path exists automatically on setup
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded local images publicly
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Configure Multer storage naming logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Local JSON file data pipeline setup
const DB_FILE = path.join(__dirname, 'notes_db.json');
let notes = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : [
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

const saveToDisk = () => fs.writeFileSync(DB_FILE, JSON.stringify(notes, null, 2));

// 1. GET ALL FREEDOM WALL ENTRIES
app.get('/api/notes', (req, res) => res.json(notes));

// 2. CREATE ENTRY WITH MULTIPART FILE
app.post('/api/notes', upload.single('image'), (req, res) => {
  const newNote = {
    id: Date.now(),
    author: req.body.author,
    text: req.body.text,
    sticker: req.body.sticker,
    bgColor: req.body.bgColor,
    rotation: req.body.rotation,
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
    note.author = req.body.author;
    note.text = req.body.text;
    saveToDisk();
  }
  res.json({ success: true });
});

// 4. DELETE ENTRY AND PURGE DISK FILE
app.delete('/api/notes/:id', (req, res) => {
  const noteIndex = notes.findIndex(n => n.id == req.params.id);
  if (noteIndex !== -1) {
    const note = notes[noteIndex];
    
    // Purge image from assets/images/message directory explicitly
    if (note.image) {
      const fullPath = path.join(__dirname, note.image);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    
    notes.splice(noteIndex, 1);
    saveToDisk();
  }
  res.json({ success: true });
});

app.listen(3000, () => console.log('Scrapbook Asset Server running at http://localhost:3000'));
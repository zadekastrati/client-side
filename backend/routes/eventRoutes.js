const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Routes
router.get('/', eventController.getAllEvents);
router.get('/category/:categoryId', eventController.getEventsByCategory);
router.get('/:id', eventController.getEvent);

router.post('/', upload.single('photo'), eventController.createEvent);
router.put('/:id', upload.single('photo'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;

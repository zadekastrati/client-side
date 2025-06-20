import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';

import contactRoute from './contact/route.js';
import eventRoutes from './routes/eventRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import sequelize from './config/database.js';
import './models/index.js';

// ES Module equivalent of __dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer (file upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Routes
app.use('/contact', contactRoute);
app.use('/api/events', eventRoutes); // Inside eventRoutes, apply `upload.single('photo')` where needed
app.use('/api/categories', categoryRoutes);


// Test & sync Sequelize DB
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected.');
    return sequelize.sync(); // Creates tables if not existing
  })
  .then(() => {
    console.log('✅ Database synchronized.');
  })
  .catch(err => {
    console.error('❌ Error connecting to database:', err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

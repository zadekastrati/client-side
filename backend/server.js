import 'dotenv/config';            // Ngarkon variablat nga .env (si PORT, DB URI)
import express from 'express';
import cors from 'cors';
import contactRoute from './contact/route.js';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - vetëm kërkesat nga frontend i lokal (http://localhost:3000) lejohen
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Për të lexuar JSON në body të kërkesave POST, PUT etj.
app.use(express.json());

// Ruta për /contact - e ke ndarë në modul të veçantë për rregulla REST API në contact/route.js
app.use('/contact', contactRoute);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

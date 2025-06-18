import express from 'express';
import cors from 'cors';
import contactRoute from './contact/route.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use('/contact', contactRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

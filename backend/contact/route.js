import express from 'express';
import { saveContact } from './model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await saveContact({ name, email, subject, message, createdAt: new Date() });
    res.status(200).json({ message: 'Contact form saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact form' });
  }
});

export default router;

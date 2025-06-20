import express from 'express';
import nodemailer from 'nodemailer';
import { saveContact } from './model.js';
import dotenv from 'dotenv';

// Load variables from .env.local
dotenv.config({ path: '.env.local' });

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await saveContact({ name, email, subject, message, createdAt: new Date() });

    const mailToAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Kontakt nga ${name} - ${subject}`,
      text: `Keni marrë një mesazh nga:\n\nEmri: ${name}\nEmail: ${email}\nSubjekti: ${subject}\nMesazhi:\n${message}`,
    };

    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Faleminderit që na kontaktuat!',
      text: `Pershendetje ${name},\n\nFaleminderit për mesazhin tuaj me subjekt "${subject}".\nDo të merrni përgjigje së shpejti.\n\nMe respekt,\nEkipi i Suportit`,
    };

    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    res.status(200).json({ message: 'Contact form saved and emails sent successfully!' });
  } catch (error) {
    console.error('Error in contact POST:', error);
    res.status(500).json({ error: 'Failed to save contact form or send emails' });
  }
});

export default router;

import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log("⚡ About to connect to MongoDB...");
    await dbConnect();
    console.log("✅ dbConnect() called");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    await user.save();
    console.log("✅ User saved:", user); // LOG THIS
    res.status(201).json({ message: 'User created' });

  } catch (err) {
    console.error("❌ Error during registration:", err); // LOG ERRORS
    res.status(500).json({ message: 'Server error' });
  }
}

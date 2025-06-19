import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ User not found for email:", email);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    console.log("❌ Password mismatch for user:", user.email);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  console.log("✅ User logged in:", user.email);
  res.status(200).json({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role || 'user',
  });
}

// pages/api/users.js
import dbConnect from '../../lib/mongodb'; // your mongoose connection helper
import User from '../../models/User'; // your Mongoose User model
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await dbConnect();

  try {
    const users = await User.find({}, '-password'); // exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

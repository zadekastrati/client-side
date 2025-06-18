import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },          // full name
  email: { type: String, required: true, unique: true },
  password: { type: String },                       // hashed password (optional if using OAuth)
  role: { type: String, default: 'user' },         // 'user' or 'admin'
}, { timestamps: true });

// Avoid recompilation errors in dev:
export default mongoose.models.User || mongoose.model('User', UserSchema);

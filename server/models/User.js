import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  dateOfBirth: { type: String },
  availability: { type: String },
  skillsOffered: [String],
  skillsWanted: [String],
  profilePhoto: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

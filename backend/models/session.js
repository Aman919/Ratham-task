import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false, // Initially, sessions are not booked
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who booked the session
  },
  // Add other session-related fields if needed
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;

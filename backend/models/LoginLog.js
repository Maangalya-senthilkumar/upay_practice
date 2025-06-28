const mongoose = require('mongoose');

const LoginLogSchema = new mongoose.Schema({
  userId: String,
  timestamp: { type: Date, default: Date.now },
  faceImage: String, // base64 string
  latitude: Number,
  longitude: Number,
  success: Boolean
});

module.exports = mongoose.model('LoginLog', LoginLogSchema);

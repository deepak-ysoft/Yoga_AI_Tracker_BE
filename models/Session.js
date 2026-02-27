const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  poseName: { type: String, required: true },
  holdTimeSeconds: {
    type: Number,
    required: true,
  },
  accuracyScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "Session",
  SessionSchema,
);

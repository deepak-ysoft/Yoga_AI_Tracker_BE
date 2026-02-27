const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {
    const {
      poseName,
      holdTimeSeconds,
      accuracyScore,
    } = req.body;
    const newSession = new Session({
      userId: req.user,
      poseName,
      holdTimeSeconds,
      accuracyScore,
    });
    const savedSession = await newSession.save();
    res.json(savedSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      userId: req.user,
    }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const sessions = await Session.find({
      userId: req.user,
    });
    const totalSessions = sessions.length;
    const bestHoldTime = sessions.reduce(
      (max, s) =>
        s.holdTimeSeconds > max ?
          s.holdTimeSeconds
        : max,
      0,
    );
    const averageAccuracy =
      sessions.length > 0 ?
        sessions.reduce(
          (sum, s) => sum + s.accuracyScore,
          0,
        ) / sessions.length
      : 0;

    res.json({
      totalSessions,
      bestHoldTime,
      averageAccuracy: Math.round(
        averageAccuracy,
      ),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

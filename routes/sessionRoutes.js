const router = require("express").Router();
const sessionController = require("../controllers/sessionController");
const authMiddleware = require("../middleware/auth");

router.post(
  "/",
  authMiddleware,
  sessionController.createSession,
);
router.get(
  "/",
  authMiddleware,
  sessionController.getSessions,
);
router.get(
  "/stats",
  authMiddleware,
  sessionController.getStats,
);

module.exports = router;

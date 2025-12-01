const express = require("express");
const router = express.Router();
const {
  addSubVision,
  getAllSubVisions,
  getSubVisionById,
  updateSubVision,
  deleteSubVision,
} = require("../controllers/subVisionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/:visionId/subvisions", protect, addSubVision);
router.get("/:visionId/subvisions", protect, getAllSubVisions);
router.get("/:visionId/subvisions/:subId", protect, getSubVisionById);

router.put("/:visionId/subvisions/:subId", protect, updateSubVision);
router.delete("/:visionId/subvisions/:subId", protect, deleteSubVision);

module.exports = router;

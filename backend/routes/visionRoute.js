const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createVision,
  getAllVisions,
  getVisionById,
  updateVision,
  deleteVision,
} = require("../controllers/visionController");

const router = express.Router();

router.route("/").get(protect, getAllVisions).post(protect, createVision);
router
  .route("/:id")
  .get(protect, getVisionById)
  .put(protect, updateVision)
  .delete(protect, deleteVision);

module.exports = router;

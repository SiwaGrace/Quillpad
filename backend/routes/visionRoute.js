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

router.route("/").get(getAllVisions).post(createVision);
router.route("/:id").get(getVisionById).put(updateVision).delete(deleteVision);

module.exports = router;

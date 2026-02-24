const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createPetition,
  signPetition,
  getPetitions,
  updatePetitionStatus
} = require("../controllers/petitionController");


router.get("/", getPetitions);
router.post("/", protect, createPetition);

router.post("/:id/sign", protect, signPetition);
router.patch("/:id/status", protect, updatePetitionStatus);

module.exports = router;
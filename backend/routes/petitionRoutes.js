const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createPetition,
  signPetition,
  getPetitions,
  updatePetition,
  updateStatus
} = require("../controllers/petitionController");


router.get("/", getPetitions);

router.post("/", protect, createPetition);

router.put("/:id", protect, updatePetition);

router.post("/:id/sign", protect, signPetition);

router.patch("/:id/status", protect, updateStatus);

module.exports = router;
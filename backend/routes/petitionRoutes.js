const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createPetition,
  getPetitions,
  signPetition,
} = require("../controllers/petitionController");

router.post("/", protect, createPetition);
router.get("/", getPetitions);
router.post("/:id/sign", protect, signPetition);

module.exports = router;

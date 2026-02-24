const Petition = require("../models/Petition");

// CREATE PETITION
exports.createPetition = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // Validate required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const petition = await Petition.create({
      title,
      description,
      category,
      location,
      createdBy: req.user.id,
      signatures: [req.user.id], // Creator automatically signs
    });

    await petition.populate("createdBy", "fullName role");

    res.status(201).json({
      message: "Petition Created Successfully",
      petition,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PETITIONS
exports.getPetitions = async (req, res) => {
  try {
    const petitions = await Petition.find()
      .populate("createdBy", "fullName role")
      .sort({ createdAt: -1 });

    res.json({
      message: "Petitions Retrieved Successfully",
      petitions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SIGN PETITION
exports.signPetition = async (req, res) => {
  try {
    const { id } = req.params;

    const petition = await Petition.findById(id);
    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    // Check if status is active
    if (petition.status !== "active") {
      return res.status(400).json({ message: "Petition is not active" });
    }

    // Check for duplicate signing (safe ObjectId comparison)
    const alreadySigned = petition.signatures.some(
      (sig) => sig.toString() === req.user.id.toString(),
    );
    if (alreadySigned) {
      return res
        .status(400)
        .json({ message: "You have already signed this petition" });
    }

    petition.signatures.push(req.user.id);
    await petition.save();

    await petition.populate("createdBy", "fullName role");

    res.json({
      message: "Petition Signed Successfully",
      petition,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

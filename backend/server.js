const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/petitions", require("./routes/petitionRoutes"));

app.get("/", (req, res) => {
  res.send("Civix Backend Running...");
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const QRCode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// 🔹 MongoDB Connection
// ==========================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ==========================
// 🔹 Schema (Table)
// ==========================
const memberSchema = new mongoose.Schema({
  name: String,
  age: Number,
  blood: String,
  mobile: String,
  photo_url: String
});

const Member = mongoose.model("Member", memberSchema);

// ==========================
// 🔹 Cloudinary Config
// ==========================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// ==========================
// 🔹 Multer (Image Upload)
// ==========================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ==========================
// 🔹 ADD MEMBER API
// ==========================
app.post("/add-member", upload.single("photo"), async (req, res) => {
  try {
    const { name, age, blood, mobile } = req.body;

    // Upload image to Cloudinary
    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadStream();

    // Save to MongoDB
    const newMember = new Member({
      name,
      age,
      blood,
      mobile,
      photo_url: result.secure_url
    });

    const saved = await newMember.save();

    // 🔥 FIX: fallback if FRONTEND_URL is missing
    const frontendURL = process.env.FRONTEND_URL || "http://127.0.0.1:5500";

    console.log("Using Frontend URL:", frontendURL); // debug

    // Generate QR Code
    const qr = await QRCode.toDataURL(
      `${frontendURL}/view.html?id=${saved._id}`
    );

    res.json({
      id: saved._id,
      qr: qr
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ==========================
// 🔹 GET MEMBER API
// ==========================
app.get("/member/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// ==========================
// 🔹 ROOT CHECK
// ==========================
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ==========================
// 🔹 SERVER START
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
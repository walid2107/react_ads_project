const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const multer = require("multer");

// Image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.use("/uploads", express.static("uploads"));

//ads model
const Ad = require("../../models/Ad");

// get /api/ads
router.get("/", (req, res) => {
  Ad.find()
    .sort({ date: -1 })
    .then((ads) => res.json(ads));
});

// get /api/ads/:id
router.get("/:id", (req, res) => {
  Ad.findById(req.params.id)
    .then((ad) => res.json(ad))
    .catch((err) => res.status(404).json({ success: false }));
});

// get /api/ads/search/:category
router.get("/search/:category", (req, res) => {
  Ad.find({ category: req.params.category })
    .then((ad) => res.json(ad))
    .catch((err) => res.status(404).json({ success: false }));
});

// post /api/ads/
router.post("/", upload.single("img"), (req, res) => {
  console.log(req.file);
  const newAd = new Ad({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    owner: req.body.owner,
    isAvailable: req.body.isAvailable,
    description: req.body.description,
    city: req.body.city,
    img: req.body.img,
  });
  newAd.save().then((Ad) => res.json(Ad));
});

// post /api/ads/fileup
router.post("/fileup", upload.single("img"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
});
// delete /api/ads/:id
router.delete("/:id", (req, res) => {
  Ad.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});
// put /api/ads/:id
router.put("/:id", (req, res) => {
  Ad.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;

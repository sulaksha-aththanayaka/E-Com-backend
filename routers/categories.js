const express = require("express");

const router = express.Router();

const Category = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    res.status(500).json({ success: false });
  }

  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category)
    return res
      .status(404)
      .json({ success: false, message: "category not found" });

  res.status(200).json(category);
});

router.post("/", async (req, res) => {
  const { name, color, icon } = req.body;

  let category = new Category({
    name,
    color,
    icon,
  });

  category = await category.save();

  if (!category) return res.status(404).json("The categry cannot be created");

  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, color, icon } = req.body;

  const category = await Category.findByIdAndUpdate(id, {
    name,
    icon,
    color,
  }, { new: true});

  if(!category) return res.status(404).json({success: false, message: 'Category not found'});

  res.send(category);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Category.findByIdAndDelete(id)
    .then((category) => {
      if (category) {
        res
          .status(200)
          .json({ success: true, message: "category deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    });
});

module.exports = router;

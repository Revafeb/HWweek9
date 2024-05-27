const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController.js");

//CRUD
router.get("/", movieController.findAll);
router.get("/:id", movieController.findOne);
router.post("/", movieController.create);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.destroy);


module.exports = router;
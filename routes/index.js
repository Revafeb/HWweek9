const express = require("express");
const router = express.Router();
const userRoute = require("./UserRoute.js");
const movieRoute = require("./movieRoute.js")

router.use("/users", userRoute);
router.use("/movies", movieRoute);

module.exports = router;
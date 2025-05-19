const express = require("express");
const router = express.Router();

const { registerUserController } = require("../controller/registerController");
const { loginController } = require("../controller/authController");
const {
  getMoviesController,
  getMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} = require("../controller/movieController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUserController);
router.post("/login", loginController);

router.get("/movies", getMoviesController);
router.get("/movies/:id", authMiddleware, getMovieController);
router.post("/movies", authMiddleware, createMovieController);
router.put("/movies/:id", authMiddleware, updateMovieController);
router.delete("/movies/:id", authMiddleware, deleteMovieController);

module.exports = router;

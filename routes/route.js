const express = require("express");
const router = express.Router();

const { registerUserController } = require("../controller/registerController");
const { loginController } = require("../controller/authController");
const {
  getMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} = require("../controller/movieController");

const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUserController);
router.post("/login", loginController);

// Protected movie routes
router.get("/movies/:id", authMiddleware, getMovieController);
router.post("/movies", authMiddleware, createMovieController);
router.put("/movies/:id", authMiddleware, updateMovieController);
router.delete("/movies/:id", authMiddleware, deleteMovieController);

module.exports = router;

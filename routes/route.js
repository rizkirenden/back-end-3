const express = require("express");
const router = express.Router();
const { registerUserController } = require("../controller/registerController");
const {
  verifyEmailController,
} = require("../controller/verifyEmailController");
const { loginController } = require("../controller/authController");
const {
  getMoviesController,
  getMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} = require("../controller/movieController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/register", registerUserController);
router.get("/verify-email", verifyEmailController);
router.post("/login", loginController);

router.get("/movies", getMoviesController);
router.get("/movies/:id", authMiddleware, getMovieController);
router.post(
  "/movies",
  upload.fields([
    { name: "sampul_depan", maxCount: 1 },
    { name: "sampul_belakang", maxCount: 1 },
    { name: "video_movie", maxCount: 1 },
    { name: "video_trailler", maxCount: 1 },
  ]),
  authMiddleware,
  createMovieController
);
router.put("/movies/:id", authMiddleware, updateMovieController);
router.delete("/movies/:id", authMiddleware, deleteMovieController);

module.exports = router;

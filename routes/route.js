const express = require("express");
const router = express.Router();

const { registerUserController } = require("../controllers/registerController");
const { loginController } = require("../controllers/authController");

router.post("/register", registerUserController);
router.post("/login", loginController);

module.exports = router;

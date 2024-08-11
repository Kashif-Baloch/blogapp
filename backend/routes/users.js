import express from "express";
import upload from "../middlewares/userImageUploader.js";
import controllers from "../controllers/userController.js";
import fetchUser from "../middlewares/tokenextracter.js";

const router = express.Router();

router.post("/signup", upload.single("image"), controllers.signUser);

router.post("/login", controllers.loginUser);

router.get("/getuser", fetchUser, controllers.getUser);

router.delete("/del", controllers.deleteUsers);

export default router;

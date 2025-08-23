import { Router } from "express";
import { loginUser, createUser } from "../Controllers/authController";
// import { loginUser, createUser } from "../Controllers/authControllers"
const router = Router();

router.post("/register", createUser); // Tested
router.post("/login", loginUser); // Tested

export default router;

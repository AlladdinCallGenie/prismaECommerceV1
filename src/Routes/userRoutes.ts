import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getMyProfile,
  getAllUsers,
  addShippingAddress,
} from "../Controllers/userController";
import { isAuthenticated } from "../Middlewares/userAuth";
import { isAdmin } from "../Middlewares/isAdmin";
const router = Router();

router.get("/allUsers", isAuthenticated, isAdmin, getAllUsers); //Tested

router.get("/myprofile", isAuthenticated, getMyProfile); //Tested
router.put("/update", isAuthenticated, updateUser); // Tested
router.delete("/delete", isAuthenticated, deleteUser); // Tested
router.post("/addNewAddress", isAuthenticated, addShippingAddress); //Tested
export default router;

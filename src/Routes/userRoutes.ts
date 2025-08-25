import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getMyProfile,
  addShippingAddress,
} from "../Controllers/userController";
import { isAuthenticated } from "../Middlewares/userAuth";
const router = Router();

router.get("/myprofile", isAuthenticated, getMyProfile); //Tested
router.put("/update", isAuthenticated, updateUser); // Tested
router.delete("/delete", isAuthenticated, deleteUser); // Tested
router.post("/addNewAddress", isAuthenticated, addShippingAddress); //Tested
export default router;

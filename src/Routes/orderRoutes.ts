import { Router } from "express";
import { isAuthenticated } from "../Middlewares/userAuth";
import {
  placeOrder,
  updateStatus,
  cancelOrder,
} from "../Controllers/orderControllers";
import { isAdmin } from "../Middlewares/isAdmin";
const router = Router();

router.post("/placeOrder", isAuthenticated, placeOrder); // Tested
router.put("/updateStatus/:id", isAuthenticated, isAdmin, updateStatus); // Tested
router.put("/cancelOrder/:id", isAuthenticated, cancelOrder);  // Tested
export default router;

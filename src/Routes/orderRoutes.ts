import { Router } from "express";
import { isAuthenticated } from "../Middlewares/userAuth";
import {
  placeOrder,
  cancelOrder,
  orderHistory,
  checkStatus,
} from "../Controllers/orderControllers";
const router = Router();

router.post("/placeOrder", isAuthenticated, placeOrder); // Tested
router.put("/cancelOrder/:id", isAuthenticated, cancelOrder); // Tested
router.get("/history", isAuthenticated, orderHistory);
router.get("/checkStatus/:id", isAuthenticated, checkStatus);

export default router;

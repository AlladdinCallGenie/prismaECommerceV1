import { Router } from "express";
import { isAuthenticated } from "../Middlewares/userAuth";
import { placeOrder, cancelOrder } from "../Controllers/orderControllers";
const router = Router();

router.post("/placeOrder", isAuthenticated, placeOrder); // Tested
router.put("/cancelOrder/:id", isAuthenticated, cancelOrder); // Tested
export default router;

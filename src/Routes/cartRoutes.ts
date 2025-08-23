import { Router } from "express";
import { isAuthenticated } from "../Middlewares/userAuth";

import {
  addToCart,
  getCart,
  removeFromCart,
  dropCart,
  updateCartItemQuantity,
} from "../Controllers/cartControllers";
const router = Router();

// -------------> CARTS <-----------------------

router.get("/mycart", isAuthenticated, getCart); // Tested
router.post("/add", isAuthenticated, addToCart); // Tested
router.delete("/remove/:cartItemId", isAuthenticated, removeFromCart); //Tested
router.delete("/deleteCart", isAuthenticated, dropCart); // Tested
router.put("/updateItem", isAuthenticated, updateCartItemQuantity); //Tested

export default router;

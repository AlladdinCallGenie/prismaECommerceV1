import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  getByCategory,
} from "../Controllers/productControllers";
import { isAuthenticated } from "../Middlewares/userAuth";
const router = Router();

// -------------> PRODUCTS <-----------------------

router.get("/all", isAuthenticated, getAllProducts); // Tested
router.get("/category", isAuthenticated, getByCategory); // Tested
router.get("/:id", isAuthenticated, getProductById); // Tested

export default router;

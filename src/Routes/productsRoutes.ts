import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  softDeleteProductById,
  reActivateProductById,
  getProductById,
  updateProductById,
  getByCategory,
  getAdminAllProducts,
} from "../Controllers/productControllers";
import { isAuthenticated } from "../Middlewares/userAuth";
import { isAdmin } from "../Middlewares/isAdmin";
const router = Router();

// -------------> PRODUCTS <-----------------------
router.post("/newProduct", isAuthenticated, isAdmin, createProduct); // Tested
router.put("/update/:id", isAuthenticated, isAdmin, updateProductById); // Tested
router.delete("/delete/:id", isAuthenticated, isAdmin, softDeleteProductById); // Tested
router.post("/activate/:id", isAuthenticated, isAdmin, reActivateProductById); // Tested
router.get("/admin/all", isAuthenticated, isAdmin, getAdminAllProducts);

router.get("/all", isAuthenticated, getAllProducts); // Tested
router.get("/category", isAuthenticated, getByCategory); // Tested
router.get("/:id", isAuthenticated, getProductById); // Tested

export default router;

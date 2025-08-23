import { Router } from "express";
import { isAuthenticated } from "../Middlewares/userAuth";
import { isAdmin } from "../Middlewares/isAdmin";
import {
  createCategory,
  deleteCategory,
} from "../Controllers/categoryControllers";

const router = Router();

// -------------> CATEGORIES <-----------------------
router.post("/newCategory", isAuthenticated, isAdmin, createCategory); // Tested
router.delete("/deleteCategory", isAuthenticated, isAdmin, deleteCategory);

export default router;

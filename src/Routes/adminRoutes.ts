import { Router } from "express";
import { isAuthenticated } from "../Middlewares/userAuth";
import { isAdmin } from "../Middlewares/isAdmin";
import { paginateData } from "../Utils/pagination";
import {
  createCategory,
  deleteCategory,
  updateStatus,
  createProduct,
  updateProductById,
  softDeleteProductById,
  reActivateProductById,
  getAdminAllProducts,
  deleteById,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
  getCtgryById,
  getAllCtgry,
  allOrders,
  addCoupon,
  deleteCoupon,
  updateCoupon,
  reactivateCoupon,
  allCoupon,
} from "../Controllers/adminControllers";
const router = Router();

// ---------->Admin Cart Routes<----------
// ---------->Admin Category Routes<----------
router.post("/newCategory", isAuthenticated, isAdmin, createCategory); // Tested
router.delete("/deleteCategory/:id", isAuthenticated, isAdmin, deleteCategory);
router.get("/getCtgryById/:id", isAuthenticated, isAdmin, getCtgryById);
router.get("/allCtgry", isAuthenticated, isAdmin, getAllCtgry);

// ---------->Admin Order Routes<----------
router.put("/updateStatus/:id", isAuthenticated, isAdmin, updateStatus); // Tested
router.get("/allOrders", isAuthenticated, isAdmin, allOrders);

// ---------->Admin Product Routes<----------
router.post("/newProduct", isAuthenticated, isAdmin, createProduct); // Tested
router.put("/update/:id", isAuthenticated, isAdmin, updateProductById); // Tested
router.delete("/delete/:id", isAuthenticated, isAdmin, softDeleteProductById); // Tested
router.delete("/permanentdelete/:id", isAuthenticated, isAdmin, deleteById); // Tested
router.post("/activate/:id", isAuthenticated, isAdmin, reActivateProductById); // Tested
router.get("/all", isAuthenticated, isAdmin, getAdminAllProducts);

// ---------->Admin User Routes<----------
router.get("/allUsers", isAuthenticated, isAdmin, getAllUsers); //Tested
router.get("/getById/:userId", isAuthenticated, isAdmin, getUserById);
router.put("/updateById/:userId", isAuthenticated, isAdmin, updateUserById);
router.delete("/deleteUser/:userId", isAuthenticated, isAdmin, deleteUser);

// --------------> Admin Coupon Routes <----------------------
router.post("/createCoupon", isAuthenticated, isAdmin, addCoupon);
router.put("/updateCoupon/:id", isAuthenticated, isAdmin, updateCoupon);
router.delete("/deleteCoupon/:id", isAuthenticated, isAdmin, deleteCoupon);
router.put("/activateCoupon/:id", isAuthenticated, isAdmin, reactivateCoupon);
router.get("/allCoupons", isAuthenticated, isAdmin, allCoupon);

// --------------> Admin Paginated Routes <----------------------
router.get("/allPaginatedDate", isAuthenticated, isAdmin, paginateData); // Test route for pagination
export default router;

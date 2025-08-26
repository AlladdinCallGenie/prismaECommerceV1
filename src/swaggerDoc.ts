//auth
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               role:
 *                 type: string
 *                 enum: [CUSTOMER, ADMIN]
 *                 example: CUSTOMER
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: User already exists
 *       500:
 *         description: Failed to create user
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and return req.user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: LoggedIn Successfully...
 *                 loggedInUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       example: CUSTOMER
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed
 */

/**
 * @swagger
 * tags:
 *   - name: Admin Category
 *     description: Category management for Admin
 *   - name: Admin Order
 *     description: Order management for Admin
 *   - name: Admin Product
 *     description: Product management for Admin
 *   - name: Admin User
 *     description: User management for Admin
 *   - name: Admin Coupon
 *     description: Coupon management for Admin
 */

/**
 * @swagger
 * /api/admin/newCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Admin Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Category created successfully
 *       401:
 *         description: Category already exists OR Unauthorized
 *       500:
 *         description: Failed to create the category
 */

/**
 * @swagger
 * /api/admin/deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Admin Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Category not found OR Unauthorized
 *       500:
 *         description: Failed to delete the category
 */

/**
 * @swagger
 * /api/admin/getCtgryById/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Admin Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *       404:
 *         description: No category found with given ID
 *       500:
 *         description: Failed to get the category
 */

/**
 * @swagger
 * /api/admin/allCtgry:
 *   get:
 *     summary: Get all categories
 *     tags: [Admin Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Failed to fetch all categories
 */

/**
 * @swagger
 * /api/admin/updateStatus/{id}:
 *   put:
 *     summary: Update order status
 *     tags: [Admin Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, SHIPPED, DELIVERED, CANCELLED]
 *                 example: SHIPPED
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order #12 marked as SHIPPED"
 *                 order:
 *                   type: object
 *       400:
 *         description: Invalid status value
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to update order status
 */

/**
 * @swagger
 * /api/admin/allOrders:
 *   get:
 *     summary: Get all orders
 *     tags: [Admin Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: integer
 *                       order_date:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                       order_items:
 *                         type: array
 *                         items:
 *                           type: object
 *       500:
 *         description: Failed to get all orders
 */

/**
 * @swagger
 * /api/admin/newProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - product_name
 *               - product_price
 *               - stock
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               product_name:
 *                 type: string
 *                 example: iPhone 16
 *               product_price:
 *                 type: number
 *                 example: 999.99
 *               description:
 *                 type: string
 *                 example: Latest Apple iPhone model
 *               stock:
 *                 type: integer
 *                 example: 100
 *               discount:
 *                 type: number
 *                 example: 10
 *               image:
 *                 type: string
 *                 example: "https://example.com/images/iphone16.png"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Duplicate product OR Unauthorized
 *       500:
 *         description: Failed to create product
 */

/**
 * @swagger
 * /api/admin/update/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               product_name:
 *                 type: string
 *               product_price:
 *                 type: number
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *               discount:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Product not found OR Unauthorized
 *       500:
 *         description: Failed to update product
 */

/**
 * @swagger
 * /api/admin/delete/{id}:
 *   delete:
 *     summary: Soft delete a product by ID (set isActive = false)
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Product not found OR Unauthorized
 *       500:
 *         description: Failed to delete product
 */

/**
 * @swagger
 * /api/admin/activate/{id}:
 *   post:
 *     summary: Reactivate a soft-deleted product
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product activated successfully
 *       500:
 *         description: Failed to reactivate product
 */
/**
 * @swagger
 * /api/admin/permanentdelete/{id}:
 *   delete:
 *     summary: Permanently delete a product by ID
 *     description: This action will completely remove the product from the database (unlike soft delete).
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted permanently
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to delete product
 */

/**
 * @swagger
 * /api/admin/all:
 *   get:
 *     summary: Get all products (admin view)
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product_id:
 *                     type: integer
 *                   category_id:
 *                     type: integer
 *                   product_name:
 *                     type: string
 *                   product_price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   discount:
 *                     type: number
 *                   image:
 *                     type: string
 *                   isActive:
 *                     type: boolean
 *       500:
 *         description: Failed to fetch products
 */
/**
 * @swagger
 * /api/admin/allUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   isDeleted:
 *                     type: boolean
 *       500:
 *         description: Failed to fetch all users
 */

/**
 * @swagger
 * /api/admin/getById/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to get user by ID
 */

/**
 * @swagger
 * /api/admin/updateById/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               password:
 *                 type: string
 *                 example: "securePass123"
 *               role:
 *                 type: string
 *                 enum: [ADMIN, CUSTOMER]
 *                 example: CUSTOMER
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid role value
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */

/**
 * @swagger
 * /api/admin/delete/{userId}:
 *   delete:
 *     summary: Soft delete a user by ID (set isDeleted = true)
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
/**
 * @swagger
 * /api/admin/createCoupon:
 *   post:
 *     summary: Create a new discount coupon
 *     tags: [Admin Coupon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discountType
 *               - discountValue
 *               - validTo
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SAVE10"
 *               description:
 *                 type: string
 *                 example: "Get 10% off on orders above ₹500"
 *               discountType:
 *                 type: string
 *                 enum: [PERCENTAGE, FLAT]
 *                 example: "PERCENTAGE"
 *               discountValue:
 *                 type: number
 *                 example: 10
 *               minOrderValue:
 *                 type: number
 *                 example: 500
 *               maxDiscount:
 *                 type: number
 *                 example: 200
 *               validTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-31T23:59:59.000Z"
 *     responses:
 *       200:
 *         description: Coupon created successfully
 *       400:
 *         description: Coupon already exists
 *       401:
 *         description: Unauthorized (not logged in)
 *       403:
 *         description: Forbidden (not an admin)
 *       500:
 *         description: Failed to create coupon
 */

/**
 * @swagger
 * /api/admin/updateCoupon/{id}:
 *   put:
 *     summary: Update an existing coupon by ID
 *     description: Allows an admin to update coupon details by providing the coupon ID.
 *     tags: [Admin Coupon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the coupon to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SAVE20"
 *               description:
 *                 type: string
 *                 example: "20% off on orders above 2000"
 *               discountType:
 *                 type: string
 *                 enum: [PERCENTAGE, FLAT]
 *                 example: "PERCENTAGE"
 *               discountValue:
 *                 type: number
 *                 example: 20
 *               minOrderValue:
 *                 type: number
 *                 example: 2000
 *               maxDiscount:
 *                 type: number
 *                 example: 1000
 *               validTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-01T23:59:59.000Z"
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       400:
 *         description: Coupon does not exist
 *       401:
 *         description: Unauthorized (not logged in)
 *       403:
 *         description: Forbidden (not an admin)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/deleteCoupon/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     description: Allows an admin to soft-delete (deactivate) a coupon by its ID.
 *     tags: [Admin Coupon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the coupon to delete
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *       401:
 *         description: Unauthorized (not logged in)
 *       403:
 *         description: Forbidden (not an admin)
 *       404:
 *         description: No coupon found with the given ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/activateCoupon/{id}:
 *   put:
 *     summary: Reactivate a coupon
 *     description: Allows an admin to reactivate a previously deactivated coupon.
 *     tags: [Admin Coupon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the coupon to reactivate
 *     responses:
 *       200:
 *         description: Coupon reactivated successfully
 *       400:
 *         description: Coupon does not exist
 *       401:
 *         description: Unauthorized (not logged in)
 *       403:
 *         description: Forbidden (not an admin)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: APIs for managing the shopping cart of logged-in users
 */

/**
 * @swagger
 * /api/cart/mycart:
 *   get:
 *     summary: Get logged-in user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The cart of the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *       500:
 *         description: Failed to fetch cart
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product added or updated in cart
 *       401:
 *         description: Not logged in
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to add products to cart
 */

/**
 * @swagger
 * /api/cart/remove/{cartItemId}:
 *   delete:
 *     summary: Remove a specific item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cart item ID
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       500:
 *         description: Failed to remove item from cart
 */

/**
 * @swagger
 * /api/cart/deleteCart:
 *   delete:
 *     summary: Delete the entire cart of the logged-in user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: User does not have a cart
 *       500:
 *         description: Failed to delete the cart
 */

/**
 * @swagger
 * /api/cart/updateItem:
 *   put:
 *     summary: Update quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItemId
 *               - quantity
 *             properties:
 *               cartItemId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated cart item quantity or removed item if quantity <= 0
 *       500:
 *         description: Failed to update the item quantity
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: APIs for placing and managing orders
 */

/**
 * @swagger
 * /api/order/placeOrder:
 *   post:
 *     summary: Place a new order from the logged-in user's cart
 *     description: Creates an order using items from the user's cart. Optionally applies a coupon for discounts.
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address_id
 *             properties:
 *               address_id:
 *                 type: integer
 *                 description: The shipping address ID to deliver the order
 *                 example: 1
 *               couponCode:
 *                 type: string
 *                 description: Optional coupon code to apply discount
 *                 example: SAVE10
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     shippingAddress_id:
 *                       type: integer
 *                     total_amount:
 *                       type: number
 *                       example: 500
 *                     final_amount:
 *                       type: number
 *                       example: 450
 *                     discount_amount:
 *                       type: number
 *                       example: 50
 *                     couponId:
 *                       type: integer
 *                       nullable: true
 *                     order_items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product_id:
 *                             type: integer
 *                           quantity:
 *                             type: integer
 *                           price:
 *                             type: number
 *                     coupon:
 *                       type: object
 *                       nullable: true
 *       400:
 *         description: Bad request - e.g. empty cart, invalid address, coupon errors
 *         content:
 *           application/json:
 *             examples:
 *               EmptyCart:
 *                 value:
 *                   error: Cart is empty
 *               InvalidAddress:
 *                 value:
 *                   error: Invalid Shipping address OR No Shipping Address Found...
 *               InvalidCoupon:
 *                 value:
 *                   error: Invalid or Inactive coupon code ...
 *               CouponExpired:
 *                 value:
 *                   message: Coupon expired or not yet valid...
 *               MinOrderNotMet:
 *                 value:
 *                   error: Order does not meet coupon requirements
 *               DiscountExceedsTotal:
 *                 value:
 *                   error: Discount cannot exceed order total
 *       401:
 *         description: Unauthorized - login required
 *         content:
 *           application/json:
 *             example:
 *               message: Login first..
 *       500:
 *         description: Failed to place the order
 *         content:
 *           application/json:
 *             example:
 *               error: Failed to place the order...
 */

/**
 * @swagger
 * /api/order/cancelOrder/{id}:
 *   put:
 *     summary: Cancel an existing order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID to cancel
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *       401:
 *         description: Login required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to cancel the order
 */

/**
 * @swagger
 * /api/order/history:
 *   get:
 *     summary: Get the order history of the logged-in user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders made by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: integer
 *                       total_amount:
 *                         type: number
 *                       status:
 *                         type: string
 *                       order_date:
 *                         type: string
 *                         format: date-time
 *                       shippingAddress_id:
 *                         type: integer
 *                       order_items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product_id:
 *                               type: integer
 *                             quantity:
 *                               type: integer
 *                             price:
 *                               type: number
 *                       user_address:
 *                         type: object
 *                         properties:
 *                           address_line1:
 *                             type: string
 *                           address_line2:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                           postal_code:
 *                             type: string
 *                           country:
 *                             type: string
 *                           isShipping_address:
 *                             type: boolean
 *       401:
 *         description: Login required
 *       404:
 *         description: No history found
 *       500:
 *         description: Failed to fetch order history
 */

/**
 * @swagger
 * /api/order/checkStatus/{id}:
 *   get:
 *     summary: Check the status of an order for the logged-in user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID to check the status
 *     responses:
 *       200:
 *         description: Returns the status of the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SHIPPED ON 2025-08-25T10:00:00Z"
 *       401:
 *         description: Login required
 *       404:
 *         description: Order not found
 *       500:
 *         description: Cannot find the status of the order
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: APIs for fetching products
 */

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Get all active products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all active products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to fetch products
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to fetch product
 */

/**
 * @swagger
 * /api/products/category:
 *   get:
 *     summary: Get products by category name
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The category name
 *     responses:
 *       200:
 *         description: List of products in the given category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Category name is required
 *       404:
 *         description: No products found for this category
 *       500:
 *         description: Failed to fetch products
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: APIs for user profile management
 */

/**
 * @swagger
 * /api/users/myprofile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged-in user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not logged in
 */

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Update logged-in user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: johndoe
 *               email: johndoe@example.com
 *               first_name: John
 *               last_name: Doe
 *               password: secret123
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not logged in
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete logged-in user's account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Not logged in
 *       500:
 *         description: Failed to delete user
 */

/**
 * @swagger
 * /api/users/addNewAddress:
 *   post:
 *     summary: Add a new shipping address for logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_line1:
 *                 type: string
 *               address_line2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *               isShipping_address:
 *                 type: boolean
 *             example:
 *               address_line1: "123 Main St"
 *               address_line2: "Apt 4B"
 *               city: "New York"
 *               state: "NY"
 *               postal_code: "10001"
 *               country: "USA"
 *               isShipping_address: true
 *     responses:
 *       201:
 *         description: Address added successfully
 *       401:
 *         description: Not logged in
 *       500:
 *         description: Failed to add address
 */

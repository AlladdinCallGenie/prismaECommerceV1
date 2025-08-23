import { Request, Response, NextFunction } from "express";
import prisma from "../config/config";

// ---------------- CART ---------------------------
export const addToCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const { productId, quantity } = req.body;
    const userId = req.user?.id;
    // ensuring the user has a cart
    let cart = await prisma.shopping_cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.shopping_cart.create({
        data: { userId },
      });
    }
    const product = await prisma.products.findUnique({
      where: { product_id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // check if product is already in the cart
    const existingItem = await prisma.cart_items.findFirst({
      where: { cart_id: cart.cart_id, product_id: Number(productId) },
    });

    if (existingItem) {
      // update quantity + price
      const updatedItem = await prisma.cart_items.update({
        where: { cart_item_id: existingItem.cart_item_id },
        data: {
          quantity: existingItem.quantity + quantity,
          price: (existingItem.quantity + quantity) * product.product_price,
        },
      });
      return res.status(200).json({ updatedItem });
    } else {
      // add new item
      const newItem = await prisma.cart_items.create({
        data: {
          cart_id: cart.cart_id,
          product_id: Number(productId),
          quantity,
          price: product.product_price * quantity,
        },
      });
      return res.status(200).json({ newItem });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add products to cart " });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const cart = await prisma.shopping_cart.findUnique({
      where: { userId: Number(userId) },
      include: {
        cart_items: {
          include: {
            products: true,
          },
        },
      },
    });
    if (cart === null)
      return res.status(200).json({ message: "User Cart is Empty ..... " });
    return res
      .status(200)
      .json({ message: "This is the cart of the LoggedIn user", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { cartItemId } = req.params;
    await prisma.cart_items.delete({
      where: { cart_item_id: Number(cartItemId) },
    });
    return res
      .status(200)
      .json({ message: "Cart Item Deleted successfully..." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove Item from cart " });
  }
};

export const dropCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const cart = await prisma.shopping_cart.findUnique({
      where: { userId },
    });
    if (!cart)
      return res.status(404).json({ message: "User Does Not have any Cart" });

    await prisma.shopping_cart.delete({
      where: { cart_id: cart.cart_id },
    });
    return res.status(200).json({ message: "Cart Deleted successfully.. " });
  } catch (error) {
    res.status(500).json({ error: "Failed to Delete the Cart " });
  }
};

export const updateCartItemQuantity = async (req: Request, res: Response) => {
  try {
    const { cartItemId, quantity } = req.body;

    if (quantity <= 0) {
      await prisma.cart_items.delete({
        where: { cart_item_id: cartItemId },
      });
      return res.json({ message: "Item removed successfully... " });
    }
    const item = await prisma.cart_items.findFirst({
      where: { cart_item_id: cartItemId },
    });
    const product = await prisma.products.findUnique({
      where: { product_id: item?.product_id },
    });
    if (!product)
      return res.json({
        message:
          "No product Found.....(updateCartItemQuantity --> cartControllers)",
      });

    const updated = await prisma.cart_items.update({
      where: { cart_item_id: cartItemId },
      data: {
        quantity,
        price: product.product_price * quantity,
      },
    });

    return res.json({ updated });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to Update the quantity of item.... " });
  }
};

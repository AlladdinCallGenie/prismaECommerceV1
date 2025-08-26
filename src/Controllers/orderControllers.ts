import { Request, Response, NextFunction } from "express";
import prisma from "../config/config";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Login first.." });
    const userId = req.user.id;
    const { address_id, couponCode } = req.body;

    const cart = await prisma.shopping_cart.findUnique({
      where: { userId },
      include: { cart_items: true },
    });

    if (!cart || cart.cart_items.length === 0)
      return res.status(400).json({ error: "Cart is empty" });

    const address = await prisma.user_address.findFirst({
      where: { address_id, userId },
    });
    if (!address)
      return res.status(400).json({
        error: "Invalid Shipping address OR No Shipping Address Found...",
      });

    const totalAmount = cart.cart_items.reduce(
      (sum, item) => sum + item.price,
      0
    );

    let finalAmount = totalAmount;
    let discountAmount = 0;
    let couponId: number | null = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (!coupon || !coupon.isActive) {
        return res
          .status(400)
          .json({ error: "Invalid or Inactive coupon code ..." });
      }

      const now = new Date();
      if (now < coupon.validFrom || now > coupon.validTo) {
        return res
          .status(400)
          .json({ message: "Coupon expired or not yet valid..." });
      }

      if (coupon.minOrderValue && totalAmount < coupon.minOrderValue) {
        return res
          .status(400)
          .json({ error: "Order does not meet coupon requirements" });
      }

      //calculate discount l
      if (coupon.discountType === "PERCENTAGE") {
        discountAmount = (totalAmount * coupon.discountValue) / 100;
      } else if (coupon.discountType === "FIXED") {
        discountAmount = coupon.discountValue;
      }
      if(discountAmount > totalAmount) {
        return res.status(400).json({error: "Discount cannot exceed order total"})
      }
      finalAmount = totalAmount - discountAmount;
      couponId = coupon.id;
    }
    // creating order with discount information...
    const order = await prisma.order_table.create({
      data: {
        userId,
        shippingAddress_id: address.address_id,
        total_amount: totalAmount,
        final_amount: finalAmount,
        discount_amount: discountAmount,
        couponId: couponId,
        order_items: {
          create: cart.cart_items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { order_items: true, coupon: true },
    });

    await prisma.cart_items.deleteMany({ where: { cart_id: cart.cart_id } });
    return res
      .status(201)
      .json({ message: "Order placed successfully ", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to place the order..." });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(404).json({ message: "Login first.." });
    const { id } = req.params; //orderId

    const order = await prisma.order_table.findUnique({
      where: { order_id: Number(id) },
    });
    if (!order) return res.status(404).json({ message: "Order not found... " });
    const updateOrder = await prisma.order_table.update({
      where: { order_id: Number(id) },
      data: { status: "CANCELLED" },
    });
    res.status(200).json({
      message: `Order #${id} marked as CANCELLED !`,
      order: updateOrder,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
};

export const orderHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Login first.." });
    const userId = req.user.id;
    const history = await prisma.order_table.findMany({
      where: { userId: userId },
      include: { order_items: true, user_address: true },
    });
    if (!history)
      return res.status(404).json({ message: "No history found..." });
    res.status(200).json({ message: "User History:- ", history });
  } catch (error) {
    res.status(500).json({ error: "Failed to Show order history..." });
  }
};

export const checkStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Login first.." });
    const id = req.params.id;
    const order = await prisma.order_table.findUnique({
      where: { order_id: Number(id) },
    });
    if (!order) return res.status(404).json({ message: "Order not found...." });

    const status = `${order?.status}  ON  ${order?.order_date}`;
    return res.status(200).json({ status });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Cannot find the status of the Order...." });
  }
};

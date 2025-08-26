import { Request, Response } from "express";
import prisma from "../config/config";
import bcrypt from "bcrypt";



// UPDATE LOGGEDIN USER
export const updateUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const id = req.user.id;
    const { username, email, first_name, last_name, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user)
      return res
        .status(404)
        .json({ error: "No user with the given Id found...." });
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        username,
        email,
        first_name,
        last_name,
        password: hashedPassword,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to Update the user..." });
  }
};

// DELETE LOGGEDIN USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const id = req.user.id;
    await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "User deleted successfully!.. " });
  } catch (error) {
    res.status(500).json({ error: "Failed to Delete the user..." });
  }
};

// get my profile only if Authenticated
export const getMyProfile = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Not logged in" });
  res.json(req.user);
};

// ADD SHIPPING ADDRESS
export const addShippingAddress = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(404).json({ message: "No User Found ..Login" });
    const userId = req.user.id;
    const {
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
      isShipping_address,
    } = req.body;

    if (isShipping_address) {
      await prisma.user_address.updateMany({
        where: { userId: userId, isShipping_address: true },
        data: { isShipping_address: false },
      });
    }

    const newAddress = await prisma.user_address.create({
      data: {
        userId: userId,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
        isShipping_address,
      },
    });

    return res.status(201).json({ message: "Address added successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add address" });
  }
};


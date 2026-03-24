"use server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { dbConnect } from "@/utils/db";
import User from "@/models/user.model";

/**
 * Create User
 */
export async function createUser(data: {
  fname: string;
  lname: string;
  email: string;
  password: string;
}) {
  try {
    await dbConnect();

    const existing = await User.findOne({ email: data.email });

    if (existing) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: hashedPassword,
    });

    return {
      success: true,
      user: {
        _id: user._id.toString(),
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Create user error:", error);
    return { error: "Failed to create user" };
  }
}






/**
 * Get User By ID
 */
export async function getUserById(id: string) {
  try {
    await dbConnect();

    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const user = await User.findById(id).lean();

    return user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}






/**
 * Get User By Email
 */
export async function getUserByEmail(email: string) {
  try {
    await dbConnect();

    const user = await User.findOne({ email })
      .select("+password")
      .lean();

    return user;
  } catch (error) {
    console.error("Get user by email error:", error);
    return null;
  }
}






/**
 * Update User
 */
export async function updateUser(
  userId: string,
  data: {
    fname?: string;
    lname?: string;
    image?: string;
  }
) {
  try {
    await dbConnect();

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    );

    revalidatePath("/profile");

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Update user error:", error);
    return { error: "Failed to update user" };
  }
}






/**
 * Update Last Login
 */
export async function updateLastLogin(userId: string) {
  try {
    await dbConnect();

    await User.findByIdAndUpdate(userId, {
      lastLogin: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Update last login error:", error);
    return { error: "Failed to update login time" };
  }
}






/**
 * Delete User
 */
export async function deleteUser(userId: string) {
  try {
    await dbConnect();

    await User.findByIdAndDelete(userId);

    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return { error: "Failed to delete user" };
  }
}
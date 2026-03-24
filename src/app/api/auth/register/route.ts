import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { fname, lname, email, password } = await req.json();

    if (!fname || !lname || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const adminExists = await User.findOne({ role: "admin" });

    let isAdminRequest = false;

    const token = req.cookies.get("token")?.value;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as { id: string; role: string };

        if (decoded.role === "admin") {
          isAdminRequest = true;
        }
      } catch {}
    }

    // FIRST ADMIN CREATION
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        fname,
        lname,
        email,
        password: hashedPassword,
        role: "admin",
      });

      return NextResponse.json(
        { message: "First admin created" },
        { status: 201 }
      );
    }

    // ADMIN CREATES ANOTHER ADMIN
    if (!isAdminRequest) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json(
      { message: "Admin created successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
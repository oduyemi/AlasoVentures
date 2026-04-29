import mongoose, { Schema, Document, Types, models } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: "user" | "admin";
  image?: string;
  firstLogin: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    image: {
      type: String,
      default: null,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);

export default User;
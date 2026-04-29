import mongoose, { Schema, Document, Types } from "mongoose";


export interface IBlog extends Document {
  _id: Types.ObjectId;
  title: string;
  excerpt: string;
  image: string;
  date: Date;
  category: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}


const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
export default Blog
import { Request, Response } from "express";
import Contact from "../models/contact.model";

export const handleContactSubmission = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, message } = req.body;
    if (!fullname || !email || !message || !phone) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    const contact = new Contact({ name, email, phone, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

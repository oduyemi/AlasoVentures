import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Contact from "@/models/contact.model";
import { sendContactSubmission } from "../../../../helper/sendContactNotification";
import User from "@/models/user.model";

/**
 * GET CONTACT ENTRIES
 */

 export async function GET(req: NextRequest) {
    try {
      await dbConnect();
      const { searchParams } = new URL(req.url);
      const status = searchParams.get("status");
      const subject = searchParams.get("subject");
      const filter: Record<string, string> = {};
  
      if (status) {
        filter.status = status;
      }
  
      if (subject) {
        filter.subject = subject;
      }
  
      const contacts = await Contact.find(filter)
        .sort({ createdAt: -1 });
  
      return NextResponse.json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
  
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch contact entries",
        },
        { status: 500 }
      );
    }
  }

/**
 * CREATE CONTACT ENTRY
 */ 
 export async function POST(req: NextRequest) {
   try {
     await dbConnect();
     const body = await req.json();
     const { fullname, email, phone, subject, message } = body;
    if (!fullname || !email || !phone || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }
    const contact = await Contact.create({
        fullname,
        email,
        phone,
        subject,
        message,
      });
 
      const admins = await User.find(
        { role: "admin" },
        { email: 1, _id: 0 }
      );
      
      const recipients = admins.map((admin) => admin.email).join(",");
      
      await sendContactSubmission(recipients, {
        fullname,
        email,
        phone,
        subject,
        message,
      });
 
     return NextResponse.json(
       {
         success: true,
         message: "Contact form submitted successfully",
         data: contact,
       },
       { status: 201 }
     );
   } catch (error) {
     console.error(error);
 
     return NextResponse.json(
       {
         success: false,
         message: "Failed to submit contact form",
       },
       { status: 500 }
     );
   }
 }
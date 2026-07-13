import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Appointment from "@/models/appointment.model";
import { sendAppointmentBooking } from "../../../../helper/sendAppointmentBooking";
import User from "@/models/user.model";

/**
 * GET APPOINTMENT BOOKING ENTRIES
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
  
      const appointments = await Appointment.find(filter)
        .sort({ createdAt: -1 });
  
      return NextResponse.json({
        success: true,
        count: appointments.length,
        data: appointments,
      });
  
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch appointments",
        },
        { status: 500 }
      );
    }
  }

/**
 * CREATE APPOINTMENTS ENTRY
 */ 
 export async function POST(req: NextRequest) {
   try {
     await dbConnect();
     const body = await req.json();
     const { fullname, email, phone, proposedDate, service,additionalNotes } = body;
    if (!fullname || !email || !phone || !proposedDate || !service || !additionalNotes) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }
    const appointment = await Appointment.create({
        fullname,
        email,
        phone,
        proposedDate,
        service,
        additionalNotes
      });
 
      const admins = await User.find(
        { role: "admin" },
        { email: 1, _id: 0 }
      );
      
      const recipients = admins.map((admin) => admin.email).join(",");
      
      await sendAppointmentBooking(recipients, {
        fullname,
        email,
        phone,
        proposedDate,
        service,
        additionalNotes
      });
 
     return NextResponse.json(
       {
         success: true,
         message: "Appointment booked successfully",
         data: appointment,
       },
       { status: 201 }
     );
   } catch (error) {
     console.error(error);
 
     return NextResponse.json(
       {
         success: false,
         message: "Failed to submit appointment",
       },
       { status: 500 }
     );
   }
 }
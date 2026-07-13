import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Appointment from "@/models/appointment.model";
import { getCurrentUser } from "@/utils/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const appointment = await Appointment.findById(id)
      .populate(
        "treatedBy",
        "fullname email role image"
      );

    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch appointment",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const update: Record<string, any> = {};
    if (body.status) {
      update.status = body.status;
    }

    if (body.status === "treated") {
        update.treatedAt = new Date();
        update.treatedBy = user._id;
    }
      
    if (body.status === "pending") {
        update.treatedAt = null;
        update.treatedBy = null;
    }
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
        "treatedBy",
        "fname lname email role image"
    )

    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update appointment",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) {
        return NextResponse.json(
            {
            success: false,
            message: "Unauthorized",
            },
            { status: 401 }
        );
        }
    
        const { id } = await params;
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return NextResponse.json(
                {
                success: false,
                message: "Appointment not found",
                },
                { status: 404 }
            );
        }
  
      return NextResponse.json({
        success: true,
        message: "Appointment deleted",
      });
  
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete appointment",
        },
        { status: 500 }
      );
    }
}
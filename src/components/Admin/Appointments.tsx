export interface AppointmentEntry {
    _id: string;
  
    fullname: string;
    email: string;
    phone: string;
  
    proposedDate: string;
    service: string;
    additionalNotes: string;
  
    status: "pending" | "treated";
  
    treatedAt?: string;
  
    treatedBy?: {
      _id: string;
      fname: string;
      lname: string;
      email: string;
      image?: string;
    };
  
    createdAt: string;
  }
export interface ContactEntry {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
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
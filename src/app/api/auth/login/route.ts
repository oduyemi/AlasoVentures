import { handleLogin } from "@/utils/auth";
import { dbConnect } from "@/utils/db";

export async function POST(req: Request) {
    await dbConnect();
    return handleLogin(req, "admin");
  }
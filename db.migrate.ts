import User from "@/models/user.model";
import mongoose from "mongoose";

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const result = await User.updateMany(
      { isDeleted: { $exists: false } },
      {
        $set: {
          isDeleted: false,
          deletedAt: null,
        },
      }
    );

    console.log("Migration complete:", result);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}
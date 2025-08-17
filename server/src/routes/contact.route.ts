import { Router } from "express";
import { handleContactSubmission } from "../controllers/contact.controller";

const router = Router();

router.post("/", handleContactSubmission);

export default router;

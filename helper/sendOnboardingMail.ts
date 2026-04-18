import { escapeHtml } from "@/utils/escapeHtml";
import { sendEmailWithRetry } from "./emailLogic";

export const sendOnboardingMail = async (recipient: string, code: string) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Admin Onboarding - Kofoworola Alasooke</h2>
      <p>Hi there,</p>
      <p>Welcome onboard! This is your access to the admin dashboard. Please update your password when you're logged in:</p>
      <h1 style="color: #010156;">${escapeHtml(code)}</h1>
      <p>We look forward to having a great time working together.</p>
      <p>Best regards,<br/>Kofoworola</p>
    </div>
  `;

  await sendEmailWithRetry(
    recipient,
    "Onboarding for new Administrators",
    htmlContent
  );
};
import { escapeHtml } from "@/utils/escapeHtml";
import { sendEmailWithRetry } from "./emailLogic";

type ContactSubmission = {
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export const sendContactSubmission = async (
  recipient: string,
  body: ContactSubmission
) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Contact Form Submission</h2>

      <p>You've received a new contact form submission from your website.</p>

      <hr />

      <p><strong>Name:</strong> ${escapeHtml(body.fullname)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>

      <hr />

      <p><strong>Message:</strong></p>
      <p>${escapeHtml(body.message)}</p>

      <hr />

      <p>Best regards,<br />Website Contact Form</p>
    </div>
  `;

  await sendEmailWithRetry(
    recipient,
    `New Contact Form Submission: ${body.subject}`,
    htmlContent
  );
};
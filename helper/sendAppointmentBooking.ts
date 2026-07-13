import { escapeHtml } from "@/utils/escapeHtml";
import { sendEmailWithRetry } from "./emailLogic";

type AppointmentBooking = {
  fullname: string;
  email: string;
  phone: string;
  proposedDate: string;
  service: string;
  additionalNotes: string;
};

export const sendAppointmentBooking = async (
  recipient: string,
  body: AppointmentBooking
) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Appointment Booked</h2>

      <p>Someone just booked an appointment from your website.</p>

      <hr />

      <p><strong>Name:</strong> ${escapeHtml(body.fullname)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
      <p><strong>Proposed Appointment Date:</strong> ${escapeHtml(body.proposedDate)}</p>
      <p><strong>Service:</strong> ${escapeHtml(body.service)}</p>
      

      <hr />

      <p><strong>Message:</strong></p>
      <p><strong>Additional Notes:</strong> ${escapeHtml(body.additionalNotes)}</p>

      <hr />

      <p>Best regards,<br />Book Appointment Form</p>
    </div>
  `;

  await sendEmailWithRetry(
    recipient,
    `New Appointment Booked for ${body.proposedDate}`,
    htmlContent
  );
};
import { transporter } from "./tansporter";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"Kofoworola Alasoke" <no-reply@kofoworolaalasooke.com>`,
    to,
    subject,
    html,
  });
};
import { transporter } from "./tansporter";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"ProGrowing Forum" <no-reply@progrowing.com>`,
    to,
    subject,
    html,
  });
};
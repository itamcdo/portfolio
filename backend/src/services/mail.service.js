import nodemailer from "nodemailer";

export async function sendMail({ nome, email, mensagem }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: Number(process.env.MAIL_PORT) === 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Contato Portfólio" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Nova mensagem de ${nome}`,
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `
    });

    console.log("📧 Email enviado com sucesso");
  } catch (error) {
    console.error("❌ Mail error:", error.message);
    throw error;
  }
}

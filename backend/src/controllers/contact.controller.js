import { sendMail } from "../services/mail.service.js";

export async function sendContactMessage(req, res) {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Dados obrigatórios ausentes" });
  }

  try {
    await sendMail({ nome, email, mensagem });
    return res.status(200).json({ message: "Mensagem enviada com sucesso" });
  } catch (error) {
    console.error("❌ Controller error:", error.message);
    return res.status(500).json({ error: "Erro ao enviar mensagem" });
  }
}

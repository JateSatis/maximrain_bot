import axios from "axios";
import { TUNNEL_URL } from "../config/localhostTunnel";

const BOT_TOKEN = process.env.BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export const sendTelegramMessage = async (chatId: number, text: string) => {
  try {
    await axios.post(`${API_URL}/sendMessage`, {
      chat_id: chatId,
      text,
    });
    console.log(`Отправлено сообщение в чат ${chatId}: ${text}`);
  } catch (error) {
    console.error(
      "Ошибка при отправке сообщения:",
      error.response?.data || error.message
    );
  }
};

export const updateWebhook = async (chatId: number) => {
  await axios.post(`${API_URL}/setChatMenuButton`, {
    chat_id: chatId,
    menu_button: {
      type: "web_app",
      text: "Открыть сайт",
      web_app: {
        url: `${TUNNEL_URL || "https://timer-dmb.ru"}/mini-app`,
      },
    },
  });
};

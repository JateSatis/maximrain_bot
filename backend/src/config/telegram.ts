import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Set Telegram webhook
export const setTelegramWebhook = async (url: string) => {
  const webhookUrl = `${url}/webhook`;
  const telegramUrl = `${API_URL}/setWebhook?url=${encodeURIComponent(
    webhookUrl
  )}`;

  try {
    const response = await axios.get(telegramUrl);
    if (response.data.ok) {
      console.log(`🟢 Webhook set successfully: ${webhookUrl}`);
    } else {
      console.error("🔴 Failed to set webhook:", response.data);
    }
  } catch (err) {
    console.error("❌ Error setting webhook:", err.message);
  }
};

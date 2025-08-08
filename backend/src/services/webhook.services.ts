import { TelegramUpdateDto } from "../models/telegram.models";
import { findOrCreateUser } from "../models/user.models";
import { sendTelegramMessage, updateWebhook } from "../utils/telegramApi";

export const processTelegramUpdate = async (updateBody: TelegramUpdateDto) => {
  updateWebhook(updateBody.message.chat.id);

  const message = updateBody.message;
  if (
    message.text &&
    message.text.startsWith("/") &&
    !message.text.includes(" ")
  ) {
    const command = message.text.slice(1); // Remove the '/' prefix

    // Handle different commands
    switch (command) {
      case "start":
        await findOrCreateUser({
          telegram_user_id: updateBody.message.from.id,
          first_name: message.from?.first_name,
          last_name: message.from?.last_name,
          username: message.from?.username,
        });

        // Send welcome message back via Telegram Bot API
        await sendTelegramMessage(
          message.chat.id,
          `Hello ${message.from.username}! Welcome to the bot! 🎉`
        );
        break;
      case "help":
        await sendTelegramMessage(
          message.chat.id,
          "Available commands:\n/start - Start the bot\n/help - Show this help message"
        );
        break;
      default:
        await sendTelegramMessage(
          message.chat.id,
          "Unknown command. Use /help to see available commands."
        );
    }
  }
};

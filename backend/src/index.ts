import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

// URL для взаимодействия с API Telegram
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
console.log(API_URL);

// Переменная для отслеживания последнего обработанного обновления
let lastUpdateId: number | null = null;

// Функция для получения обновлений
async function getUpdates() {
  try {
    // Отправляем запрос к методу getUpdates
    const response = await axios.get(`${API_URL}/getUpdates`, {
      params: {
        offset: lastUpdateId ? lastUpdateId + 1 : undefined, // Начинаем с последнего обработанного ID + 1
        timeout: 30, // Долгий опрос (до 30 секунд)
      },
    });

    const updates = response.data.result;

    if (updates.length > 0) {
      console.log(`Получено ${updates.length} обновлений:`);

      // Обрабатываем каждое обновление
      for (const update of updates) {
        processUpdate(update);
        lastUpdateId = update.update_id; // Обновляем lastUpdateId
      }
    }
  } catch (error) {
    console.error(
      "Ошибка при получении обновлений:",
      error.response?.data || error.message
    );
  }
}

// Функция для обработки одного обновления
function processUpdate(update: any) {
  console.log(update);
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    console.log(`Сообщение от пользователя: ${text}`);

    // Отправляем ответное сообщение
    sendMessage(chatId, `Вы сказали: ${text}`);
  }
}

// Функция для отправки сообщения
async function sendMessage(chatId: number, text: string) {
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
}

// Главный цикл Long Polling
async function startLongPolling() {
  console.log("Начало Long Polling...");
  while (true) {
    await getUpdates();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Ждём 1 секунду перед следующим запросом
  }
}

// Запускаем Long Polling
startLongPolling();

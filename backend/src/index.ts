import dotenv from "dotenv";
import axios from "axios";
import express, { Request, Response, Router } from "express";
import path from "path";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

const app = express();

app.listen(3000, async () => {
  console.log(`Server is up and running on port: ${3000}`);
});

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (if needed)
app.use(express.urlencoded({ extended: true }));

// URL для взаимодействия с API Telegram
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
console.log(API_URL);

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

const mainRouter = Router();

mainRouter.post("/webhook", async (req: Request, res: Response) => {
  console.log(req.body);
  return;
});

// Статические файлы React-приложения
const reactBuildPath = path.join(__dirname, "../frontend"); // Путь к собранному React-приложению
app.use("/mini-app", express.static(reactBuildPath));

// Для всех остальных запросов отдаём главную страницу React-приложения
app.get("/mini-app/*", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

app.use(mainRouter);

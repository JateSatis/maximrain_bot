import dotenv from "dotenv";
import express from "express";
import path from "path";
import { startTunnel } from "./config/localhostTunnel";
import webhookRouter from "./routes/webhook.routes";

dotenv.config();

const PORT = 3000;

const app = express();

app.listen(PORT, async () => {
  console.log(`Server is up and running on port: ${PORT}`);
  startTunnel();
});

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (if needed)
app.use(express.urlencoded({ extended: true }));

// Статические файлы React-приложения
const reactBuildPath = path.join(__dirname, "../../frontend/dist"); // Путь к собранному React-приложению
app.use("/mini-app", express.static(reactBuildPath));

// Для всех остальных запросов отдаём главную страницу React-приложения
app.get("/mini-app/*", (_, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

app.use(webhookRouter);

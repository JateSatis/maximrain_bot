import { Router } from "express";
import { handleWebhook } from "../controllers/webhook.controllers";

const webhookRouter = Router();

// Telegram sends updates here
webhookRouter.post("/webhook", handleWebhook);

export default webhookRouter;

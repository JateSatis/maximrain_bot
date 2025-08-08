import { Request, Response } from "express";
import { processTelegramUpdate } from "../services/webhook.services";

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const update = req.body;

    // Let service handle the logic
    await processTelegramUpdate(update);

    // Telegram expects 200 OK quickly
    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Error processing update");
  }
};

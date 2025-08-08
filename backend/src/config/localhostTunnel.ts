import dotenv from "dotenv";
import { exec } from "child_process";
import { setTelegramWebhook } from "./telegram";

dotenv.config();

const PORT = process.env.PORT;
export let TUNNEL_URL: string | null = null;

export const startTunnel = () => {
  const tunnel = exec(`ssh -R 80:localhost:${PORT} localhost.run`);

  if (!tunnel.stdout) {
    console.error("No stdout");
    return;
  }

  tunnel.stdout.on("data", (data) => {
    const output = data.toString();
    const urlMatch = output.match(/(https?:\/\/[^\s]+\.lhr\.life)/);
    if (urlMatch) {
      TUNNEL_URL = urlMatch[0];
      console.log(`Mini-app url: ${TUNNEL_URL}/mini-app`);
      setTelegramWebhook(urlMatch[0]);
    } else {
      console.log(output.trim());
    }
  });
};

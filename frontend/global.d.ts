// global.d.ts
interface TelegramWebApp {
  WebApp: {
    initDataUnsafe: {
      user?: {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
      };
    };
    requestContact: () => Promise<{ phone_number: string }>;
    sendData: (data: string) => void;
    // Добавьте другие методы и свойства по необходимости
  };
}

interface Window {
  Telegram: TelegramWebApp;
}

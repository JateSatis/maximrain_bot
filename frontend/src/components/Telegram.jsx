import React, { useEffect, useState } from "react";

const TelegramApp = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkTelegram = () => {
      console.log(window);
      // Проверяем наличие Telegram.WebApp
      if (window.Telegram && window.Telegram.WebApp) {
        console.log("Telegram WebApp SDK загружен!");

        // Говорим Telegram, что всё готово (иначе белый экран)
        window.Telegram.WebApp.ready();

        const userData = window.Telegram.WebApp.initDataUnsafe?.user;

        if (userData) {
          setUser(userData);
        } else {
          setError("Данные пользователя недоступны.");
        }
      } else {
        // Если не нашли — подождем еще немного
        setTimeout(checkTelegram, 100);
      }
    };

    // Начинаем проверку
    checkTelegram();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Абоба кринж лолка</h1>
      {user ? (
        <div>
          <p>Имя: {user.first_name}</p>
          <p>Фамилия: {user.last_name || "Не указана"}</p>
          <p>Username: {user.username || "Не указан"}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>Загрузка данных пользователя...</p>
      )}
    </div>
  );
};

export default TelegramApp;

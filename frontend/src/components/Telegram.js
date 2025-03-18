import React, { useEffect, useState } from "react";

const TelegramApp = () => {
  // Состояние для хранения данных пользователя
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Проверяем, доступен ли Telegram.WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Telegram WebApp SDK загружен!");

      // Получаем данные пользователя
      const userData = window.Telegram.WebApp.initDataUnsafe?.user;

      if (userData) {
        setUser(userData); // Сохраняем данные в состоянии
      } else {
        setError("Данные пользователя недоступны.");
      }
    } else {
      setError("Эта страница должна быть открыта в Telegram MiniApp.");
    }
  }, []); // Запускаем только один раз при монтировании

  // Отображение данных пользователя
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Привет из Telegram MiniApp!</h1>
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

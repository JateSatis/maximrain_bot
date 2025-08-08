import { useState } from "react";
import "./App.css";
import TelegramApp from "./components/Telegram";

function App() {
  const [count, setCount] = useState(0);

  return (
		<>
			<div>Hellow world!</div>
      <TelegramApp></TelegramApp>
    </>
  );
}

export default App;

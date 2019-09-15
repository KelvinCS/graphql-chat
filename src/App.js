import React from "react";
import "./App.css";

import { useMessages } from "./logic";

function App() {
  const messages = useMessages();

  return (
    <div className="App">
      <section className="messages">
        {messages.map(({ text, id }) => (
          <div className="message" key={id}>
            <p>{text}</p>
          </div>
        ))}
        <div className="message"></div>
      </section>
      <section className="typing-box">
        <input className="typing-box__input"></input>
        <button className="typing-box__send-button">Enviar</button>
      </section>
    </div>
  );
}

export default App;

import "./App.css";

import { useState } from "react";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <div className="text_to_generate_qr">
        <textarea
          type="text"
          value={text}
          placeholder="Enter Text"
          onChange={(e) => setText(e.target.value)}
          maxLength={2096}
          style={{ resize: "none" }}
        />
      </div>
      <div className="text_qrcode">
        {!text ? (
          <div className="empty_text">
            Enter Text <span>☝</span>
          </div>
        ) : (
          <div className="qr_container">
            <img src={`/api/qrcode?text=${encodeURIComponent(text)}`} />

            <button
              className="qr_generate_button"
              onClick={() => {
                const a = document.createElement("a");
                a.href = `/api/qrcode?text=${encodeURIComponent(text)}`;
                a.download = "";
                a.click();
              }}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import axios from "axios";
import { useState } from "react";

export const QRCodeGenerator = ({ user, setUser }) => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/api/qrcode?text=${encodeURIComponent(text)}`
      );

      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Failed to get QR!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h3>Welcome {user.name}</h3>
        <button
          className="logout_button"
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
      </div>
      <div className="text_to_generate_qr">
        <textarea
          type="text"
          value={text}
          placeholder="Enter Text"
          onChange={(e) => setText(e.target.value)}
          maxLength={2096}
          style={{ resize: "none" }}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
      <div className="text_qrcode">
        {loading ? (
          <div className="empty_text">Loading...</div>
        ) : !imageUrl ? (
          <div className="empty_text">
            Enter Text <span>☝</span> &amp; Click Submit
          </div>
        ) : (
          <div className="qr_container">
            <img src={imageUrl} />

            <button
              className="qr_generate_button"
              onClick={() => {
                const a = document.createElement("a");
                a.href = imageUrl;
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
};

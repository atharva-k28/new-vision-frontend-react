import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const NewVision = () => {
  const [image, setImage] = useState<File | null>(null);
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const request = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    setOutputText("");

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch(`${API_BASE_URL}/process-image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to fetch caption");

      const res = await response.json();
      setOutputText(res.caption);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const speak = () =>{
    const utterance = new SpeechSynthesisUtterance(outputText);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance)

  }

  useEffect(()=>{
    if(outputText){
      speak();
    }
  },[outputText]);

  

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Image Caption Generator</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImage(e.target.files[0]);
              setOutputText("");
              setError("");
            }
          }}
        />

        {image && (
          <div className="preview">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="preview-img"
            />
          </div>
        )}

        <button onClick={request} disabled={loading || !image}>
          {loading ? "Processing..." : "Submit"}
        </button>

        {error && <p className="error">{error}</p>}

        {outputText && (
          <>
          <div className="output">
            <h3>Output Caption:</h3>
            <p>{outputText}</p>
          </div>
          <button onClick={speak}>SPEAK</button>
          </>
        )}
      </div>
    </div>
  );
};

export default NewVision;

import { useState } from "react";
import "./App.css"; // 

type formdata = {
  img_url: string;
};

const NewVision = () => {
  const [formData, SetFormData] = useState<formdata>({ img_url: "" });
  const [outputText, setOutputText] = useState("");

  const request = async () => {
    const response = await fetch("http://127.0.0.1:8000/process-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res = await response.json();
    setOutputText(res.caption);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Image URL Input</h2>

        <input
          type="text"
          placeholder="Enter image URL"
          value={formData.img_url}
          onChange={(e) =>
            SetFormData({ ...formData, img_url: e.target.value })
          }
        />

        <button onClick={request}>Submit</button>

        {formData.img_url && (
          <div className="preview">
            <h3>Preview:</h3>
            <img
              src={formData.img_url}
              alt="Input Preview"
            />
          </div>
        )}

        {outputText && (
          <div className="output">
            <h2>Output Caption:</h2>
            <p>{outputText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewVision;

import { useState } from "react";
import "./App.css";


const NewVision = () => {
  const [image,SetImage] = useState<File>();
  const [outputText, setOutputText] = useState("");

  

  const request = async () => {

    if(!image)return;

    const formData = new FormData;
    formData.append("file",image);

    const response = await fetch("http://127.0.0.1:8000/process-image", {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    setOutputText(res.caption);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Image URL Input</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>{
            if(e.target.files){
              SetImage(e.target.files[0])
            }
          }
          }
        />

        <button onClick={request}>Submit</button>

        {/* {formData.img_url && (
          <div className="preview">
            <h3>Preview:</h3>
            <img
              src={formData.img_url}
              alt="Input Preview"
            />
          </div>
        )} */}

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

import { use, useState } from "react";

type formdata = {
  img_url: string,
};

const NewVision = () =>{
  const [formData, SetFormData] = useState<formdata>({ img_url: "" });
  const [outputText,setOutputText] = useState("");


  const request= async() =>{
    const response = await fetch("http://127.0.0.1:8000/process-url",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const res = await response.json();
    setOutputText(res.caption);
  }
  return(
    <>
    <h2>INPUT TRIAL TEXT:</h2>
    <input type="text" placeholder="enter text" value={formData.img_url} onChange={(e)=>{SetFormData({...formData,img_url:e.target.value});}}/>
    <button onClick={request}>SUBMIT</button>

    {formData.img_url && (
  <img src={formData.img_url} alt="Input Preview" width="300" />
)}


    {outputText && <div>
        <h2>OUTPUT TEXT:</h2>
        <p>{outputText}</p>
      </div>}
    </>
  )
}

export default NewVision;
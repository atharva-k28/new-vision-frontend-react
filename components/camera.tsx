import { useEffect, useRef } from "react";

interface CameraProps {
  setImage: (file: File) => void;
}

const CameraCapture = ({ setImage }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const livecamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log("Unable to access camera", err);
      }
    };
    livecamera();
  }, []);

  const blobToFile = (blob: Blob, filename: string) => {
    return new File([blob], filename, {
      type: blob.type,
      lastModified: Date.now(),
    });
  };

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const file = blobToFile(blob, "image.jpeg");
            setImage(file);
          }
        }, "image/jpeg");
      }
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay playsInline className="camera-video" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button className="camera-button" onClick={capture}>📸 Capture</button>
    </div>
  );
};

export default CameraCapture;

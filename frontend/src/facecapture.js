import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function FaceCapture({ onCapture }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    if (onCapture) onCapture(imageSrc);
  };

  return (
    <div>
      {!imgSrc ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button onClick={capture}>Capture Face</button>
        </>
      ) : (
        <>
          <img src={imgSrc} alt="Captured face" width={160} />
          <button onClick={() => setImgSrc(null)}>Retake</button>
        </>
      )}
    </div>
  );
}

export default FaceCapture;
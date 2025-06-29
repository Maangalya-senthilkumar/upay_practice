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
    <div style={{ width: '100%', maxWidth: 320, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!imgSrc ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={window.innerWidth < 400 ? 240 : 320}
            height={window.innerWidth < 400 ? 180 : 240}
            style={{ width: '100%', maxWidth: 320, borderRadius: 8 }}
          />
          <button style={{ width: '100%', marginTop: 8 }} onClick={capture}>Capture Face</button>
        </>
      ) : (
        <>
          <img src={imgSrc} alt="Captured face" width={160} style={{ width: '100%', maxWidth: 160, borderRadius: 8 }} />
          <button style={{ width: '100%', marginTop: 8 }} onClick={() => setImgSrc(null)}>Retake</button>
        </>
      )}
    </div>
  );
}

export default FaceCapture;
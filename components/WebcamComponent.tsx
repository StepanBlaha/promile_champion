'use client';

import React, { useRef } from 'react';
import Webcam from 'react-webcam';

export default function WebcamComponent() {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
}
'use client';

import styles from './page.module.css';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { Input } from '@/components/Input/Input';
import { Camera } from 'lucide-react';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';


export default function Add() {

  const [name, setName] = useState<string>("");
  const [promile, setPromile] = useState<number>(0);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const src = webcamRef.current?.getScreenshot() ?? null;
    setPhoto(src);
    setShowCamera(false);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Promile Champion</h1>

      <div className={styles.Form}>

        <Input
          title='Name'
          placeholder='John Doe'
          value={name}
          inputClassName={styles.Input}
          onChange={(val)=>setName(val as string)}
        />
        <Input
          title='Promile'
          placeholder='6-7'
          value={promile}
          type='number'
          inputClassName={styles.Input}
          onChange={(val)=>setPromile(val as number)}
        />

        {showCamera && (
          <div className={styles.CameraBlock}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className={styles.Webcam}
            />
            <PrimaryButton onClick={capture}><Camera size={18} /> Capture</PrimaryButton>
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        {photo && !showCamera && (
          <img src={photo} alt="captured" className={styles.Preview} />
        )}

        <div className={styles.FormBlock}>
          <PrimaryButton onClick={() => setShowCamera(v => !v)}><Camera size={18} /></PrimaryButton>
          <SecondaryButton onClick={() => {}}>Submit</SecondaryButton>
        </div>
      </div>
      
      
      
      

    </main>
  );
}
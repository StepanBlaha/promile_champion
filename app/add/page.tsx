'use client';

import styles from './page.module.css';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { Input } from '@/components/Input/Input';
import { Camera, ImageUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import { insertSubmission, uploadFile } from '@/services/submision';

function base64ToFile(dataURL: string, filename: string): File {
  const [header, data] = dataURL.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
  const binary = atob(data);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new File([arr], filename, { type: mime });
}

const PROMILE_MIN = 0;
const PROMILE_MAX = 10; // ← update to match your Supabase check constraint

function parseSupabaseError(e: unknown): { field: 'name' | 'promile' | 'general'; message: string } {
  const msg = (e as { message?: string })?.message ?? '';

  if (msg.includes('promile')) {
    if (msg.includes('check constraint') || msg.includes('range') || msg.includes('violates'))
      return { field: 'promile', message: `Promile musí být v rozsahu ${PROMILE_MIN} – ${PROMILE_MAX} ‰.` };
    return { field: 'promile', message: 'Neplatná hodnota promile.' };
  }
  if (msg.includes('name'))
    return { field: 'name', message: 'Neplatné jméno.' };

  return { field: 'general', message: 'Něco se pokazilo. Zkus to znovu.' };
}

type Status = 'idle' | 'loading';

export default function Add() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [promile, setPromile] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const [nameError, setNameError] = useState('');
  const [promileError, setPromileError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearErrors = () => {
    setNameError('');
    setPromileError('');
    setGeneralError('');
  };

  const validate = () => {
    let valid = true;
    if (!name.trim()) {
      setNameError('Jméno je povinné.');
      valid = false;
    }
    const val = parseFloat(promile);
    if (!promile) {
      setPromileError('Promile je povinné.');
      valid = false;
    } else if (isNaN(val) || val < PROMILE_MIN || val > PROMILE_MAX) {
      setPromileError(`Musí být v rozsahu ${PROMILE_MIN} – ${PROMILE_MAX} ‰.`);
      valid = false;
    }
    return valid;
  };

  const capture = () => {
    const src = webcamRef.current?.getScreenshot() ?? null;
    if (!src) return;
    setFile(base64ToFile(src, `capture-${Date.now()}.jpg`));
    setPreview(src);
    setShowCamera(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setShowCamera(false);
  };

  const handleSubmit = async () => {
    clearErrors();
    if (!validate()) return;
    setStatus('loading');
    try {
      let photo_url: string | null = null;
      if (file) photo_url = await uploadFile({ file });
      await insertSubmission({ name, promile, photo_url });
      setName('');
      setPromile('');
      setFile(null);
      setPreview(null);
      router.push('/leaderboard');
    } catch (e) {
      const { field, message } = parseSupabaseError(e);
      if (field === 'name') setNameError(message);
      else if (field === 'promile') setPromileError(message);
      else setGeneralError(message);
      setStatus('idle');
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Add an Alcoholic</h1>

        <div className={styles.Form}>
          <Input
            title="Jméno"
            placeholder="Jan Novák"
            value={name}
            error={nameError}
            onChange={(val) => { setName(val as string); setNameError(''); }}
          />
          <Input
            title="Promile"
            placeholder="2.5"
            value={promile}
            type="number"
            error={promileError}
            hint={`Povolený rozsah: ${PROMILE_MIN} – ${PROMILE_MAX} ‰`}
            onChange={(val) => { setPromile(val as string); setPromileError(''); }}
          />

          {showCamera && (
            <div className={styles.CameraBlock}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className={styles.Webcam}
              />
              <PrimaryButton onClick={capture}>
                <Camera size={16} /> Vyfotit
              </PrimaryButton>
            </div>
          )}

          {preview && !showCamera && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="náhled" className={styles.Preview} />
          )}

          {generalError && (
            <p className={styles.errorMsg}>{generalError}</p>
          )}

          <div className={styles.FormBlock}>
            <PrimaryButton onClick={() => setShowCamera(v => !v)}>
              <Camera size={16} />
            </PrimaryButton>
            <SecondaryButton onClick={() => fileInputRef.current?.click()}>
              <ImageUp size={16} />
            </SecondaryButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.HiddenInput}
              onChange={handleFileChange}
            />
            <PrimaryButton
              onClick={handleSubmit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Ukládám…' : 'Odeslat'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </main>
  );
}

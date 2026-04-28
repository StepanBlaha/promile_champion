'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchData } from '@/services/submision';
import { Submission } from '@/types/submission.types';
import styles from './GalleryImageGrid.module.css';
import Sticker from '@/components/Stickers/Sticker';

function drinkSticker(id: string) {
  const n = [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 0);
  if (n % 8 === 0) return null;
  const src = `/drinks_outline/${(n % 30) + 1}.png`;
  const size = 120 + ((n >> 8) % 50);
  const half = Math.round(size * 0.3);
  const ci = (n ^ (n >> 13)) % 4;
  // lean into the corner: top-right +, top-left -, bottom-right -, bottom-left +
  const baseRotate = [-38, 38, 35, -35][ci];
  const rotate = baseRotate + (((n >> 5) % 21) - 10);
  const corner = ci === 0 ? { top: -half, right: -half }
    : ci === 1 ? { top: -half, left: -half }
    : ci === 2 ? { bottom: -half, right: -half }
    : { bottom: -half, left: -half };
  return { src, rotate, size, ...corner };
}

async function downloadImage(url: string, name: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const ext = blob.type.split('/')[1] || 'jpg';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name}.${ext}`;
  a.click();
  URL.revokeObjectURL(a.href);
}

type Props = { noHover?: boolean; downloadable?: boolean; noStickers?: boolean };

export default function GalleryImageGrid({ noHover, downloadable, noStickers }: Props) {
  const [entries, setEntries] = useState<Submission[]>([]);

  useEffect(() => {
    fetchData().then((data) => {
      if (data) setEntries(data.filter((e) => e.photo_url));
    });
  }, []);

  if (entries.length === 0) return null;

  return (
    <section className={`${styles.section} ${noHover ? styles.noHover : ''}`}>
      <div className={styles.grid}>
        {entries.map((e, i) => {
          const sticker = drinkSticker(e.id);
          return (
            <div
              key={e.id}
              className={`${styles.itemWrap} ${i === 0 ? styles.featured : ''} ${downloadable ? styles.downloadable : ''}`}
              onClick={downloadable ? () => downloadImage(e.photo_url!, e.name) : undefined}
            >
              {sticker && !noStickers && (
                <Sticker
                  src={sticker.src}
                  size={sticker.size}
                  rotate={sticker.rotate}
                  top={'top' in sticker ? sticker.top : undefined}
                  bottom={'bottom' in sticker ? sticker.bottom : undefined}
                  left={'left' in sticker ? sticker.left : undefined}
                  right={'right' in sticker ? sticker.right : undefined}
                  zIndex={10}
                />
              )}
              <div className={styles.item}>
                <Image
                  src={e.photo_url!}
                  alt={e.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className={styles.img}
                />
     
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

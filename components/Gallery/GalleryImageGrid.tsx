'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchData } from '@/services/submision';
import { Submission } from '@/types/submission.types';
import styles from './GalleryImageGrid.module.css';
import Sticker from '@/components/Stickers/Sticker';

// which tile index gets a sticker, and which drink
const TILE_STICKERS: Record<number, { src: string; rotate: number; size: number }> = {
  0: { src: '/drinks/budvar.png',       rotate: -12, size: 86 },  // featured tile
  2: { src: '/drinks/pilsner.png',      rotate: 16,  size: 78 },
  4: { src: '/drinks/radegast.png',     rotate: -8,  size: 80 },
  6: { src: '/drinks/bozkovrum.png',    rotate: 11,  size: 74 },
};

export default function GalleryImageGrid() {
  const [entries, setEntries] = useState<Submission[]>([]);

  useEffect(() => {
    fetchData().then((data) => {
      if (data) setEntries(data.filter((e) => e.photo_url));
    });
  }, []);

  if (entries.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.label}>FOTKY</div>
      <div className={styles.grid}>
        {entries.map((e, i) => {
          const sticker = TILE_STICKERS[i];
          return (
            <div
              key={e.id}
              className={`${styles.itemWrap} ${i === 0 ? styles.featured : ''}`}
            >
              {sticker && (
                <Sticker
                  src={sticker.src}
                  size={sticker.size}
                  rotate={sticker.rotate}
                  top={-30}
                  right={-16}
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
                <div className={styles.overlay}>
                  <span className={styles.overlayPromile}>{e.promile}‰</span>
                  <span className={styles.overlayName}>{e.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { fetchData } from '@/services/submision';
import styles from './page.module.css';
import GalleryImageGrid from '@/components/Gallery/GalleryImageGrid';
import Sticker from '@/components/Stickers/Sticker';

export default function Gallery() {



  return (
    <main className={styles.container}>
      <div className={styles.header}>
        
        <h1 className={styles.title}>Galerie
          <Sticker src="/drinks_outline/22.png" size={90} rotate={35}  bottom={-14} right={-60} />
        </h1>
      </div>
      <GalleryImageGrid noHover downloadable noStickers />
    </main>
  );
}

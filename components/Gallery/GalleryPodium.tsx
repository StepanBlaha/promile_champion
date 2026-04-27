'use client';

import styles from './GalleryPodium.module.css';
import { ENTRIES } from '@/data/entries';

const ORDER = [1, 0, 2]; // 2nd left, 1st centre, 3rd right
const HEIGHTS = ['160px', '220px', '120px'];
const LABELS = ['2ND', '1ST', '3RD'];

export default function GalleryPodium() {
  const top3 = ENTRIES.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.label}>PODIUM</div>
      <div className={styles.stage}>
        {ORDER.map((idx, col) => {
          const e = top3[idx];
          return (
            <div key={e.rank} className={`${styles.slot} ${idx === 0 ? styles.winner : ''}`}>
              <div className={styles.info}>
                <div className={styles.promile}>{e.promile.toFixed(1)}‰</div>
                <div className={styles.name}>{e.name}</div>
                <div className={styles.note}>{e.note}</div>
              </div>
              <div
                className={styles.block}
                style={{ height: HEIGHTS[col] }}
              >
                <span className={styles.blockRank}>{LABELS[col]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

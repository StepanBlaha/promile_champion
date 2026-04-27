'use client';

import styles from './GalleryMarquee.module.css';
import { ENTRIES } from '@/data/entries';

function Card({ rank, name, promile, note }: typeof ENTRIES[0]) {
  return (
    <div className={`${styles.card} ${rank === 1 ? styles.cardFirst : ''}`}>
      <div className={styles.accent} />
      <div className={styles.cardInner}>
        <span className={styles.rank}>#{rank}</span>
        <div className={styles.promile}>{promile.toFixed(1)}‰</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.note}>{note}</div>
      </div>
    </div>
  );
}

export default function GalleryMarquee() {
  const top = ENTRIES.slice(0, 4);
  const bot = [...ENTRIES].slice(3).reverse();

  return (
    <section className={styles.section}>
      <div className={styles.label}>HALL OF FAME</div>

      {/* row 1 — left */}
      <div className={styles.row}>
        <div className={styles.trackLeft}>
          {[...top, ...top].map((e, i) => <Card key={i} {...e} />)}
        </div>
      </div>

      {/* row 2 — right */}
      <div className={styles.row}>
        <div className={styles.trackRight}>
          {[...bot, ...bot].map((e, i) => <Card key={i} {...e} />)}
        </div>
      </div>
    </section>
  );
}

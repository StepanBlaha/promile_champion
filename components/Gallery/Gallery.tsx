'use client';

import styles from './Gallery.module.css';

const ENTRIES = [
  { rank: 1, name: 'Honza K.',  promile: '3.2‰', note: 'absolute legend' },
  { rank: 2, name: 'Petr V.',   promile: '2.8‰', note: 'still standing' },
  { rank: 3, name: 'Tomáš B.',  promile: '2.5‰', note: 'respectable effort' },
  { rank: 4, name: 'Lukáš M.',  promile: '2.1‰', note: 'training arc' },
  { rank: 5, name: 'Martin Š.', promile: '1.9‰', note: 'amateur hour' },
  { rank: 6, name: 'Ondřej P.', promile: '1.6‰', note: 'warm up only' },
  { rank: 7, name: 'David N.',  promile: '1.3‰', note: 'just getting started' },
];

export default function Gallery() {
  return (
    <section className={styles.section}>
      <div className={styles.label}>HALL OF FAME</div>
      <div className={styles.marqueeWrapper}>
        <div className={styles.track}>
          {[...ENTRIES, ...ENTRIES].map((entry, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.rankLabel}>#{entry.rank}</span>
                {entry.rank === 1 && <span className={styles.badge}>REKORD</span>}
              </div>
              <div className={styles.promile}>{entry.promile}</div>
              <div className={styles.name}>{entry.name}</div>
              <div className={styles.note}>{entry.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

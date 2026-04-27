'use client';

import styles from './GalleryBento.module.css';
import { ENTRIES } from '@/data/entries';
import Sticker from '@/components/Stickers/Sticker';

export default function GalleryBento() {
  const [first, ...rest] = ENTRIES;

  return (
    <section className={styles.section}>
      <div className={styles.label}>TOP VÝSLEDKY</div>
      <div className={styles.grid}>

        {/* Featured #1 */}
        <div className={`${styles.card} ${styles.featured}`}>
          <Sticker src="/drinks/jackdaniels.webp" size={88} rotate={15}  top={-45}  right={-18} />
          <div className={styles.featuredRank}>#1</div>
          <div className={styles.featuredPromile}>{first.promile.toFixed(1)}‰</div>
          <div className={styles.featuredName}>{first.name}</div>
          <div className={styles.featuredNote}>{first.note}</div>
          <div className={styles.featuredBadge}>REKORD</div>
        </div>

        {rest.map((e) => (
          <div key={e.rank} className={styles.card}>
            <span className={styles.cardRank}>#{e.rank}</span>
            <div className={styles.cardPromile}>{e.promile.toFixed(1)}‰</div>
            <div className={styles.cardName}>{e.name}</div>
            <div className={styles.cardNote}>{e.note}</div>
          </div>
        ))}

      </div>
      {/* bottle leaning on bottom-right corner of the whole grid */}
      <Sticker src="/drinks/absolut.png" size={95} rotate={-10} bottom={-48} right={-20} />
    </section>
  );
}

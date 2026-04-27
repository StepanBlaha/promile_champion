'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchData } from '@/services/submision';
import { Submission } from '@/types/submission.types';
import styles from './page.module.css';

const PODIUM_ORDER = [1, 0, 2]; // 2nd left · 1st centre · 3rd right
const PODIUM_HEIGHTS = ['150px', '210px', '110px'];
const PODIUM_LABELS = ['2.', '1.', '3.'];

export default function Leaderboard() {
  const [entries, setEntries] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then((data) => {
        if (data) {
          const sorted = [...data].sort((a, b) => b.promile - a.promile);
          setEntries(sorted);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  if (loading) {
    return (
      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Žebříček</h1>
        </div>
        <div className={styles.skeletonWrap}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      </main>
    );
  }

  if (entries.length === 0) {
    return (
      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Žebříček</h1>
        </div>
        <p className={styles.empty}>Zatím žádné záznamy. Buď první!</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Žebříček</h1>
        <span className={styles.count}>{entries.length} zápisů</span>
      </div>

      {/* ── Podium ── */}
      {top3.length >= 1 && (
        <section className={styles.podiumSection}>
          <div className={styles.podium}>
            {PODIUM_ORDER.map((idx, col) => {
              const e = top3[idx];
              if (!e) return <div key={col} className={styles.podiumSlot} />;
              return (
                <div key={e.id} className={`${styles.podiumSlot} ${idx === 0 ? styles.winner : ''}`}>
                  <div className={styles.podiumInfo}>
                    {e.photo_url && (
                      <div className={styles.podiumAvatar}>
                        <Image src={e.photo_url} alt={e.name} fill sizes="72px" className={styles.avatarImg} />
                      </div>
                    )}
                    <div className={styles.podiumPromile}>{e.promile.toFixed(1)}‰</div>
                    <div className={styles.podiumName}>{e.name}</div>
                  </div>
                  <div className={styles.podiumBlock} style={{ height: PODIUM_HEIGHTS[col] }}>
                    <span className={styles.podiumLabel}>{PODIUM_LABELS[col]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Table ── */}
      {rest.length > 0 && (
        <section className={styles.tableSection}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>#</th>
                <th className={styles.th}>Foto</th>
                <th className={styles.th}>Jméno</th>
                <th className={styles.th}>Promile</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((e, i) => (
                <tr key={e.id} className={styles.tr}>
                  <td className={`${styles.td} ${styles.tdRank}`}>{i + 4}</td>
                  <td className={styles.td}>
                    {e.photo_url ? (
                      <div className={styles.tableAvatar}>
                        <Image src={e.photo_url} alt={e.name} fill sizes="44px" className={styles.avatarImg} />
                      </div>
                    ) : (
                      <div className={`${styles.tableAvatar} ${styles.tableAvatarEmpty}`} />
                    )}
                  </td>
                  <td className={`${styles.td} ${styles.tdName}`}>{e.name}</td>
                  <td className={`${styles.td} ${styles.tdPromile}`}>{e.promile.toFixed(1)}‰</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

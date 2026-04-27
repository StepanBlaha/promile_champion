'use client';

import styles from './page.module.css';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Promile Champion</h1>
      <div className={styles.buttons}>
        <PrimaryButton onClick={() => {}}>Add Submition</PrimaryButton>
        <SecondaryButton onClick={() => {}}>Leaderboard</SecondaryButton>
      </div>
    </main>
  );
}
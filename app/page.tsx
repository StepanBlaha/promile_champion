'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import GalleryImageMarquee from '@/components/Gallery/GalleryImageMarquee';
import GalleryImageGrid from '@/components/Gallery/GalleryImageGrid';
import GalleryMarquee from '@/components/Gallery/GalleryMarquee';
import GalleryBento from '@/components/Gallery/GalleryBento';
import GalleryPodium from '@/components/Gallery/GalleryPodium';
import Sticker from '@/components/Stickers/Sticker';

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {/* stickers on the hero title box */}
        <div className={styles.titleWrap}>
          <Sticker src="/drinks/branik.jpg"   size={100} rotate={-14} top={-55}  right={-40} />
          <Sticker src="/drinks/jsger.png"    size={82}  rotate={12}  bottom={-50} left={-30} />
          <h1 className={styles.title}>Promile Champion</h1>
        </div>
        <div className={styles.buttons}>
          <PrimaryButton onClick={() => router.push('/add')}>Add Submition</PrimaryButton>
          <SecondaryButton onClick={() => router.push('/leaderboard')}>Leaderboard</SecondaryButton>
        </div>
      </div>

      <GalleryImageMarquee />
      {/*}
      <GalleryImageGrid />
      <GalleryMarquee />
      <GalleryBento />
      <GalleryPodium />
      */}
    </main>
  );
}

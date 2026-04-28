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
          <Sticker src="/drinks_outline/5.png"   size={140} rotate={-14} top={-55}  right={-70} />
          <Sticker src="/drinks_outline/11.png"    size={130}  rotate={12}  bottom={-50} left={-60} />
          <h1 className={styles.title}>Šampión Promile</h1>
        </div>
        <div className={styles.buttons}>
          <PrimaryButton onClick={() => router.push('/add')}>Přidat Alkoholika</PrimaryButton>
          <SecondaryButton onClick={() => router.push('/leaderboard')}>Žebříček</SecondaryButton>
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

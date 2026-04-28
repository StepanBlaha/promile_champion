'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { fetchData } from '@/services/submision';
import { Submission } from '@/types/submission.types';
import styles from './GalleryImageMarquee.module.css';
import Sticker from '@/components/Stickers/Sticker';

function drinkSticker(id: string) {
  const n = [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 0);
  if (n % 8 === 0) return null;
  const src = `/drinks_outline/${(n % 30) + 1}.png`;
  const size = 105 + ((n >> 8) % 40);
  const half = Math.round(size * 0.3);
  const ci = (n ^ (n >> 13)) % 4;
  // lean into the corner: top-right +, top-left -, bottom-right -, bottom-left +
  const baseRotate = [-38, 38, 35, -35][ci];
  const rotate = baseRotate + (((n >> 5) % 21) - 10);
  const corner = ci === 0 ? { top: -half, right: -half }
    : ci === 1 ? { top: -half, left: -half }
    : ci === 2 ? { bottom: -half, right: -half }
    : { bottom: -half, left: -half };
  return { src, rotate, size, ...corner };
}

export default function GalleryImageMarquee() {
  const [entries, setEntries] = useState<Submission[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);

  // all mutable marquee state lives in refs — no re-renders needed
  const offset    = useRef(0);
  const halfWidth = useRef(0);
  const dragging  = useRef(false);
  const drag      = useRef({ startX: 0, startOffset: 0 });
  const velocity  = useRef(0);
  const lastX     = useRef(0);
  const raf       = useRef(0);

  useEffect(() => {
    fetchData().then((data) => {
      if (data) setEntries(data.filter((e) => e.photo_url));
    });
  }, []);

  // start the rAF loop after entries render
  useEffect(() => {
    if (entries.length === 0) return;

    const frame = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      halfWidth.current = track.scrollWidth / 2;

      const tick = () => {
        if (dragging.current) {
          velocity.current = 0;
        } else {
          // apply momentum then settle to constant speed
          velocity.current = velocity.current * 0.92 + 0.5 * 0.08;
          offset.current = (offset.current + velocity.current) % halfWidth.current;
          track.style.transform = `translateX(-${offset.current}px)`;
        }
        raf.current = requestAnimationFrame(tick);
      };

      velocity.current = 0.5;
      raf.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf.current);
      cancelAnimationFrame(frame);
    };
  }, [entries]);

  // global mouse handlers
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx   = drag.current.startX - e.clientX;
      const half = halfWidth.current;
      offset.current = ((drag.current.startOffset + dx) % half + half) % half;
      velocity.current = e.clientX - lastX.current;
      lastX.current = e.clientX;
      if (trackRef.current)
        trackRef.current.style.transform = `translateX(-${offset.current}px)`;
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      // flip sign: drag left = negative velocity, but marquee moves left naturally
      velocity.current = -velocity.current * 0.3;
      if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // global touch handlers
  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const dx   = drag.current.startX - e.touches[0].clientX;
      const half = halfWidth.current;
      offset.current = ((drag.current.startOffset + dx) % half + half) % half;
      velocity.current = e.touches[0].clientX - lastX.current;
      lastX.current = e.touches[0].clientX;
      if (trackRef.current)
        trackRef.current.style.transform = `translateX(-${offset.current}px)`;
      e.preventDefault();
    };
    const onEnd = () => {
      if (!dragging.current) return;
      dragging.current = false;
      velocity.current = -velocity.current * 0.3;
    };

    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    drag.current = { startX: e.clientX, startOffset: offset.current };
    lastX.current = e.clientX;
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grabbing';
    e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    drag.current = { startX: e.touches[0].clientX, startOffset: offset.current };
    lastX.current = e.touches[0].clientX;
  };

  if (entries.length === 0) return null;

  const items = entries.length < 5
    ? [...entries, ...entries, ...entries, ...entries]
    : [...entries, ...entries];

  return (
    <section className={styles.section}>
      <div
        ref={wrapperRef}
        className={styles.marqueeWrapper}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div ref={trackRef} className={styles.track}>
          {items.map((e, i) => {
            const sticker = drinkSticker(e.id);
            return (
            <div key={i} className={styles.card}>
              <div className={styles.imgOuter}>
                {sticker && (
                  <Sticker
                    src={sticker.src}
                    size={sticker.size}
                    rotate={sticker.rotate}
                    top={'top' in sticker ? sticker.top : undefined}
                    bottom={'bottom' in sticker ? sticker.bottom : undefined}
                    left={'left' in sticker ? sticker.left : undefined}
                    right={'right' in sticker ? sticker.right : undefined}
                    zIndex={10}
                  />
                )}
              <div className={styles.imgWrap}>
                <Image
                  src={e.photo_url!}
                  alt={e.name}
                  fill
                  sizes="160px"
                  className={styles.img}
                  draggable={false}
                />
              </div>
              </div>
              <div className={styles.meta}>
                <span className={styles.metaName}>{e.name}</span>
                <span className={styles.metaPromile}>{e.promile}‰</span>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

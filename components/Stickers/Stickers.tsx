import styles from './Stickers.module.css';

const STICKERS = [
  // left side
  { src: '/drinks/branik.jpg',       side: 'left',  top: 140,  rotate: -12, size: 90,  offset: -28 },
  { src: '/drinks/smirnoff.png',      side: 'left',  top: 480,  rotate: 8,   size: 100, offset: -30 },
  { src: '/drinks/jackdaniels.webp',  side: 'left',  top: 820,  rotate: -6,  size: 95,  offset: -25 },
  { src: '/drinks/bozkovrum.png',     side: 'left',  top: 1150, rotate: 14,  size: 85,  offset: -22 },
  { src: '/drinks/slivovice.webp',    side: 'left',  top: 1480, rotate: -10, size: 90,  offset: -28 },
  { src: '/drinks/heffron.png',       side: 'left',  top: 1820, rotate: 7,   size: 80,  offset: -20 },
  { src: '/drinks/jegr.jpg',          side: 'left',  top: 2150, rotate: -15, size: 88,  offset: -26 },
  // right side
  { src: '/drinks/budvar.png',        side: 'right', top: 300,  rotate: 10,  size: 92,  offset: -28 },
  { src: '/drinks/pilsner.png',       side: 'right', top: 640,  rotate: -18, size: 98,  offset: -30 },
  { src: '/drinks/jsger.png',         side: 'right', top: 970,  rotate: 6,   size: 85,  offset: -22 },
  { src: '/drinks/absolut.png',       side: 'right', top: 1310, rotate: -8,  size: 94,  offset: -26 },
  { src: '/drinks/radegast.png',      side: 'right', top: 1640, rotate: 16,  size: 88,  offset: -24 },
  { src: '/drinks/budvar2.png',       side: 'right', top: 1960, rotate: -5,  size: 82,  offset: -20 },
  { src: '/drinks/bozkovvodka.png',   side: 'right', top: 2280, rotate: 12,  size: 90,  offset: -28 },
  { src: '/drinks/bozkovzelena.png',  side: 'right', top: 2590, rotate: -9,  size: 86,  offset: -22 },
];

export default function Stickers() {
  return (
    <div className={styles.root} aria-hidden>
      {STICKERS.map((s, i) => (
        <img
          key={i}
          src={s.src}
          alt=""
          className={styles.sticker}
          style={{
            top: s.top,
            [s.side]: s.offset,
            width: s.size,
            transform: `rotate(${s.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

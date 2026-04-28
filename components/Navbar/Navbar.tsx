'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Sticker from '@/components/Stickers/Sticker';

const LINKS = [
  { href: '/add', label: 'Přidat' },
  { href: '/leaderboard', label: 'Žebříček' },
  { href: '/gallery', label: 'Galerie' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [time, setTime] = useState('');

  const openMenu  = () => { setClosing(false); setOpen(true); };
  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 180);
  };
  const toggleMenu = () => (open && !closing ? closeMenu() : openMenu());

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('cs-CZ', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <Sticker src="/drinks_outline/19.png" size={76} rotate={38} bottom={-16} right={-6} zIndex={101} />
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <img src="/drinks_outline/11.png" alt="" aria-hidden className={styles.logoDot} />
          Šampión Promile
        </Link>

        <div className={styles.links}>
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.linkActive : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
{/*}
        <time className={styles.clock} suppressHydrationWarning>
          {time}
        </time>
        */}

        <button
          className={styles.burger}
          onClick={toggleMenu}
          aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={open}
        >
          <span className={`${styles.bar} ${open ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barBot : ''}`} />
        </button>
      </nav>

      {open && (
        <div className={`${styles.mobileMenu} ${closing ? styles.mobileMenuClosing : ''}`}>
          <Sticker src="/drinks_outline/8.png"  size={100} rotate={-38} top={-10}   right={-2} zIndex={110} />
          <Sticker src="/drinks_outline/15.png" size={100} rotate={-35}  bottom={-12} left={-10} zIndex={110} />
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileLink} ${pathname === href ? styles.mobileLinkActive : ''}`}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

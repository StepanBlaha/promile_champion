'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const LINKS = [
  { href: '/add', label: 'Add' },
  { href: '/leaderboard', label: 'Leaderboard' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');

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
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoDot}>●</span>
          PROMILE CHAMPION
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
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={open}
        >
          <span className={`${styles.bar} ${open ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barBot : ''}`} />
        </button>
      </nav>

      {open && (
        <div className={styles.mobileMenu}>
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileLink} ${pathname === href ? styles.mobileLinkActive : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

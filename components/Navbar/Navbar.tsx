import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>Promile Champion</Link>
      <div className={styles.links}>
        <Link href="/add" className={styles.link}>Add</Link>
        <Link href="/leaderboard" className={styles.link}>Leaderboard</Link>
      </div>
    </nav>
  );
}

import styles from './Sticker.module.css';

type Props = {
  src: string;
  size?: number;
  rotate?: number;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  zIndex?: number;
};

export default function Sticker({
  src, size = 90, rotate = 0, top, bottom, left, right, zIndex = 20,
}: Props) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={styles.sticker}
      style={{ width: size, top, bottom, left, right, zIndex, transform: `rotate(${rotate}deg)` }}
    />
  );
}

import styles from "./SecondaryButton.module.css";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function SecondaryButton({ onClick, children, className }: Props) {
  return (
    <button onClick={onClick} className={`${styles.btn}${className ? ` ${className}` : ""}`}>
      <span>{children}</span>
    </button>
  );
}

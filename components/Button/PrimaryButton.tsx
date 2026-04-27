import styles from "./PrimaryButton.module.css";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function PrimaryButton({ onClick, children, className, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn}${className ? ` ${className}` : ""}`}
    >
      <span>{children}</span>
    </button>
  );
}

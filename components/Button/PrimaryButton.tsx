import styles from "./PrimaryButton.module.css";

type Props = {
  onClick: ()=>void;
  children: React.ReactNode;
  className?: string;
};

export default function PrimaryButton({ onClick, children, className }: Props) {
  return (
    <button onClick={onClick} className={`${styles.btn}${className ? ` ${className}` : ""}`}>
      <span>{children}</span>
    </button>
  );
}

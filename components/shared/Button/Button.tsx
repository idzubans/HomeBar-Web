import styles from '../../../styles/Button.module.scss';

interface Props {
  isPrimary: boolean;
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export function Button({ isPrimary, onClick, type, children }: Props) {
  return (
    <button className={`${isPrimary ? styles.primaryButton : styles.secondaryButton}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

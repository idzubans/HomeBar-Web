import { InputHTMLAttributes } from "react";
import styles from '../../../styles/Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> { 
  name: string;
  label: string;
  placeHolder: string
}

export function Input({ name, label, placeHolder, ...rest }: Props) {
  return (
    <input className={styles.input} placeholder={placeHolder} id={name} {...rest}/>
  );
}


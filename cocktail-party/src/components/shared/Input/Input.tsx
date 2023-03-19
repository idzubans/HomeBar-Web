import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeHolder: string;
}

export function Input({ name, label, placeHolder, ...rest }: Props) {
  return (
    <input
      className="flex h-10 justify-center items-center text-center rounded-xl border text-purple-800 placeholder-purple-800 border-purple-800 py-2 px-9 text-base font-semibold shadow focus-visible:outline-none"
      placeholder={placeHolder}
      id={name}
      {...rest}
    />
  );
}

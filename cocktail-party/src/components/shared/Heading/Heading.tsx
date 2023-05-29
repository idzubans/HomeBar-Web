import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isWhite?: boolean;
}

export function Heading({ children, isWhite }: Props) {
  return (
    <h1
      className={`font-extrabold flex w-full justify-center text-4xl ${
        isWhite
          ? "text-white"
          : "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent"
      }`}
    >
      {children}
    </h1>
  );
}

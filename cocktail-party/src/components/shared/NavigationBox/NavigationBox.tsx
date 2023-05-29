import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  link?: string;
  reversed?: boolean;
}

export function NavigationBox({ children, link, reversed }: Props) {
  const style = `w-11/12 flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl p-6 text-center drop-shadow-md ${ reversed ? "bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white" : "bg-white" }`;
  return link ? (
    <Link
      href={link}
      className={style}
    >
      {children}
    </Link>
  ) : (
    <div className={style}>
      {children}
    </div>
  );
}

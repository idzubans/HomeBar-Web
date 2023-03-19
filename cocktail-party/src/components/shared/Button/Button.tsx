interface Props {
  isPrimary: boolean;
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export function Button({ isPrimary, onClick, type, children }: Props) {
  return (
    <button className={`flex items-center justify-center h-10 py-2 px-9 shadow-lg rounded-xl font-semibold text-base active:shadow-none ${isPrimary ? "bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white" : "bg-transparent text-purple-800"}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

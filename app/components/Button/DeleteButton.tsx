import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface DeleteButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  disabled?: boolean;
}

export function DeleteButton({
  disabled = false,
  className = "",
  ...props
}: DeleteButtonProps) {
  return (
    <button
      className={`
        flex flex-col items-center justify-center
        rounded font-medium text-[10px]
        transition-all duration-150
      text-white border-2 border-transparent
      hover:bg-[#E6E6E6]
      active:bg-[#CCCCCC]
        disabled:opacity-30 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      <Image src="/icon/delete.svg" width={24} height={24} alt="削除アイコン" />
    </button>
  );
}

import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface EditButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  disabled?: boolean;
}

export function EditButton({
  disabled = false,
  className = "",
  ...props
}: EditButtonProps) {
  return (
    <button
      className={`
        flex flex-col items-center justify-center
        px-6 min-w-10
        rounded font-medium text-[10px]
        transition-all duration-150
        bg-[#4EACF5] text-white border-2 border-transparent
        hover:bg-[#3C8EC4]
        active:bg-[#347CAB]
        disabled:bg-[#4CB3F8] disabled:text-white disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      <Image src="/icon/edit.svg" width={24} height={24} alt="編集アイコン" />
      <span>Edit</span>
    </button>
  );
}

import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface SaveButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  disabled?: boolean;
}

export function SaveButton({
  disabled = false,
  className = "",
  ...props
}: SaveButtonProps) {
  return (
    <button
      className={`
        flex flex-col items-center justify-center
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
      <Image src="/icon/save.svg" width={24} height={24} alt="保存アイコン" />
      <span>Save</span>
    </button>
  );
}

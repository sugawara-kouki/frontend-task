import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface CancelButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  disabled?: boolean;
}

export function CancelButton({
  disabled = false,
  className = "",
  ...props
}: CancelButtonProps) {
  return (
    <button
      className={`
        flex flex-col items-center justify-center
        rounded font-medium text-[10px]
        transition-all duration-150
        bg-[#B3B3B3] text-white border-2 border-transparent
        hover:bg-[#999999]
        active:bg-[#808080]
        disabled:bg-[#B3B3B3] disabled:text-white disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      <Image
        src="/icon/cancel.svg"
        width={24}
        height={24}
        alt="キャンセルアイコン"
      />
      <span>Cancel</span>
    </button>
  );
}

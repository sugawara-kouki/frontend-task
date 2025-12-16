import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface NewPageButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  disabled?: boolean;
}

export function NewPageButton({
  disabled = false,
  className = "",
  ...props
}: NewPageButtonProps) {
  return (
    <button
      className={`
        flex flex-col items-center justify-center min-w-10
        rounded font-medium text-[10px]
        transition-all duration-150
        bg-white text-[#4EACF5] border-2 border-[#4EACF5]
        hover:bg-[#CCCCCC]
        active:bg-[#B3B3B3]
        disabled:bg-white disabled:text-[#B8E0FA] disabled:border-[#B8E0FA] disabled:opacity-80 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      <Image
        src="/icon/+.svg"
        width={24}
        height={24}
        alt="新規ページアイコン"
      />
      <span>New Page</span>
    </button>
  );
}

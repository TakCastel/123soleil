import { ReactNode, CSSProperties } from 'react';

type FilterButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
};

export default function FilterButton({
  children,
  onClick,
  active = false,
  className = '',
  disabled = false,
  style
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`
        px-4 py-2 text-sm font-medium transition-all duration-150
        rounded-full border hover:cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${active 
          ? 'bg-[var(--secondary)] border-[var(--secondary)] text-white hover:bg-[var(--secondary-hover)] hover:border-[var(--secondary-hover)]' 
          : 'bg-white border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

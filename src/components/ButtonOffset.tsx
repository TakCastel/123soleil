import { ReactNode } from 'react';

type ButtonOffsetProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'white' | 'red-filter';
  className?: string;
  disabled?: boolean;
  active?: boolean;
};

export default function ButtonOffset({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  active = false
}: ButtonOffsetProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'cta-offset--red'; // Utilise var(--secondary) comme couleur
      case 'secondary':
        return ''; // Style par défaut (noir)
      case 'white':
        return 'cta-offset--white';
      case 'red-filter':
        return 'cta-offset--red-filter';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cta-offset ${getVariantClass()} ${active ? 'active' : ''} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className="cta-underlay" />
      <span className="cta-surface" />
      <span className="cta-label">{children}</span>
    </button>
  );
}

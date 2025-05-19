import { ReactNode } from 'react';

declare module '@/components/ui/button' {
  export interface ButtonProps {
    variant?: string;
    size?: string;
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
  }
  
  export const Button: React.FC<ButtonProps>;
} 
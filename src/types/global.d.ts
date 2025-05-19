import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      // Add other HTML elements as needed
    }
  }
}

// Fix for lucide-react icons
declare module 'lucide-react' {
  import React from 'react';
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
  }
  
  export type Icon = React.FC<IconProps>;
  
  export const GalleryHorizontal: Icon;
  // Add other icons as needed
}

// Fix for Button component
declare module '@/components/ui/button' {
  import React from 'react';
  
  export interface ButtonProps {
    variant?: string;
    size?: string;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
  }
  
  export const Button: React.FC<ButtonProps>;
}

export {}; 
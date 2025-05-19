/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export const GalleryHorizontal: FC<SVGProps<SVGSVGElement> & { size?: number }>;
  // Add other icons you use here
  
  export default GalleryHorizontal;
} 
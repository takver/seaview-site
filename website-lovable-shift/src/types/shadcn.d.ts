import * as React from 'react';
import type { DialogProps } from '@radix-ui/react-dialog';

declare module '@/components/ui/button' {
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'rounded' | 'filterActive' | 'filterInactive';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }
  export const Button: React.ForwardRefExoticComponent<ButtonProps>;
}

declare module '@/components/ui/card' {
  export const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
  export const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
  export const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
  export const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement>>;
  export const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement>>;
}

declare module '@/components/ui/dialog' {
  export const Dialog: React.FC<DialogProps>;
  export const DialogContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
  export const DialogHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
  export const DialogFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
  export const DialogTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement>>;
  export const DialogDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement>>;
  export const DialogTrigger: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLButtonElement>>;
}

declare module '@/components/ui/tabs' {
  export const Tabs: React.FC<React.PropsWithChildren<Record<string, never>>>;
  export const TabsList: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
  export const TabsTrigger: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLButtonElement>>;
  export const TabsContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>;
} 
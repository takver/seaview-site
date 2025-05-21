import { DialogProps } from "@radix-ui/react-dialog";
import { TabsProps } from "@radix-ui/react-tabs";
import { ButtonProps } from "@/components/ui/button";

declare module "@/components/ui/dialog" {
  export interface DialogRootProps extends DialogProps {
    children: React.ReactNode;
  }

  export interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
  }

  export interface DialogHeaderProps {
    children: React.ReactNode;
    className?: string;
  }

  export interface DialogFooterProps {
    children: React.ReactNode;
    className?: string;
  }
}

declare module "@/components/ui/tabs" {
  export interface TabsRootProps extends TabsProps {
    children: React.ReactNode;
  }

  export interface TabsContentProps {
    children: React.ReactNode;
    className?: string;
  }

  export interface TabsListProps {
    children: React.ReactNode;
    className?: string;
  }

  export interface TabsTriggerProps {
    children: React.ReactNode;
    className?: string;
    value: string;
  }
} 
import type { FC, ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Map, Phone, Copy } from "lucide-react";
import { Button } from "../ui/button";
import contactConfig from "../../config/contactConfig.json";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type ContactItem = {
  icon: ReactElement;
  text: string;
  value?: string;
  href: string;
  target?: string;
};

export const Header: FC = () => {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
  };

  // Reserved for future nav links – suppress unused-var warning with underscore
  const _navItems: { text: string; href: string }[] = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
  ];

  const contactItems: ContactItem[] = [
    {
      icon: <Mail className="h-4 w-4" />,
      text: "Email",
      value: contactConfig.email,
      href: `mailto:${contactConfig.email}${contactConfig.emailLinkParams}`
    },
    {
      icon: <Map className="h-4 w-4" />,
      text: "Location",
      href: contactConfig.mapUrl,
      target: "_blank"
    },
    {
      icon: <Phone className="h-4 w-4" />,
      text: "Phone",
      value: contactConfig.phone,
      href: `tel:${contactConfig.phoneClean}`
    }
  ];

  // Apply styles based on scroll position
  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? "bg-white text-black shadow-md" 
      : "bg-transparent text-white"
  }`;

  // Add text shadow for better visibility when header is transparent
  const textShadowClass = isScrolled ? "" : "text-shadow";

  const renderContactItem = (item: ContactItem, index: number) => {
    // Don't show tooltip for the map location
    if (item.text === "Location") {
      return (
        <a
          key={index}
          href={item.href}
          target={item.target}
          className={isScrolled 
            ? "flex items-center text-black hover:text-gray-700" 
            : `flex items-center text-white hover:text-gray-300 ${textShadowClass}`
          }
        >
          {item.icon}
          <span className="ml-2">{item.text}</span>
        </a>
      );
    }

    // For email and phone, add tooltips with copy functionality
    return (
      <TooltipProvider key={index}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={item.href}
              className={isScrolled 
                ? "flex items-center text-black hover:text-gray-700" 
                : `flex items-center text-white hover:text-gray-300 ${textShadowClass}`
              }
            >
              {item.icon}
              <span className="ml-2">{item.text}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2">
            <span>{item.value}</span>
            <button 
              onClick={(e) => {
                e.preventDefault(); 
                handleCopy(item.value, item.text);
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              {copied === item.text ? (
                <span className="text-green-500 text-xs">Copied!</span>
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      {/* Separate gradient overlay div */}
      {!isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-black/70 via-black/40 to-transparent z-40 pointer-events-none"></div>
      )}
      
      <header className={headerClasses}>
        <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center relative z-50">
          <Link to="/" className={`flex items-center ${textShadowClass}`}>
            <img 
              src="/images/seaview-logo.png" 
              alt="Sifnos Seaview Logo" 
              className="h-10 w-auto mr-3"
            />
            <span className="text-lg md:text-xl font-medium">Sifnos Seaview</span>
          </Link>

          {isMobile ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className={isScrolled ? "text-black hover:bg-black/10" : `text-white hover:bg-white/10 ${textShadowClass}`}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
              
              {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black p-3 z-40">
                  <div className="flex flex-col space-y-2">
                    {contactItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        target={item.target}
                        className="flex items-center text-white hover:text-gray-300 text-sm"
                      >
                        {item.icon}
                        <span className="ml-2">{item.text}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-6">
              {contactItems.map((item, index) => renderContactItem(item, index))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}; 
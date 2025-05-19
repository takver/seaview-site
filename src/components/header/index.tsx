// @ts-nocheck
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Menu, X, Mail, Map, Phone } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contactItems = [
    { 
      icon: <Mail className="h-4 w-4" />, 
      text: "Email", 
      href: "mailto:info@sifnos-seaview.com?cc=sifnos.kratisis@gmail.com&subject=Inquiry%20About%20Your%20Villa%20in%20Sifnos&body=Dear%20Sifnos%20Seaview%20Team,%0D%0A%0D%0AI%20am%20interested%20in%20learning%20more%20about%20your%20villa%20in%20Sifnos.%20Could%20you%20please%20provide%20further%20details%20about%20availability,%20amenities,%20pricing,%20and%20any%20special%20offers%20you%20might%20have?%0D%0A%0D%0AThank%20you%20for%20your%20assistance,%0D%0A[Your%20Name]" 
    },
    { 
      icon: <Map className="h-4 w-4" />, 
      text: "Map", 
      href: "https://maps.google.com/maps/dir//Sifnos+Seaview+Ano+Petali+Apollonia+840+03+Greece/@36.977783,24.7232374,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x14988d5d9f332f7d:0xfbfe49015dc03f09",
      target: "_blank"
    },
    { 
      icon: <Phone className="h-4 w-4" />, 
      text: "Phone", 
      href: "tel:+306989783572" 
    }
  ];

  // Determine if we should show the solid header
  const isScrolled = scrollPosition > 80;
  
  // Apply styles based on scroll position
  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? "bg-white text-black shadow-md" 
      : "bg-transparent text-white"
  }`;

  // Add text shadow for better visibility when header is transparent
  const textShadowClass = isScrolled ? "" : "text-shadow";

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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className={isScrolled ? "text-black hover:bg-black/10" : `text-white hover:bg-white/10 ${textShadowClass}`}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
              
              {mobileMenuOpen && (
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
              {contactItems.map((item, index) => (
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
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}; 
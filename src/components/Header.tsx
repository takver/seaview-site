
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X, Mail, Map, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Facilities", path: "/facilities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Location", path: "/location" },
    { name: "Contact", path: "/contact" },
    { name: "Book Now", path: "/book", highlight: true }
  ];

  const contactItems = [
    { 
      icon: <Mail className="h-5 w-5" />, 
      text: "Email", 
      href: "mailto:info@sifnos-seaview.com?cc=sifnos.kratisis@gmail.com&subject=Inquiry%20About%20Your%20Villa%20in%20Sifnos&body=Dear%20Sifnos%20Seaview%20Team,%0D%0A%0D%0AI%20am%20interested%20in%20learning%20more%20about%20your%20villa%20in%20Sifnos.%20Could%20you%20please%20provide%20further%20details%20about%20availability,%20amenities,%20pricing,%20and%20any%20special%20offers%20you%20might%20have?%0D%0A%0D%0AThank%20you%20for%20your%20assistance,%0D%0A[Your%20Name]" 
    },
    { 
      icon: <Map className="h-5 w-5" />, 
      text: "Map", 
      href: "https://maps.google.com/maps/dir//Sifnos+Seaview+Ano+Petali+Apollonia+840+03+Greece/@36.977783,24.7232374,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x14988d5d9f332f7d:0xfbfe49015dc03f09",
      target: "_blank"
    },
    { 
      icon: <Phone className="h-5 w-5" />, 
      text: "Phone", 
      href: "tel:+306989783572" 
    }
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/seaview-logo.png" 
            alt="Sifnos Seaview Logo" 
            className="h-12 w-auto mr-3"
          />
          <span className="text-xl md:text-2xl font-medium">Sifnos Seaview</span>
        </Link>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-white hover:bg-white/10"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-black p-4">
                <nav className="flex flex-col space-y-3 mb-6">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md",
                        item.highlight 
                          ? "bg-white text-black hover:bg-gray-200" 
                          : "text-white hover:bg-white/10"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col space-y-3">
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
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        item.highlight 
                          ? "bg-white text-black hover:bg-gray-200" 
                          : "text-white hover:bg-white/10"
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4 ml-6">
              {contactItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.target}
                  className="flex items-center text-white hover:text-gray-300"
                >
                  {item.icon}
                  <span className="ml-2 hidden lg:inline">{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

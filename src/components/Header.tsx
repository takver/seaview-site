
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {/* Logo placeholder - we'll replace with your actual logo */}
          <div className="h-12 flex items-center">
            <span className="text-2xl font-bold text-blue-600">Sifnos Seaview</span>
          </div>
        </Link>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4">
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md",
                        item.highlight 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      item.highlight 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Button } from "../ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "../ui/collapsible";

// Define the amenity type
type Amenity = {
  id: number;
  title: string;
  iconPath: string; // Path to SVG icon
  featured?: boolean;
};

// Define premium brand logos to showcase
const premiumBrands = [
  { id: 1, name: "Miele", logo: "/images/logos/Miele-logo-3498353745.png", category: "appliances" },
  { id: 2, name: "Bosch", logo: "/images/logos/Bosch-Logo-1925-1981-2210267314.png", category: "appliances" },
  { id: 3, name: "Fisher & Paykel", logo: "/images/logos/fisher-paykel-appliances-1-logo-png-transparent.png", category: "appliances" },
  { id: 4, name: "Smeg", logo: "/images/logos/Smeg-UK-Logo-Vector.svg-.png", category: "appliances" },
  { id: 5, name: "Grohe", logo: "/images/logos/grohe-logo-png-transparent.png", category: "fixtures" },
  { id: 6, name: "Coco-mat", logo: "/images/logos/cocomat-logo-1444269077.jpg", category: "furniture" },
  { id: 7, name: "KNX", logo: "/images/logos/knx_logo-3126555041.png", category: "smart home" },
  { id: 8, name: "Loytec", logo: "/images/logos/20120222_loytec-logo-2659534211.jpg", category: "smart home" },
  { id: 9, name: "Starlink", logo: "/images/logos/1200px-Starlink_Logo.svg-2729561376.png", category: "connectivity" },
  { id: 10, name: "Hikvision", logo: "/images/logos/Hikvision-Logo.wine-244368602.png", category: "security" },
  { id: 11, name: "Ecowitt", logo: "/images/logos/ecowitt_logo.jpg", category: "sustainability" },
  { id: 14, name: "Varangis", logo: "/images/logos/varangis_logo.png", category: "furniture" },
  { id: 15, name: "GreyFlow", logo: "/images/logos/GreyFlowlogo.png", category: "sustainability" },
  { id: 16, name: "Aermec", logo: "/images/logos/aermec-logo1.png", category: "appliances" },
];

// Define all amenities with SVG paths
const amenities: Amenity[] = [
  { id: 1, title: "Sea View", iconPath: "/images/amenities/sea-beach-svgrepo-com.svg", featured: true },
  { id: 2, title: "Mountain view", iconPath: "/images/amenities/mountain-view-svgrepo-com.svg", featured: true },
  { id: 3, title: "Garden", iconPath: "/images/amenities/garden-tree-plant-svgrepo-com.svg", featured: true },
  { id: 4, title: "Kitchen", iconPath: "/images/amenities/oven-bake-svgrepo-com.svg", featured: true },
  { id: 5, title: "Coffee Maker", iconPath: "/images/amenities/coffee-machine-svgrepo-com.svg", featured: true },
  { id: 6, title: "Washer", iconPath: "/images/amenities/washing-machine-svgrepo-com.svg", featured: true },
  { id: 7, title: "Dishwasher", iconPath: "/images/amenities/dishwasher-svgrepo-com.svg", featured: true },
  { id: 8, title: "HDTV", iconPath: "/images/amenities/tv-svgrepo-com.svg", featured: true },
  { id: 9, title: "Outdoor Dining", iconPath: "/images/amenities/outdoor-dining-svgrepo-com.svg", featured: true },
  { id: 10, title: "Air Conditioning", iconPath: "/images/amenities/snowflake-7-svgrepo-com.svg", featured: true },
  
  { id: 11, title: "Private Patio", iconPath: "/images/amenities/terrace-svgrepo-com.svg" },
  { id: 12, title: "Backyard", iconPath: "/images/amenities/garden-table-svgrepo-com.svg" },
  { id: 13, title: "Security", iconPath: "/images/amenities/safebox-bank-locker-3-svgrepo-com.svg" },
  { id: 14, title: "Free WiFi", iconPath: "/images/amenities/wifi-svgrepo-com.svg" },
  { id: 15, title: "Cleaning Products", iconPath: "/images/amenities/wiping-svgrepo-com.svg" },
  { id: 16, title: "Bath Toiletries", iconPath: "/images/amenities/soap-bodywash-bodylotion-svgrepo-com.svg" },
  { id: 17, title: "Bidet", iconPath: "/images/amenities/bidet-svgrepo-com.svg" },
  { id: 18, title: "Solar Hot Water", iconPath: "/images/amenities/thermometer-sun-svgrepo-com.svg" },
  { id: 19, title: "Hangers", iconPath: "/images/amenities/hanger-svgrepo-com.svg" },
  { id: 20, title: "Bed Linens", iconPath: "/images/amenities/pillow-svgrepo-com.svg" },
  { id: 21, title: "Extra Bedding", iconPath: "/images/amenities/pillow-svgrepo-com-1.svg" },
  { id: 22, title: "Blackout Shutters", iconPath: "/images/amenities/window-svgrepo-com.svg" },
  { id: 23, title: "Iron", iconPath: "/images/amenities/iron-svgrepo-com-new.svg" },
  { id: 24, title: "Drying Rack", iconPath: "/images/amenities/towel-svgrepo-com.svg" },
  { id: 25, title: "Safe", iconPath: "/images/amenities/safebox-bank-locker-svgrepo-com.svg" },
  { id: 26, title: "Mosquito Net", iconPath: "/images/amenities/mosquito-net-insect-mosquito-pest-svgrepo-com.svg" },
  { id: 27, title: "Clothing Storage", iconPath: "/images/amenities/closet-furniture-and-household-svgrepo-com.svg" },
  { id: 28, title: "Books", iconPath: "/images/amenities/book-alt-svgrepo-com.svg" },
  { id: 29, title: "Board Games", iconPath: "/images/amenities/game-board-svgrepo-com.svg" },
  { id: 30, title: "Ceiling Fan", iconPath: "/images/amenities/ceiling-fan-off-svgrepo-com.svg" },
  { id: 31, title: "Floor Heating", iconPath: "/images/amenities/underfloor-heating-svgrepo-com.svg" },
  { id: 32, title: "Gas Stove", iconPath: "/images/amenities/gas-stove-svgrepo-com.svg" },
  { id: 33, title: "Smoke Alarm", iconPath: "/images/amenities/fire-alarm-svgrepo-com.svg" },
  { id: 34, title: "Fire Extinguisher", iconPath: "/images/amenities/fire-extinguisher-svgrepo-com.svg" },
  { id: 35, title: "First Aid Kit", iconPath: "/images/amenities/first-aid-kit-svgrepo-com.svg" },
  { id: 36, title: "Freezer", iconPath: "/images/amenities/freezer-svgrepo-com.svg" },
  { id: 37, title: "Hair Dryer", iconPath: "/images/amenities/hairdryer-svgrepo-com.svg" },
  { id: 38, title: "Oven", iconPath: "/images/amenities/oven-bake-svgrepo-com.svg" },
  { id: 39, title: "Water Kettle", iconPath: "/images/amenities/kettle-svgrepo-com.svg" },
  { id: 40, title: "Wine Glasses", iconPath: "/images/amenities/wine-glass-wine-svgrepo-com.svg" },
  { id: 41, title: "Dining Table", iconPath: "/images/amenities/dining-room-furniture-of-a-table-with-chairs-svgrepo-com.svg" },
  { id: 42, title: "Outdoor Furniture", iconPath: "/images/amenities/garden-table-svgrepo-com.svg" },
  { id: 43, title: "Luggage Dropoff", iconPath: "/images/amenities/luggage-14-svgrepo-com.svg" },
  { id: 44, title: "Long Term Stays", iconPath: "/images/amenities/calendar-days-svgrepo-com.svg" },
  { id: 45, title: "Host Greeting", iconPath: "/images/amenities/handshake-thin-svgrepo-com.svg" },
];

export const AmenitiesSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter featured amenities (top 10)
  const featuredAmenities = amenities.filter(amenity => amenity.featured);
  const remainingAmenities = amenities.filter(amenity => !amenity.featured);

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-8 text-[#1A1F2C]">
          Modern Amenities
        </h2>
        
        <p className="text-gray-600 text-center font-light leading-relaxed max-w-3xl mx-auto mb-12">
          Indulge your inner chef with our quality gas stove and unique dual-drawer dishwasher - perfect for efficient cleanup after preparing culinary masterpieces. Enjoy the hotel-like luxury of instant hot water circulation, ensuring no wasted time (or water!) waiting for warm showers. During off-season experience the rare indulgence of underfloor heating, keeping you cozy and comfortable even on cool island evenings. Stay connected with our reliable dual satellite and landline internet. Stream your favorite shows on the Smart TV, all powered by energy-efficient appliances (A++ or better). Effortlessly take care of laundry needs with our on-site clothes washer.
        </p>
        
        {/* Featured Amenities Grid - Compact Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2 mb-6">
          {featuredAmenities.map((amenity) => (
            <div 
              key={amenity.id} 
              className="flex items-center py-1"
            >
              <div className="w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0">
                <img 
                  src={amenity.iconPath} 
                  alt={amenity.title} 
                  className="w-6 h-6 text-[#6E59A5]"
                  style={{ filter: "invert(32%) sepia(15%) saturate(1966%) hue-rotate(217deg) brightness(92%) contrast(95%)" }}
                />
              </div>
              <span className="text-sm font-normal text-gray-700">{amenity.title}</span>
            </div>
          ))}
        </div>
        
        {/* Collapsible with Remaining Amenities - Compact Layout */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
              {remainingAmenities.map((amenity) => (
                <div 
                  key={amenity.id} 
                  className="flex items-center py-1"
                >
                  <div className="w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0">
                    <img 
                      src={amenity.iconPath} 
                      alt={amenity.title} 
                      className="w-6 h-6 text-[#6E59A5]"
                      style={{ filter: "invert(32%) sepia(15%) saturate(1966%) hue-rotate(217deg) brightness(92%) contrast(95%)" }}
                    />
                  </div>
                  <span className="text-sm font-normal text-gray-700">{amenity.title}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
          
          <div className="flex justify-center mt-6">
            <CollapsibleTrigger asChild>
              <Button 
                variant="rounded"
                size="pill"
              >
                {isOpen ? "Show Less" : `Show All ${amenities.length} Amenities`}
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
        
        {/* Premium Brands Showcase */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-xl font-light text-center mb-6 text-[#1A1F2C]">
            Premium Brands & Technology Partners
          </h3>
          
          <p className="text-gray-600 text-center font-light leading-relaxed max-w-3xl mx-auto mb-6">
            Our villa is equipped with premium brands and technologies, carefully selected to enhance your comfort while supporting environmental sustainability.
          </p>
          
          <div className="bg-white py-8 px-6 rounded-xl shadow-md">
            {/* Two rows of logos in a grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 justify-items-center">
              {premiumBrands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-center">
                  <div className={`h-14 w-24 flex items-center justify-center bg-gray-50 rounded-md ${brand.name === "Fisher & Paykel" ? "p-0" : "p-2"}`}>
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`} 
                      className={`${brand.name === "Fisher & Paykel" ? "max-h-[126%] max-w-[126%] scale-[1.26]" : 
                        brand.name === "Smeg" ? "max-h-[95%] max-w-[95%] scale-[0.85]" : 
                        brand.name === "KNX" ? "max-h-[105%] max-w-[121%] scale-[1.05] translate-y-[-5%]" :
                        brand.name === "Loytec" || brand.name === "Hikvision" ? "max-h-[121%] max-w-[121%] scale-[1.21]" : 
                        "max-h-[110%] max-w-[110%] scale-110"} object-contain opacity-100`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Single row of descriptions with smaller font */}
            <div className="mt-6 flex flex-wrap justify-center">
              <div className="flex flex-wrap justify-center gap-3 text-center max-w-5xl mx-auto">
                <div className="flex-1 min-w-[200px]">
                  <span className="text-xs text-[#6E59A5] font-medium">Premium Appliances</span>
                  <p className="text-[11px] text-gray-600 font-light mt-1 h-8">
                    Top-tier brands like Fisher & Paykel, Grohe, and Smeg ensure efficiency and luxury
                  </p>
                </div>
                
                <div className="flex-1 min-w-[200px]">
                  <span className="text-xs text-[#6E59A5] font-medium">Smart Home Technology</span>
                  <p className="text-[11px] text-gray-600 font-light mt-1 h-8">
                    Integrated KNX systems provide intelligent climate control and energy management
                  </p>
                </div>
                
                <div className="flex-1 min-w-[200px]">
                  <span className="text-xs text-[#6E59A5] font-medium">Sustainable Solutions</span>
                  <p className="text-[11px] text-gray-600 font-light mt-1 h-8">
                    Environmentally conscious systems for water recycling and energy conservation
                  </p>
                </div>
                
                <div className="flex-1 min-w-[200px]">
                  <span className="text-xs text-[#6E59A5] font-medium">Luxury and Comfort</span>
                  <p className="text-[11px] text-gray-600 font-light mt-1 h-8">
                    Coco-mat natural sleep products and Varangis furniture for elegant living
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
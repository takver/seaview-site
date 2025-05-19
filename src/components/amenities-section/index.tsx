// @ts-nocheck
import React, { useState } from "react";
import { 
  Bed, BedDouble, Coffee, Fan, Lamp, 
  Tv, Wifi, WifiHigh, Power, Microwave, WashingMachine, 
  DoorOpen, LampFloor, Home, Utensils, Bath
} from "lucide-react";
import { Button } from "../ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "../ui/collapsible";

// Define the amenity type with a correct icon type that matches lucide-react components
type Amenity = {
  id: number;
  title: string;
  icon: React.ElementType; // Updated icon type to accept any React component
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

// Define all amenities
const amenities: Amenity[] = [
  { id: 1, title: "Sea View", icon: Home, featured: true },
  { id: 2, title: "Bed Linens", icon: BedDouble, featured: true },
  { id: 3, title: "Clothes washer", icon: WashingMachine, featured: true },
  { id: 4, title: "Dryer", icon: Fan, featured: true },
  { id: 5, title: "Essentials", icon: Bath, featured: true },
  { id: 6, title: "Heating", icon: Power, featured: true },
  { id: 7, title: "Hot water", icon: Coffee, featured: true },
  { id: 8, title: "Kitchen", icon: Utensils, featured: true },
  { id: 9, title: "Wifi", icon: WifiHigh, featured: true },
  { id: 10, title: "Environmental Mattresses by Coco-mat", icon: Bed, featured: true },
  { id: 11, title: "TV", icon: Tv },
  { id: 12, title: "Air conditioning", icon: Fan },
  { id: 13, title: "Backyard", icon: DoorOpen },
  { id: 14, title: "BBQ grill", icon: Utensils },
  { id: 15, title: "Coffee maker", icon: Coffee },
  { id: 16, title: "Cooking basics", icon: Utensils },
  { id: 17, title: "Dedicated workspace", icon: Lamp },
  { id: 18, title: "Dishwasher", icon: WashingMachine },
  { id: 19, title: "Dishes and silverware", icon: Utensils },
  { id: 20, title: "Free parking on premises", icon: DoorOpen },
  { id: 21, title: "Garden", icon: DoorOpen },
  { id: 22, title: "Long term stays allowed", icon: Home },
  { id: 23, title: "Microwave", icon: Microwave },
  { id: 24, title: "Oven", icon: Utensils },
  { id: 25, title: "Patio or balcony", icon: DoorOpen },
  { id: 26, title: "Refrigerator", icon: Utensils },
  { id: 27, title: "Stove", icon: Utensils },
  { id: 28, title: "Suitable for children", icon: Home },
  { id: 29, title: "Terrace", icon: DoorOpen },
  { id: 30, title: "Bathtub", icon: Bath },
  { id: 31, title: "Body soap", icon: Bath },
  { id: 32, title: "Cleaning products", icon: Bath },
  { id: 33, title: "Conditioner", icon: Bath },
  { id: 34, title: "Hair dryer", icon: Fan },
  { id: 35, title: "Hangers", icon: LampFloor },
  { id: 36, title: "Iron", icon: Power },
  { id: 37, title: "Shampoo", icon: Bath },
  { id: 38, title: "Beach access", icon: DoorOpen },
  { id: 39, title: "Ethernet connection", icon: Wifi },
  { id: 40, title: "Extra pillows and blankets", icon: BedDouble },
  { id: 41, title: "Formal dining area", icon: Home },
  { id: 42, title: "High chair", icon: Home },
  { id: 43, title: "Host greets you", icon: Home },
  { id: 44, title: "Portable fans", icon: Fan },
  { id: 45, title: "Room-darkening shades", icon: LampFloor },
  { id: 46, title: "Security cameras on property", icon: Tv },
  { id: 47, title: "Single level home", icon: Home },
  { id: 48, title: "Sound system", icon: Tv },
  { id: 49, title: "TV with streaming services", icon: Tv },
  { id: 50, title: "Underfloor heating", icon: Power },
  { id: 51, title: "Dual satellite internet", icon: Wifi },
  { id: 52, title: "Energy-efficient appliances", icon: Power },
  { id: 53, title: "Instant hot water circulation", icon: Bath },
  { id: 54, title: "Dual-drawer dishwasher", icon: WashingMachine },
  { id: 55, title: "Quality gas stove", icon: Utensils },
];

export const AmenitiesSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter featured amenities (top 10)
  const featuredAmenities = amenities.filter(amenity => amenity.featured);
  const remainingAmenities = amenities.filter(amenity => !amenity.featured);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-8 text-[#1A1F2C]">
          Modern Amenities
        </h2>
        
        <p className="text-gray-600 text-center font-light leading-relaxed max-w-3xl mx-auto mb-12">
          Indulge your inner chef with our quality gas stove and unique dual-drawer dishwasher - perfect for efficient cleanup after preparing culinary masterpieces. Enjoy the hotel-like luxury of instant hot water circulation, ensuring no wasted time (or water!) waiting for warm showers. During off-season experience the rare indulgence of underfloor heating, keeping you cozy and comfortable even on cool island evenings. Stay connected with our reliable dual satellite and landline internet. Stream your favorite shows on the Smart TV, all powered by energy-efficient appliances (A++ or better). Effortlessly take care of laundry needs with our on-site clothes washer.
        </p>
        
        {/* Featured Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {featuredAmenities.map((amenity) => (
            <div 
              key={amenity.id} 
              className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
            >
              <amenity.icon size={24} className="text-[#6E59A5] mb-3" />
              <h3 className="text-center font-normal text-gray-800 text-base">{amenity.title}</h3>
            </div>
          ))}
        </div>
        
        {/* Collapsible with Remaining Amenities */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleContent className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {remainingAmenities.map((amenity) => (
                <div 
                  key={amenity.id} 
                  className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <amenity.icon size={24} className="text-[#6E59A5] mb-3" />
                  <h3 className="text-center font-normal text-gray-800 text-base">{amenity.title}</h3>
                </div>
              ))}
            </div>
          </CollapsibleContent>
          
          <div className="flex justify-center mt-8">
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
          
          <div className="bg-gray-50 py-8 px-6 rounded-xl shadow-md">
            {/* Two rows of logos in a grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 justify-items-center">
              {premiumBrands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-center">
                  <div className={`h-14 w-24 flex items-center justify-center bg-white rounded-md ${brand.name === "Fisher & Paykel" ? "p-0" : "p-2"}`}>
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
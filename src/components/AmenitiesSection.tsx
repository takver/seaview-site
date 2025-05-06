
import { useState } from "react";
import { 
  Bed, BedDouble, Coffee, Fan, Fridge, Lamp, 
  Tv, Wifi, WifiHigh, Power, Microwave, WashingMachine, 
  Shower, Music, Hotel, Sofa, DoorOpen, LampFloor
} from "lucide-react";
import { Button } from "./ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "./ui/collapsible";

// Define the amenity type
type Amenity = {
  id: number;
  title: string;
  icon: React.FC<{ size?: number; className?: string }>;
  featured?: boolean;
};

// Define all amenities
const amenities: Amenity[] = [
  { id: 1, title: "Sea View", icon: Hotel, featured: true },
  { id: 2, title: "Bed Linens", icon: BedDouble, featured: true },
  { id: 3, title: "Clothes washer", icon: WashingMachine, featured: true },
  { id: 4, title: "Dryer", icon: Fan, featured: true },
  { id: 5, title: "Essentials", icon: Shower, featured: true },
  { id: 6, title: "Heating", icon: Power, featured: true },
  { id: 7, title: "Hot water", icon: Coffee, featured: true },
  { id: 8, title: "Kitchen", icon: Microwave, featured: true },
  { id: 9, title: "Wifi", icon: WifiHigh, featured: true },
  { id: 10, title: "Environmental Mattresses by Coco-mat", icon: Bed, featured: true },
  { id: 11, title: "TV", icon: Tv },
  { id: 12, title: "Air conditioning", icon: Fan },
  { id: 13, title: "Backyard", icon: DoorOpen },
  { id: 14, title: "BBQ grill", icon: Microwave },
  { id: 15, title: "Coffee maker", icon: Coffee },
  { id: 16, title: "Cooking basics", icon: Microwave },
  { id: 17, title: "Dedicated workspace", icon: Lamp },
  { id: 18, title: "Dishwasher", icon: WashingMachine },
  { id: 19, title: "Dishes and silverware", icon: Microwave },
  { id: 20, title: "Free parking on premises", icon: DoorOpen },
  { id: 21, title: "Garden", icon: DoorOpen },
  { id: 22, title: "Long term stays allowed", icon: Hotel },
  { id: 23, title: "Microwave", icon: Microwave },
  { id: 24, title: "Oven", icon: Microwave },
  { id: 25, title: "Patio or balcony", icon: DoorOpen },
  { id: 26, title: "Refrigerator", icon: Fridge },
  { id: 27, title: "Stove", icon: Microwave },
  { id: 28, title: "Suitable for children", icon: Sofa },
  { id: 29, title: "Terrace", icon: DoorOpen },
  { id: 30, title: "Bathtub", icon: Shower },
  { id: 31, title: "Body soap", icon: Shower },
  { id: 32, title: "Cleaning products", icon: Shower },
  { id: 33, title: "Conditioner", icon: Shower },
  { id: 34, title: "Hair dryer", icon: Fan },
  { id: 35, title: "Hangers", icon: LampFloor },
  { id: 36, title: "Iron", icon: Power },
  { id: 37, title: "Shampoo", icon: Shower },
  { id: 38, title: "Beach access", icon: DoorOpen },
  { id: 39, title: "Ethernet connection", icon: Wifi },
  { id: 40, title: "Extra pillows and blankets", icon: BedDouble },
  { id: 41, title: "Formal dining area", icon: Sofa },
  { id: 42, title: "High chair", icon: Sofa },
  { id: 43, title: "Host greets you", icon: Hotel },
  { id: 44, title: "Portable fans", icon: Fan },
  { id: 45, title: "Room-darkening shades", icon: LampFloor },
  { id: 46, title: "Security cameras on property", icon: Tv },
  { id: 47, title: "Single level home", icon: Hotel },
  { id: 48, title: "Sound system", icon: Music },
  { id: 49, title: "TV with streaming services", icon: Tv },
  { id: 50, title: "Underfloor heating", icon: Power },
  { id: 51, title: "Dual satellite internet", icon: Wifi },
  { id: 52, title: "Energy-efficient appliances", icon: Power },
  { id: 53, title: "Instant hot water circulation", icon: Shower },
  { id: 54, title: "Dual-drawer dishwasher", icon: WashingMachine },
  { id: 55, title: "Quality gas stove", icon: Microwave },
];

const AmenitiesSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter featured amenities (top 10)
  const featuredAmenities = amenities.filter(amenity => amenity.featured);
  const remainingAmenities = amenities.filter(amenity => !amenity.featured);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-8 text-[#1A1F2C]">
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
              <amenity.icon size={24} className="text-[#6E59A5] mb-3" strokeWidth={1.5} />
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
                  <amenity.icon size={24} className="text-[#6E59A5] mb-3" strokeWidth={1.5} />
                  <h3 className="text-center font-normal text-gray-800 text-base">{amenity.title}</h3>
                </div>
              ))}
            </div>
          </CollapsibleContent>
          
          <div className="flex justify-center mt-8">
            <CollapsibleTrigger asChild>
              <Button className="bg-[#6E59A5] hover:bg-[#6E59A5]/90 text-white">
                {isOpen ? "Show Less" : `Show All ${amenities.length} Amenities`}
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </div>
    </section>
  );
};

export default AmenitiesSection;

import { type FC } from 'react';
import { Users, Bed, ShowerHead, Utensils, Sofa } from "lucide-react";

export const PropertyFeaturesBanner: FC = () => {
  return (
    <div className="w-full bg-[#333333] text-white py-3">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-wrap justify-center md:justify-evenly items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <Users size={20} strokeWidth={1.5} className="text-white opacity-90" />
            <span className="text-sm md:text-base">Sleeps 6</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Bed size={20} strokeWidth={1.5} className="text-white opacity-90" />
            <span className="text-sm md:text-base">3 Bedrooms</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ShowerHead size={20} strokeWidth={1.5} className="text-white opacity-90" />
            <span className="text-sm md:text-base">3 Bathrooms</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Utensils size={20} strokeWidth={1.5} className="text-white opacity-90" />
            <span className="text-sm md:text-base">Kitchen</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Sofa size={20} strokeWidth={1.5} className="text-white opacity-90" />
            <span className="text-sm md:text-base">Living room</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 
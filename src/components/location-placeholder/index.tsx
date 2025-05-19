// @ts-nocheck
import { MapPin } from "lucide-react";

export const LocationPlaceholder = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-12 text-[#1A1F2C]">
          Our Location
        </h2>
        <p className="text-gray-600 text-center font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Located in the beautiful island of Sifnos, our property offers stunning views and easy access to nearby attractions
        </p>
        
        {/* Placeholder map - will be replaced with actual map implementation */}
        <div className="border-2 border-gray-300 shadow-md bg-gray-100 p-6 rounded-lg h-[400px] flex flex-col items-center justify-center">
          <MapPin size={64} className="text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-light">Map will be implemented here</p>
          <p className="text-gray-500 font-light mt-2">Ano Petali, Apollonia, Sifnos, 84003</p>
        </div>
      </div>
    </section>
  );
}; 
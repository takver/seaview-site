import * as React from 'react';
import { Heart, Mountain, Leaf, Star, Coffee } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export const IdealGuestsSection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-8 text-[#1A1F2C]">
          Ideal Guests
        </h2>
        
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-gray-600 text-center font-light leading-relaxed mb-8">
            Appreciators of design, breathtaking vistas, environmental sustainability, luxury, and authentic local culture, this retreat is for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center">
              <Heart className="text-[#6E59A5] mb-4" size={28} />
              <h3 className="text-xl font-normal text-[#6E59A5] text-center mb-3">Design Lovers</h3>
              <p className="text-gray-600 text-center font-light">
                Appreciate thoughtful architecture and interior design that harmonizes with nature.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center">
              <Mountain className="text-[#6E59A5] mb-4" size={28} />
              <h3 className="text-xl font-normal text-[#6E59A5] text-center mb-3">Nature Enthusiasts</h3>
              <p className="text-gray-600 text-center font-light">
                Seek panoramic sea views and authentic connection with local landscapes.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center">
              <Leaf className="text-[#6E59A5] mb-4" size={28} />
              <h3 className="text-xl font-normal text-[#6E59A5] text-center mb-3">Eco-Conscious Travelers</h3>
              <p className="text-gray-600 text-center font-light">
                Value sustainability practices and environmentally-friendly accommodations.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-3xl mx-auto mt-10">
          <p className="text-gray-600 text-center font-light leading-relaxed">
            Indulge in a stay that blends comfort, authenticity, and environmental consciousness, and experience Greece like never before.
          </p>
        </div>
      </div>
    </section>
  );
}; 
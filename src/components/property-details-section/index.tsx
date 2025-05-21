import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Leaf, Globe2, X } from "lucide-react";
import { useState, useEffect } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export const PropertyDetailsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const openImage = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-12 text-[#1A1F2C]">
          Property Highlights
        </h2>

        <div className="flex flex-col gap-8">
          <TabsPrimitive.Root
            defaultValue="place"
            className="flex flex-col w-full"
          >
            <TabsPrimitive.List className="flex flex-row h-auto justify-center space-x-4 bg-transparent p-0 mb-8">
              <TabsPrimitive.Trigger
                value="place"
                className="flex items-center gap-2 justify-center px-6 py-3 rounded-full border-2 border-[#6E59A5] transition-colors data-[state=active]:bg-[#6E59A5] data-[state=active]:text-white data-[state=inactive]:bg-white/10 data-[state=inactive]:text-[#6E59A5] data-[state=inactive]:hover:bg-[#6E59A5]/10"
              >
                <Home size={20} />
                <span className="font-medium">The Place</span>
              </TabsPrimitive.Trigger>
              <TabsPrimitive.Trigger
                value="gardens"
                className="flex items-center gap-2 justify-center px-6 py-3 rounded-full border-2 border-[#6E59A5] transition-colors data-[state=active]:bg-[#6E59A5] data-[state=active]:text-white data-[state=inactive]:bg-white/10 data-[state=inactive]:text-[#6E59A5] data-[state=inactive]:hover:bg-[#6E59A5]/10"
              >
                <Leaf size={20} />
                <span className="font-medium">Gardens</span>
              </TabsPrimitive.Trigger>
              <TabsPrimitive.Trigger
                value="sustainability"
                className="flex items-center gap-2 justify-center px-6 py-3 rounded-full border-2 border-[#6E59A5] transition-colors data-[state=active]:bg-[#6E59A5] data-[state=active]:text-white data-[state=inactive]:bg-white/10 data-[state=inactive]:text-[#6E59A5] data-[state=inactive]:hover:bg-[#6E59A5]/10"
              >
                <Globe2 size={20} />
                <span className="font-medium">Sustainability</span>
              </TabsPrimitive.Trigger>
            </TabsPrimitive.List>

            <div className="min-h-[500px]">
              {/* The Place Tab Content */}
              <TabsPrimitive.Content
                value="place"
                className="border-none p-0 m-0 data-[state=active]:block h-full"
              >
                <div>
                  <div className="text-gray-600 font-light leading-relaxed">
                    <h4 className="text-xl font-light text-[#6E59A5] mb-4">Breathtaking Views</h4>
                    <div className="md:float-right md:ml-8 md:mb-4 rounded-lg overflow-hidden shadow-md mb-6 md:max-w-[300px] cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openImage("/images/spring_sunrise_St_John.webp")}>
                      <img
                        src="/images/spring_sunrise_St_John.webp"
                        alt="Sunrise view over St. John's church"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p className="mb-6">
                      Immerse yourself in expansive views of the Aegean where the Cycladic islands rise from the sea… Ios, Sikinos, Paros, Naxos. Our location offers a unique perspective where these islands gracefully dot the horizon. Admire the iconic St. John's blue-domed church, and the charming vistas of Apollonia and Artemonas villages. Wake up to magnificent sunrises that are nothing short of magical.
                    </p>
                    
                    <h4 className="text-xl font-light text-[#6E59A5] mb-4 mt-8">Distinctive Interior Design</h4>
                    <div className="md:float-left md:mr-8 md:mb-4 rounded-lg overflow-hidden shadow-md mb-6 md:max-w-[200px] cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openImage("/images/closeup-brass-lantern-detail.webp")}>
                      <img
                        src="/images/closeup-brass-lantern-detail.webp"
                        alt="Detail of antique brass lantern"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p>
                      Step inside to discover a world where antique brass and copper lighting from vintage ships melds with sleek grey stone flooring. The pristine white walls and meticulously selected solid wood antique furnishings create an ambiance of refined elegance and unparalleled charm. The ceilings boast chestnut beams from Mount Athos and natural stone slabs, adding a touch of rustic luxury. Bedroom floors are made of solid oak, enhancing the warmth and authenticity of the space. The kitchen and corridors are adorned with natural, rectangular stone slabs, perfectly complementing the home's unique character.
                    </p>
                  </div>
                </div>
              </TabsPrimitive.Content>

              {/* Gardens Tab Content */}
              <TabsPrimitive.Content
                value="gardens"
                className="border-none p-0 m-0 data-[state=active]:block h-full"
              >
                <div>
                  <div className="text-gray-600 font-light leading-relaxed">
                    <h4 className="text-xl font-light text-[#6E59A5] mb-4">Private Garden Sanctuary with Seasonal Harvests</h4>
                    
                    
                    <div className="md:float-right md:ml-8 md:mb-4 rounded-lg overflow-hidden shadow-md mb-6 md:max-w-[190px] cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openImage("/images/garden-figs-path-south.webp")}>
                      <img
                        src="/images/garden-figs-path-south.webp"
                        alt="Garden path with fig trees and southern view"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    
                    <p className="mb-4">
                      Discover the charm of our private garden, a space where sustainability and tranquility meet. Nestled near the house is a cozy patio and outdoor dining area, perfect for enjoying meals surrounded by nature's beauty. Under the olive trees, a shaded sitting area offers a peaceful spot for relaxation and reflection.
                    </p>
                    <p className="mb-4">
                      Our garden is an array of drought-resistant flora, including herbs like thyme, oregano, and sage, complemented by fragrant wild apple and pear trees. The presence of pistachio trees adds a unique touch, offering both shade and seasonal delights. Sifnian Rockrose and cypress trees further enhance the garden's diverse ecosystem.
                    </p>
                    <div className="md:float-left md:mr-8 md:mb-4 rounded-lg overflow-hidden shadow-md mb-6 md:max-w-[110px] cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openImage("/images/uploads/2025/03/almont_flowers.webp")}>
                      <img
                        src="/images/uploads/2025/03/almont_flowers.webp"
                        alt="Almond flowers in the garden"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p className="mb-4">
                      The south end of the garden is dedicated to Sifnian grape varieties, paying homage to the island's rich viticultural tradition. An area is set aside for growing seasonal edible plants. Here, guests can enjoy fresh tomatoes, peppers, zucchini, artichokes, as well as summer fruits such as watermelons, melons, and a selection of berries, all cultivated with care and available as the seasons allow.
                    </p>
                    <p>
                      In this garden, every element is thoughtfully integrated to create a harmonious and sustainable environment. Whether you're dining al fresco, lounging under the olive and pistachio trees, or sampling fresh produce from the garden, this space is a celebration of organic living and a testament to the joys of a simpler, more connected way of life.
                    </p>
                  </div>
                </div>
              </TabsPrimitive.Content>

              {/* Sustainability Tab Content */}
              <TabsPrimitive.Content
                value="sustainability"
                className="border-none p-0 m-0 data-[state=active]:block h-full"
              >
                <div>
                  <div className="text-gray-600 font-light leading-relaxed">
                    <h4 className="text-xl font-light text-[#6E59A5] mb-4">Sustainable Eco-Friendly Living</h4>
                    
                    <p className="mb-4">
                      Our home is a testament to sustainable luxury. Exceptional thermal insulation, waterproofing, and environmentally friendly paints ensure a minimal ecological footprint. We've used breathable materials with very low volatile organic compound emissions, free from solvents, to maintain indoor air quality.
                    </p>
                    <p className="mb-4">
                      This combination of super-insulation and high thermal mass of 60 cm thick stone walls effectively retains heat in winter and keeps the interior cool in summer, significantly reducing energy needs for climate control. At the heart of our eco-friendly approach is a 12KW air-to-water heat pump with an inverter for efficient cooling and heating.
                    </p>
                    <div className="md:float-right md:ml-8 md:mb-4 rounded-lg overflow-hidden shadow-md mb-6 md:max-w-[340px] cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openImage("/images/plan-greywater-system-diagram.webp")}>
                      <img
                        src="/images/plan-greywater-system-diagram.webp"
                        alt="Gray water recycling system"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p className="mb-4">
                      We embrace water conservation through an advanced gray-water recycling system, repurposing shower water for garden irrigation. This is complemented by a rainwater capture system, with an underground cistern to store winter rain, which is then utilized for summer watering needs. Our garden is thoughtfully landscaped with drought-resistant plants, reducing the need for frequent watering and maintaining natural beauty with minimal environmental impact.
                    </p>
                  </div>
                </div>
              </TabsPrimitive.Content>
            </div>
          </TabsPrimitive.Root>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => closeImage()}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-40 rounded-full text-white hover:bg-opacity-60 transition-colors"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => closeImage()}
              aria-label="Close"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-[90%] max-h-[90vh] object-contain"
              onClick={(e: React.MouseEvent<HTMLImageElement>) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}; 
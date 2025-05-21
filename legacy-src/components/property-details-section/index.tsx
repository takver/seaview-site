import * as React from 'react';
import { Home, Leaf, Globe2, X } from "lucide-react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

interface PropertyDetailsSectionProps {
  // Add any props if needed
}

export const PropertyDetailsSection: React.FC<PropertyDetailsSectionProps> = () => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  // Close modal on escape key
  React.useEffect(() => {
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

  const openImage = (imageSrc: string): void => {
    setSelectedImage(imageSrc);
  };

  const closeImage = (): void => {
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
                {/* ... existing gardens content ... */}
              </TabsPrimitive.Content>

              {/* Sustainability Tab Content */}
              <TabsPrimitive.Content
                value="sustainability"
                className="border-none p-0 m-0 data-[state=active]:block h-full"
              >
                {/* ... existing sustainability content ... */}
              </TabsPrimitive.Content>
            </div>
          </TabsPrimitive.Root>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeImage}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-40 rounded-full text-white hover:bg-opacity-60 transition-colors"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                closeImage();
              }}
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
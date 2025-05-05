
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Leaf, Recycle } from "lucide-react";

const PropertyDetailsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-[#1A1F2C]">
          Property Details
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <Tabs
            defaultValue="place"
            orientation="vertical"
            className="flex flex-col md:flex-row w-full"
          >
            <TabsList className="flex flex-row md:flex-col h-auto md:self-start space-x-2 md:space-x-0 md:space-y-2 md:min-w-[220px] bg-transparent p-0">
              <TabsTrigger
                value="place"
                className="flex items-center gap-2 justify-start w-full px-6 py-3 data-[state=active]:bg-[#6E59A5] data-[state=active]:text-white hover:bg-gray-100 data-[state=active]:hover:bg-[#6E59A5]/90 text-left rounded-md transition-colors"
              >
                <Home size={20} />
                <span>The Place</span>
              </TabsTrigger>
              <TabsTrigger
                value="gardens"
                className="flex items-center gap-2 justify-start w-full px-6 py-3 data-[state=active]:bg-[#6E59A5] data-[state=active]:text-white hover:bg-gray-100 data-[state=active]:hover:bg-[#6E59A5]/90 text-left rounded-md transition-colors"
              >
                <Leaf size={20} />
                <span>Gardens</span>
              </TabsTrigger>
              <TabsTrigger
                value="sustainability"
                className="flex items-center gap-2 justify-start w-full px-6 py-3 data-[state=active]:bg-[#6E59A5] data-[state=active]:text-white hover:bg-gray-100 data-[state=active]:hover:bg-[#6E59A5]/90 text-left rounded-md transition-colors"
              >
                <Recycle size={20} />
                <span>Sustainability</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 mt-6 md:mt-0 min-h-[500px] md:ml-10">
              {/* The Place Tab Content */}
              <TabsContent
                value="place"
                className="border-none p-0 m-0 data-[state=active]:block h-full"
              >
                <div>
                  <h3 className="text-2xl font-light mb-6 text-[#1A1F2C]">
                    An Exclusive Sifnos Retreat
                  </h3>
                  <div className="text-gray-600 font-light leading-relaxed space-y-4">
                    <div className="md:float-right md:ml-8 md:mb-4 rounded-lg overflow-hidden shadow-md mb-6 md:max-w-[300px]">
                      <img
                        src="/images/IMG_0383-scaled.webp"
                        alt="Sifnos villa exterior view"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p>
                      Nestled on the tranquil island of Sifnos, our villa offers an exclusive retreat with panoramic views of the Aegean Sea. The architecture seamlessly blends traditional Cycladic design with modern comfort, creating a space that feels both authentic and luxurious.
                    </p>
                    <p>
                      The property features spacious living areas that open onto terraces, perfect for enjoying the Mediterranean sunrise or sunset. Stone walls and whitewashed surfaces reflect the island's heritage, while contemporary amenities ensure a comfortable stay.
                    </p>
                    <p>
                      With its elevated position, the villa captures cooling sea breezes and offers uninterrupted vistas across the island's dramatic landscape. From your private terrace, watch as the changing light transforms the sea from turquoise to deep blue throughout the day.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Gardens Tab Content */}
              <TabsContent
                value="gardens"
                className="border-none p-0 m-0 data-[state=active]:block h-full"
              >
                <div>
                  <h3 className="text-2xl font-light mb-6 text-[#1A1F2C]">
                    Private Garden Sanctuary
                  </h3>
                  <div className="text-gray-600 font-light leading-relaxed space-y-4">
                    <div className="md:float-right md:ml-8 md:mb-4 rounded-lg overflow-hidden shadow-md mb-6 md:max-w-[300px]">
                      <img
                        src="/images/IMG_0330-scaled.webp"
                        alt="Villa garden with olive trees"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p>
                      Discover the charm of our private garden, a space where sustainability and tranquility meet. Nestled near the house is a cozy patio and outdoor dining area, perfect for enjoying meals surrounded by nature's beauty. Under the olive trees, a shaded sitting area offers a peaceful spot for relaxation and reflection.
                    </p>
                    <p>
                      Our garden is an array of drought-resistant flora, including herbs like thyme, oregano, and sage, complemented by fragrant wild apple and pear trees. The presence of pistachio trees adds a unique touch, offering both shade and seasonal delights. Sifnian Rockrose and cypress trees further enhance the garden's diverse ecosystem.
                    </p>
                    <p>
                      The south end of the garden is dedicated to Sifnian grape varieties, paying homage to the island's rich viticultural tradition. An area is set aside for growing seasonal edible plants. Here, guests can enjoy fresh tomatoes, peppers, zucchini, artichokes, as well as summer fruits such as watermelons, melons, and a selection of berries, all cultivated with care and available as the seasons allow.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Sustainability Tab Content */}
              <TabsContent
                value="sustainability"
                className="border-none p-0 m-0 data-[state=active]:block h-full"
              >
                <div>
                  <h3 className="text-2xl font-light mb-6 text-[#1A1F2C]">
                    Sustainable Eco-Friendly Living
                  </h3>
                  <div className="text-gray-600 font-light leading-relaxed space-y-4">
                    <div className="md:float-right md:ml-8 md:mb-4 rounded-lg overflow-hidden shadow-md mb-6 md:max-w-[300px]">
                      <img
                        src="/images/graywater.webp"
                        alt="Gray water recycling system"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <p>
                      Our home is a testament to sustainable luxury. Exceptional thermal insulation, waterproofing, and environmentally friendly paints ensure a minimal ecological footprint. We've used breathable materials with very low volatile organic compound emissions, free from solvents, to maintain indoor air quality.
                    </p>
                    <p>
                      This combination of super-insulation and high thermal mass of 60 cm thick stone walls effectively retains heat in winter and keeps the interior cool in summer, significantly reducing energy needs for climate control. At the heart of our eco-friendly approach is a 12KW air-to-water heat pump with an inverter for efficient cooling and heating.
                    </p>
                    <p>
                      We embrace water conservation through an advanced gray-water recycling system, repurposing shower water for garden irrigation. This is complemented by a rainwater capture system, with an underground cistern to store winter rain, which is then utilized for summer watering needs. Our garden is thoughtfully landscaped with drought-resistant plants, reducing the need for frequent watering and maintaining natural beauty with minimal environmental impact.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsSection;

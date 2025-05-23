import { Card, CardContent } from "../ui/card";

const highlights = [
  {
    title: "Breathtaking Views",
    description: "Enjoy sweeping views of the sea, St. John's blue-domed church, Apollonia and Artemonas villages, and islands to the east and south of Sifnos."
  },
  {
    title: "Unique Interiors",
    description: "With antique brass and copper light fixtures from old ships, grey stone floors, white-walled interiors, and solid wood antique furniture, this home exudes elegance and distinctiveness."
  },
  {
    title: "Sustainable Living",
    description: "Solar-powered hot water systems, rainwater collection, gray water recycling, and KNX automation systems ensure a commitment to eco-friendly convenience and energy-efficient climate control."
  },
  {
    title: "Outdoor Beauty",
    description: "Our garden, with native herbs, figs, grapes, pomegranates, and olive trees, promotes environmental well-being. Relax in shaded outdoor patio areas."
  },
  {
    title: "Gourmet Kitchen",
    description: "Equipped with a quality gas stove for chef-quality cooking and a unique double dishwasher for efficiency."
  },
  {
    title: "Modern Amenities",
    description: "High-speed satellite internet, with indoors and outdoors Wi-Fi coverage, smart TV, and A+ energy-efficient appliances including heat-pump with fan-coils for cooling and floor-heating."
  },
  {
    title: "Location",
    description: "The location, on the outskirts of a quiet village, requires an uphill walk from the nearest parking spot, offering a serene and slightly secluded haven."
  },
  {
    title: "Hiking Paradise",
    description: "The house is positioned near trailheads – explore hidden treasures... accessible only on foot! A unique network of trails some 200 km, the oldest dating back as far as the 3 millennium BC."
  }
];

export const PropertyHighlights = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-12 text-[#1A1F2C]">
          What Sets This Place Apart
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {highlights.slice(0, 4).map((highlight, index) => (
            <Card key={index} className="border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-normal text-[#6E59A5]">{highlight.title}</h3>
                </div>
                <p className="text-gray-600 text-center font-light leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.slice(4).map((highlight, index) => (
            <Card key={index} className="border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-normal text-[#6E59A5]">{highlight.title}</h3>
                </div>
                <p className="text-gray-600 text-center font-light leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 
import React from "react";
import { Card, CardContent } from "./ui/card";

type LocationCardProps = {
  title: string;
  description: string;
  imageSrc: string;
};

const LocationCard: React.FC<LocationCardProps> = ({ title, description, imageSrc }) => {
  return (
    <Card className="overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl">
      <div className="h-56 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-normal text-[#6E59A5] mb-3">{title}</h3>
        <p className="text-gray-600 font-light leading-relaxed">
          {description}
        </p>
        {title === "Hiking Paradise" && (
          <a 
            href="https://sifnostrails.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#6E59A5] hover:underline inline-block mt-2"
          >
            sifnostrails.com
          </a>
        )}
      </CardContent>
    </Card>
  );
};

const DiscoverSifnosSection = () => {
  const locations = [
    {
      title: "Artemonas",
      description: "Wander the stone-paved alleys, visit art galleries, and enjoy artisan coffee in this beautifully preserved village.",
      imageSrc: "/images/artemonas.1280x-605x465.webp",
    },
    {
      title: "Apollonia",
      description: "Experience vibrant nightlife, stylish pubs, and savor the island's best food in the trendy heart of Sifnos.",
      imageSrc: "/images/apollonia-night-drone-394x303.jpg",
    },
    {
      title: "Beaches & Culture",
      description: "From stunning beaches to rich culinary delights, Sifnos offers an untouched charm and an unforgettable Greek experience.",
      imageSrc: "/images/chrissopigi.1920x1280-605x465.webp",
    },
    {
      title: "Hiking Paradise",
      description: "The house is positioned near trailheads – explore hidden treasures... accessible only on foot! A unique network of trails some 200 km, the oldest dating back as far as the 3 millennium BC. Officially marked trails are available on",
      imageSrc: "/images/sifnos-trail-1-32.webp",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-[#1A1F2C]">
          Discover Sifnos<span className="text-[#6E59A5]">...</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <LocationCard
              key={index}
              title={location.title}
              description={location.description}
              imageSrc={location.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSifnosSection; 
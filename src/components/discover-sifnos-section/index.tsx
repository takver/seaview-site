import React from "react";
import { Card, CardContent } from "../ui/card";

type LocationCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
};

const LocationCard = ({ title, description, imageSrc, className }: LocationCardProps) => {
  const isHiking = title === "Hiking Paradise";
  return (
    <Card className={`overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl ${className}`}>
      <div className="h-56 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className={isHiking ? "px-2 py-4" : "p-4"}>
        <h3 className="text-xl font-normal text-[#6E59A5] mb-2">{title}</h3>
        <p className="text-gray-600 font-light leading-relaxed">
          {description}
          {isHiking && (
            <> Officially marked trails are available on <a href="https://sifnostrails.com" target="_blank" rel="noopener noreferrer" className="text-[#6E59A5] hover:underline">sifnostrails.com</a>.</>
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export const DiscoverSifnosSection = () => {
  const locations = [
    {
      title: "Artemonas",
      description: "Meander through the stone-paved alleys lined with bougainvillea and 19th-century captains' mansions, visit art galleries, and enjoy artisan coffee in this beautifully preserved village, pop into pocket-size art studios, savour melt-in-your-mouth amygdalota at century-old pastry shops.",
      imageSrc: "/images/sifnos-artemonas-square-evening.webp",
    },
    {
      title: "Apollonia",
      description: "Experience vibrant nightlife, stylish pubs, and savor the island's best food in the trendy heart of Sifnos.",
      imageSrc: "/images/sifnos-apollonia-aerial.jpg",
    },
    {
      title: "Beaches & Culture",
      description: "From stunning beaches to rich culinary delights, Sifnos offers an untouched charm and an unforgettable Greek experience.",
      imageSrc: "/images/sifnos-chrissopigi-st-chrisostomos.webp",
    },
    {
      title: "Hiking Paradise",
      description: "The house is positioned near trailheads – explore hidden treasures... accessible only on foot! A unique network of trails some 200 km, the oldest dating back as far as the 3 millennium BC.", 
      imageSrc: "/images/sifnos-trail-1-32.webp",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-12 text-[#1A1F2C]">
          Discover Sifnos<span className="text-[#6E59A5]">...</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <LocationCard
              key={index}
              title={location.title}
              description={location.description}
              imageSrc={location.imageSrc}
              className={location.title === "Hiking Paradise" ? "lg:max-w-[320px] lg:w-[110%] mx-auto" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 
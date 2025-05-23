import { MapPin } from "lucide-react";
import { Button } from "../ui/button";

export const IntroSection = () => {
  const scrollToLocation = () => {
    const locationElement = document.getElementById('location-section');
    if (locationElement) {
      locationElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-8 text-gray-800">Cycladic home in Sifnos, Greece</h2>
        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light text-lg">
          Nestled on a hilltop with a stunning view of the ocean and the surrounding villages, this
          peaceful retreat is surrounded by a beautiful Mediterranean garden of cypresses, olive trees
          and fig trees. Located on the outskirts of a quiet village, and accessible only by foot, it is still
          within a short hiking distance from the artsy coffee shops and galleries of Artemonas and the
          trendy restaurants and bars of Apollonia village.
        </p>
        
        <div className="flex justify-center mt-10">
          <Button
            variant="transparentRounded"
            className="border-2 border-gray-600 text-gray-600 bg-transparent hover:bg-gray-100 hover:text-gray-800"
            size="pill"
            onClick={scrollToLocation}
          >
            <MapPin size={24} strokeWidth={1.5} className="text-gray-600" />
            <span className="text-base font-medium">See Map</span>
          </Button>
        </div>
      </div>
    </section>
  );
}; 
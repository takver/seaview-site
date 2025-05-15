import { MapPin } from "lucide-react";
import { Button } from "../ui/button";

export const LocationSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-8 text-gray-800">Cycladic home in Sifnos, Greece</h2>
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
          >
            <MapPin size={24} strokeWidth={1.5} className="text-gray-600" />
            <span className="text-base font-medium">See Map</span>
          </Button>
        </div>
        
        {/* We'll replace this with a real map implementation later */}
        <div className="mt-16 hidden">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="bg-gray-300 h-80 w-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}; 

import { Button } from "./ui/button";

const galleryImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg"
];

const GallerySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-[#1A1F2C]">
          Gallery
        </h2>
        <p className="text-gray-600 text-center font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Take a glimpse at our beautiful property and the stunning views of Sifnos
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button className="bg-[#6E59A5] hover:bg-[#6E59A5]/90 text-white px-4 py-2 rounded">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

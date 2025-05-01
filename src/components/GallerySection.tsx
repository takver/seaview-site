
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
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Gallery</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Take a glimpse at our beautiful property and the stunning views of Sifnos
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-md shadow-md">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

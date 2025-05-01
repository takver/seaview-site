
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "Modern Amenities",
    description: "Fully equipped kitchen, air conditioning, and comfortable furnishings",
    icon: "🏠"
  },
  {
    title: "Stunning Views",
    description: "Panoramic sea views from your private terrace",
    icon: "🌊"
  },
  {
    title: "Perfect Location",
    description: "Close to beaches, restaurants, and local attractions",
    icon: "📍"
  }
];

const PropertyFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Sifnos Seaview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyFeatures;

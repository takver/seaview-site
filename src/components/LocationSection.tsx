
const LocationSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Our Location</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Perfectly situated on the beautiful island of Sifnos, our property offers easy access to beaches, restaurants, and local attractions
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            {/* Placeholder for map image - we'll replace with real map */}
            <div className="bg-gray-300 h-80 w-full"></div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4">Find Us Here</h3>
            <p className="text-gray-600 mb-6">
              Located in the picturesque village of Kamares, Sifnos, our property offers stunning sea views and is just a short walk from the beach.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• 10 minute walk to Kamares Beach</li>
              <li>• 5 minutes to local restaurants and shops</li>
              <li>• 15 minutes drive to Apollonia (main town)</li>
              <li>• 20 minutes to Platis Gialos Beach</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

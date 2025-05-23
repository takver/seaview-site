import React from 'react';
import { MapPin, Phone, Mail, Car, Navigation } from "lucide-react";
import contactConfig from '../../config/contactConfig.json';

export const LocationPlaceholder = () => {
  return (
    <section className="bg-[#1A1F2C] py-16">
      <h2 className="text-3xl md:text-4xl font-light text-center mb-12 text-white">
        Our Location
      </h2>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Google Map - Left Side */}
          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12749.366403500799!2d24.7232307!3d36.9777785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14988d5d9f332f7d%3A0xfbfe49015dc03f09!2sSifnos%20Seaview!5e0!3m2!1sen!2sbd!4v1703663247892!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Sifnos Seaview Location"
            />
          </div>
          
          {/* Information - Right Side */}
          <div className="text-white space-y-8">
            {/* Location */}
            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Sifnos Seaview is perched on the outskirts of Artemonas, offering panoramic 
                views of the Aegean Sea. Our location provides the perfect balance of tranquility 
                and accessibility to the island's attractions.
              </p>
            </div>
            
            {/* Getting Here */}
            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Getting Here
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• From Kamares Port: 15-minute taxi ride</li>
                <li>• From Apollonia: 10-minute walk uphill</li>
                <li>• Airport transfers can be arranged upon request</li>
                <li>• Free parking available on-site</li>
              </ul>
            </div>
            
            {/* Nearby Attractions */}
            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Car className="w-5 h-5" />
                Nearby Attractions
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Apollonia (Capital): 800m</li>
                <li>• Artemonas Village: 500m</li>
                <li>• Panagia Poulati: 1km</li>
                <li>• Kastro (Medieval Capital): 5km</li>
                <li>• Chrissopigi Monastery: 8km</li>
                <li>• Vathy Beach: 10km</li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-xl font-medium mb-4">Need Directions?</h3>
              <div className="space-y-2">
                <p className="text-gray-300 mb-4">
                  We're happy to provide detailed directions or arrange transportation. 
                  Feel free to contact us:
                </p>
                <a 
                  href={`tel:${contactConfig.phoneClean}`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {contactConfig.phone}
                </a>
                <a 
                  href={`mailto:${contactConfig.email}`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {contactConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
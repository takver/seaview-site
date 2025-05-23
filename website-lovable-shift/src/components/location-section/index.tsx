import { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, Phone } from "lucide-react";
import contactConfig from '../../config/contactConfig.json';

export const LocationSection = () => {
  const [locationExpanded, setLocationExpanded] = useState(true);
  const [gettingThereExpanded, setGettingThereExpanded] = useState(true);

  return (
    <section id="location-section" className="bg-[#1A1F2C] py-16">
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
          <div className="text-white space-y-6">
            {/* Our Location Dropdown */}
            <div>
              <button
                onClick={() => setLocationExpanded(!locationExpanded)}
                className="w-full flex items-center justify-between text-xl font-medium mb-4 hover:text-gray-300 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Our Location
                </span>
                {locationExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {locationExpanded && (
                <div className="pl-7 text-gray-300 leading-relaxed">
                  <p className="mb-4">
                    Sifnos Seaview, An Exceptional Sanctuary in Ano Petali Village, Apollonia, Sifnos Island, Greece, 84003
                  </p>
                </div>
              )}
            </div>
            
            {/* Getting There Dropdown */}
            <div>
              <button
                onClick={() => setGettingThereExpanded(!gettingThereExpanded)}
                className="w-full flex items-center justify-between text-xl font-medium mb-4 hover:text-gray-300 transition-colors"
              >
                <span>Getting There</span>
                {gettingThereExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {gettingThereExpanded && (
                <div className="pl-7 space-y-6 text-gray-300">
                  {/* Sifnos Port Authority */}
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Sifnos Port Authority</h4>
                    <p className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4" />
                      Tel: +30 22840 33617
                    </p>
                    <p>Distance from property: 5.6 Km / 3.8 Miles</p>
                  </div>
                  
                  {/* Piraeus Port Authority */}
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Piraeus Port Authority</h4>
                    <p className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4" />
                      Tel: +30 210 455 0000
                    </p>
                    <p className="mb-2">
                      The distance between Piraeus and Sifnos is 76 nautical miles (87 miles, 141 Km)
                    </p>
                    <p>
                      The ferry crossing from Piraeus to Sifnos is approximately 2 hours and 46 minutes – varies depending on the vessel and the season.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
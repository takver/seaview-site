import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import AirbnbIcon from "../icons/AirbnbIcon";
import BookingIcon from "../icons/BookingIcon";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* About Us Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/seaview-logo-394x394.png" alt="Sifnos Seaview Logo" className="w-8 h-8" />
              <h3 className="text-xl font-light">About Us</h3>
            </div>
            <p className="text-gray-300 mb-4">
              In crafting our retreat, we were guided by our deepest convictions: infusing{' '}
              <span className="text-green-400">sustainability</span> with{' '}
              <span className="text-gray-300">modern luxury</span>, and embracing Sifnos unique{' '}
              <span className="text-green-400">tradition</span>.
            </p>
            <p className="text-gray-300 mb-6">
              Our approach has been one of reverence and responsibility - to both the
              environment and the rich heritage of the island. Here, each element, from eco-
              conscious amenities to the harmony of our native gardens with traditional
              architecture, tells a story of thoughtful integration. It's a place where luxury
              transcends comfort, becoming a sustainable, authentic experience deeply rooted in
              the soul of Sifnos.
            </p>
            <img 
              src="/images/travel_proud.png" 
              alt="Travel Proud" 
              className="h-8 mb-6"
            />
            <p className="text-gray-300">
              We welcome guests of all backgrounds and identities, ensuring a safe and inclusive
              space for everyone.
            </p>
          </div>
          
          {/* Middle Column - Empty with border */}
          <div className="hidden md:block md:col-span-2 relative">
            <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-gray-500"></div>
          </div>
          
          {/* Right Column - Contact Info & Booking */}
          <div className="md:col-span-5">
            <div className="mb-8">
              <h3 className="text-xl font-light mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MapPin className="text-white" />
                  <span>Ano Petali, Apollonia, Sifnos, 84003</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-white" />
                  <span>+30 697 656 2484</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-white" />
                  <span>info@sifnos-seaview.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-light mb-6">Reserve Your Stay...</h3>
              <div className="flex gap-6">
                <a href="#" aria-label="Book on Airbnb">
                  <div className="bg-black w-10 h-10 flex items-center justify-center rounded-sm border border-gray-700">
                    <AirbnbIcon size={24} className="text-white" />
                  </div>
                </a>
                <a href="#" aria-label="Book on Booking.com">
                  <div className="bg-black w-10 h-10 flex items-center justify-center rounded-sm border border-gray-700">
                    <BookingIcon size={24} className="text-white" />
                  </div>
                </a>
                <a href="#" aria-label="Book on Home Exchange">
                  <div className="bg-black w-10 h-10 flex items-center justify-center rounded-sm border border-gray-700">
                    <img 
                      src="/images/homeexchangelogo.svg" 
                      alt="Home Exchange" 
                      className="w-8 h-8"
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="/facilities" className="text-gray-300 hover:text-white">Facilities</Link></li>
                <li><Link to="/gallery" className="text-gray-300 hover:text-white">Gallery</Link></li>
                <li><Link to="/location" className="text-gray-300 hover:text-white">Location</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sifnos Seaview. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 
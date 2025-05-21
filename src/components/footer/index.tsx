import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import AirbnbIcon from "../icons/AirbnbIcon";
import BookingIcon from "../icons/BookingIcon";
import contactConfig from "../../config/contactConfig.json";

export const Footer = () => {
  return (
    <footer className="bg-[#1A1F2C] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* About Us Section */}
          <div className="md:col-span-7">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 mr-3">
                <img src="/images/seaview-logo-394x394.png" alt="Seaview icon" className="w-full" />
              </div>
              <h3 className="text-lg font-medium">About Us</h3>
            </div>
            
            <p className="text-gray-400 mb-4">
              In crafting our retreat, we were guided by tour deepest convictions: infusing{" "}
              <span className="text-[#86efac]">sustainability</span> with{" "}
              <span className="text-[#86efac]">modern luxury</span>, and embracing Sifnos unique{" "}
              <span className="text-[#86efac]">tradition</span>.
            </p>
            
            <p className="text-gray-400 mb-8">
              Our approach has been one of reverence and responsibility – to both the
              environment and the rich heritage of the island. Here, each element, from eco-
              conscious amenities to the harmony of our native gardens with traditional
              architecture, tells a story of thoughtful integration. It's a place where luxury
              transcends comfort, becoming a sustainable, authentic experience deeply rooted in
              the soul of Sifnos.
            </p>

            <div className="mb-8">
              <img src="/images/travel_proud.png" alt="Travel Proud" className="h-10" />
            </div>

            <p className="text-gray-400">
              We welcome guests of all backgrounds and identities, ensuring a safe and inclusive
              space for everyone.
            </p>
          </div>

          {/* Contact and Booking Section */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-medium mb-6">Contact Info</h3>
            
            <ul className="space-y-5 mb-10">
              <li className="flex items-center">
                <MapPin className="mr-3 h-5 w-5" />
                <span className="text-gray-300">{contactConfig.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5" />
                <a href={`tel:${contactConfig.phoneClean}`} className="text-gray-300 hover:text-white transition-colors">
                  {contactConfig.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5" />
                <a href={`mailto:${contactConfig.email}`} className="text-gray-300 hover:text-white transition-colors">
		  {contactConfig.email}
                </a>
              </li>
            </ul>

            <h3 className="text-lg font-medium mb-6">Reserve Your Stay...</h3>
            
            <div className="flex items-center space-x-8">
              <a href={`${contactConfig.airbnbUrl}`} target="_blank" rel="noopener noreferrer">
                <AirbnbIcon className="h-10 w-auto text-white" />
              </a>
              <a href={`${contactConfig.bookingUrl}`} target="_blank" rel="noopener noreferrer">
                <BookingIcon className="h-10 w-auto text-white" />
              </a>
              <a href={`${contactConfig.homeexchangeUrl}`} target="_blank" rel="noopener noreferrer">
                <img src="/images/amenities/homeexchangelogo.svg" alt="HomeExchange" className="h-10 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 
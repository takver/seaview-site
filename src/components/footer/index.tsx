import React from 'react';
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import AirbnbIcon from "../icons/AirbnbIcon";
import BookingIcon from "../icons/BookingIcon";
import contactConfig from '../../config/contactConfig.json';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const emailLink = `mailto:${contactConfig.email}`;
  const phoneLink = `tel:${contactConfig.phone}`;

  return (
    <footer className="bg-[#1A1F2C] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-light mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a
                href={emailLink}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={18} />
                {contactConfig.email}
              </a>
              <a
                href={phoneLink}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Phone size={18} />
                {contactConfig.phone}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-light mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#booking-section" className="text-gray-300 hover:text-white transition-colors">
                  Book Now
                </a>
              </li>
              <li>
                <a href="#location" className="text-gray-300 hover:text-white transition-colors">
                  Location
                </a>
              </li>
            </ul>
          </div>

          {/* Booking Platforms */}
          <div>
            <h3 className="text-xl font-light mb-4">Book Through</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={contactConfig.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Airbnb
                </a>
              </li>
              <li>
                <a
                  href={contactConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Booking.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} Seaview Villa Sifnos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
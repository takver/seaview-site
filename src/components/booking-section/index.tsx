// @ts-nocheck
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import AirbnbIcon from "../icons/AirbnbIcon";
import BookingIcon from "../icons/BookingIcon";
import { Mail, Phone } from "lucide-react";
import AvailabilityCalendar from "../AvailabilityCalendar";

export const BookingSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3.5xl font-light text-center mb-12 text-[#1A1F2C]">
          Book Your Stay<span className="text-[#6E59A5]">...</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Card - Booking Options */}
          <Card className="overflow-hidden shadow-lg border-2 border-gray-300" style={{ borderRadius: "0.75rem" }}>
            <div className="overflow-hidden" style={{ borderTopLeftRadius: "0.65rem", borderTopRightRadius: "0.65rem" }}>
              <div className="relative h-[380px]">
                <img 
                  src="/images/exterior-garden-steps-shaded-path.webp" 
                  alt="Sifnos Villa Garden Steps" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 font-light mb-2">
                  Click the icons to reserve on Airbnb or Booking.com
                </p>
                <div className="flex gap-4 mb-4">
                  <a
                    href="https://www.airbnb.com/rooms/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button 
                      variant="transparentRounded"
                      className="group border-2 border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white"
                      size="pill"
                    >
                      <AirbnbIcon className="text-[#FF5A5F] group-hover:text-white !fill-current" size={20} />
                      <span>Airbnb</span>
                    </Button>
                  </a>
                  <a
                    href="https://www.booking.com/hotel/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button 
                      variant="transparentRounded"
                      className="group border-2 border-[#003580] text-[#003580] hover:bg-[#003580] hover:text-white"
                      size="pill"
                    >
                      <BookingIcon className="text-[#003580] group-hover:text-white !fill-current" size={20} />
                      <span>Booking.com</span>
                    </Button>
                  </a>
                </div>
                <p className="text-gray-600 font-light text-sm">
                  HomeExchange is also available off-season (October to April)
                </p>
                <a
                  href="https://www.homeexchange.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2"
                >
                  <Button 
                    variant="transparentRounded"
                    className="group border-2 border-[#F69E00] text-[#F69E00] hover:bg-[#F69E00] hover:text-white"
                    size="pill"
                  >
                    <div className="relative w-5 h-5 mr-2 flex items-center justify-center">
                      <img 
                        src="/images/homeexchangelogo.svg" 
                        alt="HomeExchange" 
                        className="w-full h-full object-contain brightness-0 group-hover:brightness-100 group-hover:invert" 
                      />
                    </div>
                    <span>HomeExchange</span>
                  </Button>
                </a>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-lg font-normal text-[#6E59A5] mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-[#6E59A5]" />
                    <a 
                      href="mailto:info@sifnos-seaview.com" 
                      className="text-gray-600 hover:text-[#6E59A5] transition-colors"
                    >
                      info@sifnos-seaview.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-[#6E59A5]" />
                    <a 
                      href="tel:+3012345678" 
                      className="text-gray-600 hover:text-[#6E59A5] transition-colors"
                    >
                      +30 12345 67890
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 italic mt-4">
                Your privacy is important to us. We'll only use your contact information to respond to your inquiries and manage your reservation.
              </div>
            </CardContent>
          </Card>
          
          {/* Right Card - Availability Calendar */}
          <Card className="overflow-hidden shadow-lg border-2 border-gray-300" style={{ borderRadius: "0.75rem" }}>
            <CardContent className="p-6">
              <h3 className="text-lg font-normal text-[#6E59A5] mb-3">Check Villa Availability</h3>
              <p className="text-gray-600 font-light mb-4">
                The purple bars indicate periods that are already booked. Days without a bar are currently available.
              </p>
              <AvailabilityCalendar />
              <div className="mt-4 text-sm text-gray-500">
                <p>Calendar data refreshes automatically every minute. Last updated at: {new Date().toLocaleTimeString()}</p>
                <p className="mt-1">To book specific dates, please use one of our booking platforms listed on the left.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}; 
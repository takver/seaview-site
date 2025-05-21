// @ts-nocheck
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import AirbnbIcon from "../icons/AirbnbIcon";
import BookingIcon from "../icons/BookingIcon";
import { Mail, Phone } from "lucide-react";
import AvailabilityCalendar from "../AvailabilityCalendar";
import { useIsMobile } from "@/hooks/use-mobile";
import contactConfig from "../../config/contactConfig.json";

export const BookingSection = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState<"platforms" | "calendar">("platforms");

  // For Email Button
  const emailLink = `mailto:${contactConfig.email}${contactConfig.emailLinkParams}`;
  
  // For Phone Button  
  const phoneLink = `tel:${contactConfig.phoneClean}`;

  return (
    <section id="booking-section" className="py-10 bg-white">
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
                    className="group bg-gray-100 border-2 border-[#F69E00] text-[#F69E00] hover:bg-[#F69E00] hover:text-white hover:border-[#F69E00] px-4 py-2 rounded-full flex items-center justify-center transition-colors duration-200 ease-in-out"
                  >
                    <div className="relative w-5 h-5 mr-2 flex items-center justify-center group-hover:bg-white group-hover:p-0.5 group-hover:rounded-sm transition-all duration-200 ease-in-out">
                      <img 
                        src="/images/homeexchangelogo.svg" 
                        alt="HomeExchange" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">HomeExchange</span>
                  </Button>
                </a>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-lg font-normal text-[#6E59A5] mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-[#6E59A5]" />
                    <a 
                      href={emailLink}
                      className="text-gray-600 hover:text-[#6E59A5] transition-colors"
                    >
                      {contactConfig.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-[#6E59A5]" />
                    <a 
                      href={phoneLink}
                      className="text-gray-600 hover:text-[#6E59A5] transition-colors"
                    >
                      {contactConfig.phone}
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

        {/* Direct contact options */}
        <div className="mt-10 pt-10 border-t border-gray-200">
          <h3 className="text-2xl font-light text-center mb-6 text-[#1A1F2C]">
            Prefer to book directly?
          </h3>
          
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Contact us directly for personalized assistance with your booking, special requests, or any questions you might have about your stay.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a 
              href={emailLink}
              className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-[#6E59A5] hover:bg-gray-50 min-w-[200px] justify-center"
            >
              <Mail size={18} className="text-[#6E59A5]" />
              <span>Email Us</span>
            </a>
            
            <a 
              href={phoneLink}
              className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-[#6E59A5] hover:bg-gray-50 min-w-[200px] justify-center"
            >
              <Phone size={18} className="text-[#6E59A5]" />
              <span>{contactConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 
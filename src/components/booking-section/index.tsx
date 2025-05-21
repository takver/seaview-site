// tslint:disable-next-line:max-line-length
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import AirbnbIcon from "../icons/AirbnbIcon";
import BookingIcon from "../icons/BookingIcon";
import { Mail, Phone, ArrowRight } from "lucide-react";
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
    <section id="booking-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6 text-[#1A1F2C]">
            Ready to Book Your Stay?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience the magic of Sifnos in our beautifully restored traditional house.
            Book directly through our trusted partners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-50 border-[#6E59A5] text-[#6E59A5] hover:text-[#6E59A5]"
              onClick={() => window.open('https://www.airbnb.com/rooms/908766266127651509', '_blank')}
            >
              Book on Airbnb
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-50 border-[#6E59A5] text-[#6E59A5] hover:text-[#6E59A5]"
              onClick={() => window.open('https://www.booking.com/hotel/gr/seaview-villa-sifnos.html', '_blank')}
            >
              Book on Booking.com
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 

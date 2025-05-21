import { Button } from "../ui/button";
import contactConfig from "../../config/contactConfig.json";

export const ContactSection = () => {
  return (
    <section className="py-14 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3.5xl font-light mb-3 text-[#1A1F2C]">
            Contact Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're here to answer any questions you might have about our property. Feel free to reach out to us.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-xl font-normal text-[#6E59A5] text-center mb-4">Contact Information</h3>
          <div className="space-y-3 text-center mb-6">
            <p>
              <strong className="font-normal">Email:</strong> {contactConfig.email}
            </p>
            <p>
              <strong className="font-normal">Phone:</strong> {contactConfig.phone}
            </p>
            <p>
              <strong className="font-normal">Address:</strong> {contactConfig.address}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`mailto:${contactConfig.email}${contactConfig.emailLinkParams}`}
              className="bg-[#6E59A5] text-white px-6 py-3 rounded-full hover:bg-[#5D4A8F] transition-colors duration-300 text-center"
            >
              Contact Now
            </a>
            <a 
              href={contactConfig.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#6E59A5] border border-[#6E59A5] px-6 py-3 rounded-full hover:bg-gray-50 transition-colors duration-300 text-center"
            >
              View Map
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 
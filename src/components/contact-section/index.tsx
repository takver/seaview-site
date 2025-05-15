import { Button } from "../ui/button";

export const ContactSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-[#1A1F2C]">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Have questions about our property or booking? Get in touch with us
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow bg-white p-6 rounded-lg">
            <h3 className="text-xl font-normal text-[#6E59A5] text-center mb-4">Contact Information</h3>
            <div className="space-y-4 text-gray-600 font-light">
              <p>
                <strong className="font-normal">Email:</strong> info@sifnos-seaview.com
              </p>
              <p>
                <strong className="font-normal">Phone:</strong> +30 12345 67890
              </p>
              <p>
                <strong className="font-normal">Address:</strong> Kamares, Sifnos 84003, Greece
              </p>
            </div>
          </div>
          
          <div className="border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow bg-white p-6 rounded-lg">
            <h3 className="text-xl font-normal text-[#6E59A5] text-center mb-4">Send Us a Message</h3>
            <p className="text-gray-600 font-light mb-6 text-center">
              We'll get back to you as soon as possible
            </p>
            <div className="text-center">
              <Button
                variant="rounded"
                size="pill"
              >
                Contact Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
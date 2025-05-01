
import { Button } from "./ui/button";

const ContactSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Have questions about our property or booking? Get in touch with us
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>Email:</strong> info@sifnos-seaview.com
              </p>
              <p>
                <strong>Phone:</strong> +30 12345 67890
              </p>
              <p>
                <strong>Address:</strong> Kamares, Sifnos 84003, Greece
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <p className="text-gray-600 mb-6">
              We'll get back to you as soon as possible
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Contact Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

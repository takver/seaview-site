
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Sifnos Seaview</h3>
            <p className="text-gray-300">
              Experience the beauty of Sifnos from our beautiful property with stunning sea views.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/facilities" className="text-gray-300 hover:text-white">Facilities</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white">Gallery</Link></li>
              <li><Link to="/location" className="text-gray-300 hover:text-white">Location</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Kamares, Sifnos 84003, Greece</li>
              <li>info@sifnos-seaview.com</li>
              <li>+30 12345 67890</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sifnos Seaview. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

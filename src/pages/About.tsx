import React from "react";
import { Header } from "@/components/header";
import Footer from "@/components/footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-6">About Sifnos Seaview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-lg mb-4">
                In crafting our retreat, we were guided by our deepest convictions: infusing{' '}
                <span className="text-green-600">sustainability</span> with{' '}
                <span className="text-gray-700">modern luxury</span>, and embracing Sifnos unique{' '}
                <span className="text-green-600">tradition</span>.
              </p>
              <p className="mb-4">
                Our approach has been one of reverence and responsibility - to both the
                environment and the rich heritage of the island. Here, each element, from eco-
                conscious amenities to the harmony of our native gardens with traditional
                architecture, tells a story of thoughtful integration.
              </p>
              <p className="mb-4">
                It's a place where luxury transcends comfort, becoming a sustainable, authentic 
                experience deeply rooted in the soul of Sifnos.
              </p>
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg">
              <img 
                src="/images/GA1-IMG_0393-E-scaled.webp" 
                alt="Sifnos Seaview Property" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl font-light mb-4">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Sustainability</h3>
              <p>
                We've integrated eco-friendly practices throughout our property, from energy-efficient 
                systems to water conservation and locally sourced materials.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Modern Luxury</h3>
              <p>
                While honoring tradition, we provide all the modern amenities expected in a luxury retreat, 
                ensuring comfort without compromising our environmental values.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Sifnian Tradition</h3>
              <p>
                Our architecture and design pay homage to Sifnos's rich cultural heritage, 
                celebrating the island's unique aesthetic and craftsmanship.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-light mb-4">Our Commitment to Inclusivity</h2>
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="/images/travel_proud.png" 
                alt="Travel Proud" 
                className="h-10"
              />
              <p className="text-lg">
                We welcome guests of all backgrounds and identities, ensuring a safe and inclusive
                space for everyone.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

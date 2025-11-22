import Image from 'next/image';
import { Users, Award, Globe, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about bdsquare's mission to bring premium fashion to everyone. Discover our story, values, and commitment to quality and sustainability.",
  keywords: ["about bdsquare", "our story", "company values", "fashion brand"],
  openGraph: {
    title: "About Us | bdsquare",
    description:
      "Learn about bdsquare's mission to bring premium fashion to everyone.",
    type: "website"
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">ABOUT CLOTHESTORE</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are passionate about bringing you the finest quality clothing and fashion accessories. 
          Our journey began with a simple mission: to make premium fashion accessible to everyone.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2020, ClothesStore emerged from a vision to revolutionize the fashion industry. 
            We believe that everyone deserves access to high-quality, stylish clothing that doesn't 
            compromise on comfort or sustainability.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our team of fashion experts carefully curates each piece in our collection, ensuring 
            that every item meets our strict standards for quality, style, and ethical production. 
            From casual wear to formal attire, we offer a diverse range of clothing that caters to 
            every lifestyle and occasion.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we're proud to serve customers worldwide, delivering premium fashion directly 
            to their doorsteps while maintaining our commitment to sustainability and ethical practices.
          </p>
        </div>
        <div className="relative aspect-square">
          <Image
            src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"
            alt="Our Story"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on quality. Every product is carefully selected and tested 
              to ensure it meets our high standards.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Customer Love</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We strive to exceed 
              expectations with every interaction.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-gray-600">
              We're committed to sustainable practices and ethical sourcing to protect 
              our planet for future generations.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-600">
              We believe in building a community of fashion lovers who share our passion 
              for style and quality.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"
                alt="CEO"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
            <p className="text-red-600 font-medium mb-2">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              With over 15 years in fashion retail, Sarah leads our vision of making 
              premium fashion accessible to all.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src="https://images.pexels.com/photos/1040949/pexels-photo-1040949.jpeg"
                alt="Creative Director"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
            <p className="text-red-600 font-medium mb-2">Creative Director</p>
            <p className="text-gray-600 text-sm">
              Michael brings his expertise in fashion design and trend forecasting 
              to curate our unique collections.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src="https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg"
                alt="Head of Operations"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Emily Rodriguez</h3>
            <p className="text-red-600 font-medium mb-2">Head of Operations</p>
            <p className="text-gray-600 text-sm">
              Emily ensures our operations run smoothly and our customers receive 
              the best possible service.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
              <p className="text-gray-600">Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">25+</div>
              <p className="text-gray-600">Countries</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">4.8</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
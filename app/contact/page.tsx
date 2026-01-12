import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with bdsquare. Contact us for questions, support, or feedback. We're here to help with your fashion needs.",
  keywords: ["contact bdsquare", "customer support", "help", "get in touch"],
  openGraph: {
    title: "Contact Us | bdsquare",
    description:
      "Get in touch with bdsquare. Contact us for questions, support, or feedback.",
    type: "website"
  }
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">CONTACT US</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're here to help! Get in touch with us for any questions, concerns,
          or feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-700 mb-8">
              Have a question about your order, need styling advice, or want to
              learn more about our products? We'd love to hear from you!
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Visit Our Store</h3>
                <p className="text-gray-700">
                  123 Fashion Street
                  <br />
                  Style City, SC 12345
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 text-white">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-700">
                  Customer Service: +1 (555) 123-4567
                  <br />
                  Orders & Returns: +1 (555) 123-4568
                  <br />
                  Wholesale: +1 (555) 123-4569
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 text-white">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-700">
                  General: info@clothestore.com
                  <br />
                  Support: support@clothestore.com
                  <br />
                  Press: press@clothestore.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 text-white">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 8:00 PM
                  <br />
                  Saturday: 10:00 AM - 6:00 PM
                  <br />
                  Sunday: 12:00 PM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Subject *
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                required>
                <option value="">Select a subject</option>
                <option value="order">Order Inquiry</option>
                <option value="product">Product Question</option>
                <option value="return">Return/Exchange</option>
                <option value="complaint">Complaint</option>
                <option value="compliment">Compliment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none resize-none"
                placeholder="Please provide as much detail as possible..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 px-6 font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
              <Send className="h-5 w-5" />
              <span>SEND MESSAGE</span>
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Quick Links */}
      <div className="mt-16 bg-black text-white p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Need Quick Answers?</h2>
          <p className="text-gray-300">
            Check out our frequently asked questions for instant help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Shipping & Delivery</h3>
            <p className="text-gray-300 text-sm mb-4">
              Questions about shipping times, costs, and tracking.
            </p>
            <a
              href="/shipping"
              className="text-red-400 hover:text-red-300 font-semibold">
              Learn More →
            </a>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-2">Returns & Exchanges</h3>
            <p className="text-gray-300 text-sm mb-4">
              Information about our return and exchange policy.
            </p>
            <a
              href="/returns"
              className="text-red-400 hover:text-red-300 font-semibold">
              Learn More →
            </a>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-2">Size Guide</h3>
            <p className="text-gray-300 text-sm mb-4">
              Find the perfect fit with our sizing charts.
            </p>
            <a
              href="/size-guide"
              className="text-red-400 hover:text-red-300 font-semibold">
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

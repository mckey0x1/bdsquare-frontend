"use client";

import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  FileText,
  Users,
  Headphones,
  Send,
  CheckCircle,
} from "lucide-react";

export default function SupportPage() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: "",
    priority: "normal",
  });

  const supportTopics = [
    { id: "order", label: "Order Issues", icon: FileText },
    { id: "product", label: "Product Questions", icon: HelpCircle },
    { id: "return", label: "Returns & Exchanges", icon: MessageCircle },
    { id: "shipping", label: "Shipping & Delivery", icon: Phone },
    { id: "account", label: "Account Help", icon: Users },
    { id: "technical", label: "Technical Issues", icon: Headphones },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Support ticket submitted successfully!");
    setFormData({
      name: "",
      email: "",
      orderNumber: "",
      subject: "",
      message: "",
      priority: "normal",
    });
    setSelectedTopic("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          CUSTOMER SUPPORT
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're here to help! Choose how you'd like to get support and we'll get
          you the answers you need.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Support Options */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Contact Options</h2>

          <div className="space-y-4">
            {/* Live Chat */}
            <div className="border-2 border-gray-200 p-6 hover:border-red-600 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-600 p-2 text-white">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <span className="text-sm text-green-600 font-medium">
                    ● Online Now
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Get instant help from our support team. Average response time: 2
                minutes.
              </p>
              <button className="w-full bg-green-600 text-white py-2 px-4 hover:bg-green-700 transition-colors">
                Start Live Chat
              </button>
            </div>

            {/* Phone Support */}
            <div className="border-2 border-gray-200 p-6 hover:border-red-600 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-600 p-2 text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone Support</h3>
                  <span className="text-sm text-gray-600">
                    Mon-Fri 9AM-8PM EST
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Speak directly with our customer service representatives.
              </p>
              <a
                href="tel:+15551234567"
                className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 transition-colors block text-center">
                Call +1 (555) 123-4567
              </a>
            </div>

            {/* Email Support */}
            <div className="border-2 border-gray-200 p-6 hover:border-red-600 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-red-600 p-2 text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <span className="text-sm text-gray-600">
                    Response within 24 hours
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Send us a detailed message and we'll get back to you soon.
              </p>
              <a
                href="mailto:support@clothestore.com"
                className="w-full bg-red-600 text-white py-2 px-4 hover:bg-red-700 transition-colors block text-center">
                Email Us
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-8 bg-gray-50 p-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-600" />
              <span>Support Hours</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 8:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>12:00 PM - 5:00 PM EST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Submit a Support Ticket</h2>

            {/* Topic Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">What can we help you with?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {supportTopics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-4 border-2 text-center transition-colors ${
                        selectedTopic === topic.id
                          ? "border-red-600 bg-red-50 text-red-600"
                          : "border-gray-300 hover:border-red-600"
                      }`}>
                      <Icon className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{topic.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Support Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Order Number (if applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, orderNumber: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                    placeholder="ORD-2024-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none">
                    <option value="low">Low - General inquiry</option>
                    <option value="normal">Normal - Standard support</option>
                    <option value="high">High - Urgent issue</option>
                    <option value="critical">Critical - Order problem</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none resize-none"
                  placeholder="Please provide as much detail as possible about your issue..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 px-6 font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                <Send className="h-5 w-5" />
                <span>SUBMIT SUPPORT TICKET</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Quick Help</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 border-2 border-gray-200 hover:border-red-600 transition-colors">
            <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Track Your Order</h3>
            <p className="text-gray-600 text-sm mb-4">
              Check the status of your recent orders
            </p>
            <a
              href="/profile"
              className="text-red-600 hover:text-red-800 font-semibold">
              Track Order →
            </a>
          </div>

          <div className="text-center p-6 border-2 border-gray-200 hover:border-red-600 transition-colors">
            <HelpCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">FAQ</h3>
            <p className="text-gray-600 text-sm mb-4">
              Find answers to common questions
            </p>
            <a
              href="/faq"
              className="text-red-600 hover:text-red-800 font-semibold">
              View FAQ →
            </a>
          </div>

          <div className="text-center p-6 border-2 border-gray-200 hover:border-red-600 transition-colors">
            <MessageCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Returns</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn about our return policy
            </p>
            <a
              href="/returns"
              className="text-red-600 hover:text-red-800 font-semibold">
              Return Policy →
            </a>
          </div>

          <div className="text-center p-6 border-2 border-gray-200 hover:border-red-600 transition-colors">
            <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Size Guide</h3>
            <p className="text-gray-600 text-sm mb-4">Find your perfect fit</p>
            <a
              href="/size-guide"
              className="text-red-600 hover:text-red-800 font-semibold">
              Size Guide →
            </a>
          </div>
        </div>
      </div>

      {/* Satisfaction Guarantee */}
      <div className="mt-16 bg-red-600 text-white p-8 text-center">
        <CheckCircle className="h-16 w-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">100% Satisfaction Guarantee</h2>
        <p className="text-lg mb-6">
          We're committed to providing exceptional customer service. If you're
          not completely satisfied with our support, we'll make it right.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold mb-2">Fast Response</h3>
            <p className="text-red-100">Average response time under 2 hours</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Expert Help</h3>
            <p className="text-red-100">Knowledgeable support specialists</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Follow-up</h3>
            <p className="text-red-100">
              We ensure your issue is fully resolved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

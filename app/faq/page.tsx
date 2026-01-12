"use client"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    category: "Orders & Payment",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "Simply browse our products, select your desired items, choose size and color, add to cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your order.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and buy now, pay later options like Klarna and Afterpay.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 1 hour of placing it by contacting our customer service. After this time, orders enter processing and cannot be changed.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes! We partner with Klarna and Afterpay to offer flexible payment options. You can split your purchase into 4 interest-free payments or choose longer-term financing options.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely! We use SSL encryption and are PCI DSS compliant. We never store your complete credit card information on our servers.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        question: "How much does shipping cost?",
        answer:
          "Standard shipping is $9.99, but it's FREE on orders over $50. Express shipping is $19.99 and overnight shipping is $39.99. International shipping costs vary by destination.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and overnight shipping delivers the next business day. International orders take 7-21 business days.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes! We ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. Customs duties and taxes may apply.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account and viewing your order history.",
      },
      {
        question: "What if my package is lost or damaged?",
        answer:
          "All packages are insured. If your package is lost or arrives damaged, contact us immediately with your order number and photos (if damaged). We'll resolve the issue quickly.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy. Items must be in original condition with tags attached, unworn and unwashed. Some items like underwear and personalized products cannot be returned.",
      },
      {
        question: "How do I return an item?",
        answer:
          "Log into your account, go to order history, and select 'Return Items'. You can also email returns@clothestore.com. We'll provide a prepaid return label for US orders.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Refunds are processed within 5-7 business days after we receive your return. The time to appear in your account depends on your payment method: credit cards 3-5 days, debit cards 5-7 days.",
      },
      {
        question: "Can I exchange items for a different size or color?",
        answer:
          "Yes! We offer free exchanges for different sizes or colors of the same item, subject to availability. The process takes 3-5 business days.",
      },
      {
        question: "What if I received the wrong item?",
        answer:
          "If you received the wrong item, contact us immediately. We'll send you the correct item and provide a prepaid return label for the incorrect one at no cost to you.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        question: "How do I find the right size?",
        answer:
          "Check our detailed size guide available on each product page. We provide measurements for chest, waist, hips, and length. When in doubt, size up or contact us for personalized advice.",
      },
      {
        question: "Are your products true to size?",
        answer:
          "Our products generally run true to size, but fit can vary by style and brand. Always check the size guide and read customer reviews for fit feedback.",
      },
      {
        question: "What materials are your clothes made from?",
        answer:
          "We use a variety of high-quality materials including cotton, polyester, wool, silk, and blends. Material information is listed on each product page under 'Product Details'.",
      },
      {
        question: "How should I care for my clothes?",
        answer:
          "Care instructions are provided on the product page and on the garment's care label. Generally, we recommend washing in cold water and air drying to maintain quality and fit.",
      },
      {
        question: "Do you restock sold-out items?",
        answer:
          "We regularly restock popular items, but availability varies. Sign up for restock notifications on the product page, or contact us to inquire about specific items.",
      },
    ],
  },
  {
    category: "Account & Membership",
    questions: [
      {
        question: "Do I need an account to shop?",
        answer:
          "No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, store addresses, and access exclusive member benefits.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' at the top of any page, or you'll be prompted during checkout. You can also sign up using your Google or Facebook account for convenience.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer:
          "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a reset link. Check your spam folder if you don't see the email within a few minutes.",
      },
      {
        question: "How do I update my account information?",
        answer:
          "Log into your account and go to 'Account Settings' or 'Profile' to update your personal information, addresses, and preferences.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, you can delete your account by contacting customer service. Please note that this action is permanent and cannot be undone.",
      },
    ],
  },
  {
    category: "Promotions & Discounts",
    questions: [
      {
        question: "How do I use a promo code?",
        answer:
          "Enter your promo code in the 'Discount Code' field during checkout and click 'Apply'. The discount will be reflected in your order total before you complete the purchase.",
      },
      {
        question: "Can I use multiple promo codes?",
        answer:
          "Generally, only one promo code can be used per order. However, some automatic discounts (like free shipping) may combine with promo codes.",
      },
      {
        question: "Do you offer student discounts?",
        answer:
          "Yes! We offer a 15% student discount. Verify your student status through our partner SheerID to receive your discount code.",
      },
      {
        question: "How do I sign up for your newsletter?",
        answer:
          "Enter your email address in the newsletter signup box at the bottom of any page. Subscribers get exclusive access to sales, new arrivals, and special offers.",
      },
      {
        question: "Do you have a loyalty program?",
        answer:
          "Yes! Our VIP program offers points for purchases, early access to sales, birthday discounts, and exclusive perks. Join automatically when you create an account.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQ = faqData.filter((category) => {
    if (selectedCategory !== "All" && category.category !== selectedCategory) {
      return false;
    }

    if (searchTerm) {
      return category.questions.some(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return true;
  });

  const categories = ["All", ...faqData.map((cat) => cat.category)];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about shopping with ClothesStore
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 border-2 border-gray-300 focus:border-red-600 outline-none text-lg"
        />
        <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 border-2 transition-colors ${
                selectedCategory === category
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-gray-300 hover:border-red-600"
              }`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="space-y-8">
        {filteredFAQ.map((category) => (
          <div key={category.category}>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-red-600" />
              <span>{category.category}</span>
            </h2>

            <div className="space-y-4">
              {category.questions
                .filter(
                  (q) =>
                    !searchTerm ||
                    q.question
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((faq, index) => {
                  const itemId = `${category.category}-${index}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div key={itemId} className="border-2 border-gray-200">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-lg">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-red-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-red-600" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {filteredFAQ.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No questions found matching your search.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 bg-red-600 text-white px-6 py-2 hover:bg-red-700 transition-colors">
            Clear Search
          </button>
        </div>
      )}

      {/* Contact Section */}
      <div className="mt-16 bg-gray-50 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-gray-700 mb-6">
          Can't find the answer you're looking for? Our customer service team is
          here to help!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-3">
              Available 24/7 for instant help
            </p>
            <button className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
              Start Chat
            </button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-3">
              Get detailed help via email
            </p>
            <a
              href="mailto:support@clothestore.com"
              className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors inline-block">
              Send Email
            </a>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm mb-3">
              Speak with our team directly
            </p>
            <a
              href="tel:+15551234567"
              className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors inline-block">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

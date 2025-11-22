import {
  RefreshCw,
  Package,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description:
    "Learn about bdsquare's return and exchange policy. Easy returns within 30 days. Free return shipping on eligible items.",
  keywords: ["returns", "exchanges", "return policy", "refund", "bdsquare returns"],
  openGraph: {
    title: "Returns & Exchanges | bdsquare",
    description:
      "Learn about bdsquare's return and exchange policy. Easy returns within 30 days.",
    type: "website"
  }
};

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Returns & Exchanges</h1>
      <p className="text-gray-600 mb-8">
        We want you to love your purchase! Here's everything you need to know
        about our return and exchange policy.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 text-red-600" />
            <span>Return Policy Overview</span>
          </h2>
          <div className="bg-green-50 border border-green-200 p-6 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">
                30-Day Return Window
              </span>
            </div>
            <p className="text-green-700">
              You have 30 days from the date of delivery to return items for a
              full refund or exchange.
            </p>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              We stand behind the quality of our products and want you to be
              completely satisfied with your purchase. If for any reason you're
              not happy with your order, we offer hassle-free returns and
              exchanges.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Return Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-green-200 p-6 bg-green-50">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                ✓ Eligible for Return
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• Items in original condition</li>
                <li>• Tags and labels attached</li>
                <li>• Unworn and unwashed</li>
                <li>• Original packaging included</li>
                <li>• Within 30 days of delivery</li>
                <li>• Receipt or order confirmation</li>
              </ul>
            </div>

            <div className="border-2 border-red-200 p-6 bg-red-50">
              <h3 className="text-lg font-semibold mb-3 text-red-800">
                ✗ Not Eligible for Return
              </h3>
              <ul className="space-y-2 text-red-700">
                <li>• Personalized or custom items</li>
                <li>• Items worn or washed</li>
                <li>• Items without tags</li>
                <li>• Sale items (final sale)</li>
                <li>• Gift cards</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Package className="h-6 w-6 text-red-600" />
            <span>How to Return Items</span>
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-lg font-semibold mb-2">
                Step 1: Initiate Your Return
              </h3>
              <p className="text-gray-700">
                Log into your account and go to "Order History" or email us at
                returns@clothestore.com with your order number to request a
                return authorization.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-lg font-semibold mb-2">
                Step 2: Package Your Items
              </h3>
              <p className="text-gray-700">
                Pack items securely in original packaging with all tags
                attached. Include the return authorization form we'll send you.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-lg font-semibold mb-2">
                Step 3: Ship Your Return
              </h3>
              <p className="text-gray-700">
                Use the prepaid return label we provide or ship to our returns
                center. We recommend using a trackable shipping method.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-lg font-semibold mb-2">Step 4: Processing</h3>
              <p className="text-gray-700">
                Once we receive your return, we'll inspect the items and process
                your refund or exchange within 5-7 business days.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-red-600" />
            <span>Refunds</span>
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Refunds will be processed to your original payment method within
              5-7 business days after we receive and inspect your returned
              items.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Refund Timeline
              </h3>
              <ul className="space-y-1 text-blue-700">
                <li>• Credit Cards: 3-5 business days</li>
                <li>• Debit Cards: 5-7 business days</li>
                <li>• PayPal: 1-2 business days</li>
                <li>• Store Credit: Immediate</li>
              </ul>
            </div>

            <p>
              <strong>Note:</strong> Original shipping costs are non-refundable
              unless the return is due to our error (wrong item sent, defective
              product, etc.).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              We offer free exchanges for different sizes or colors of the same
              item, subject to availability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-3">Size Exchange</h3>
                <p className="text-gray-700 mb-3">
                  Need a different size? We'll send you the new size and provide
                  a return label for the original item.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Processing Time:</strong> 3-5 business days
                </p>
              </div>

              <div className="border-2 border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-3">Color Exchange</h3>
                <p className="text-gray-700 mb-3">
                  Want a different color? We'll exchange it for you at no
                  additional cost, subject to availability.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Processing Time:</strong> 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Clock className="h-6 w-6 text-red-600" />
            <span>Return Shipping</span>
          </h2>
          <div className="space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold">Free Return Shipping</h3>
            <p>
              We provide free return shipping labels for all returns within the
              United States. Simply print the label and attach it to your
              package.
            </p>

            <h3 className="text-lg font-semibold">International Returns</h3>
            <p>
              International customers are responsible for return shipping costs.
              We recommend using a trackable shipping method and purchasing
              insurance for valuable items.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">
                  Return Address
                </span>
              </div>
              <div className="text-yellow-700">
                <p>ClothesStore Returns Center</p>
                <p>456 Warehouse Drive</p>
                <p>Distribution City, DC 67890</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Damaged or Defective Items
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              If you receive a damaged or defective item, please contact us
              immediately at support@clothestore.com with photos of the issue
              and your order number.
            </p>

            <div className="bg-red-50 border border-red-200 p-4">
              <h3 className="font-semibold text-red-800 mb-2">
                We'll Make It Right
              </h3>
              <ul className="space-y-1 text-red-700">
                <li>• Free replacement or full refund</li>
                <li>• Prepaid return shipping label</li>
                <li>• Priority processing (1-2 business days)</li>
                <li>• No questions asked policy</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-semibold mb-2">Can I return sale items?</h3>
              <p className="text-gray-700">
                Items marked as "Final Sale" cannot be returned. Regular sale
                items can be returned within our standard 30-day policy.
              </p>
            </div>

            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-semibold mb-2">What if I lost my receipt?</h3>
              <p className="text-gray-700">
                No problem! We can look up your order using your email address
                or phone number associated with the purchase.
              </p>
            </div>

            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-semibold mb-2">
                Can I return items purchased with a gift card?
              </h3>
              <p className="text-gray-700">
                Yes, but the refund will be issued as store credit or a new gift
                card.
              </p>
            </div>

            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-semibold mb-2">
                How long do exchanges take?
              </h3>
              <p className="text-gray-700">
                Exchanges typically take 5-7 business days from when we receive
                your return. We'll send you tracking information once the new
                item ships.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6">
          <h2 className="text-2xl font-bold mb-4">
            Need Help with Your Return?
          </h2>
          <p className="text-gray-700 mb-4">
            Our customer service team is here to help make your return process
            as smooth as possible.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> returns@clothestore.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4568
            </p>
            <p>
              <strong>Hours:</strong> Monday - Friday, 9:00 AM - 8:00 PM EST
            </p>
            <p>
              <strong>Live Chat:</strong> Available on our website during
              business hours
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

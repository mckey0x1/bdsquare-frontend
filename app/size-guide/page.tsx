import { Ruler, User, Users, Baby } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Find your perfect fit with bdsquare's comprehensive size guide. Measurement charts for men, women, and kids clothing.",
  keywords: ["size guide", "sizing chart", "measurements", "fit guide", "clothing sizes"],
  openGraph: {
    title: "Size Guide | bdsquare",
    description:
      "Find your perfect fit with bdsquare's comprehensive size guide.",
    type: "website"
  }
};

export default function SizeGuidePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Size Guide</h1>
        <p className="text-xl text-gray-600">
          Find your perfect fit with our comprehensive sizing charts and
          measurement guide.
        </p>
      </div>

      <div className="space-y-12">
        {/* How to Measure */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Ruler className="h-6 w-6 text-red-600" />
            <span>How to Measure</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Measurement Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Use a soft measuring tape</li>
                <li>• Measure over undergarments or fitted clothing</li>
                <li>• Keep the tape snug but not tight</li>
                <li>• Stand straight with arms at your sides</li>
                <li>• Have someone help you for accuracy</li>
                <li>• Measure in inches for best results</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Measurements</h3>
              <div className="space-y-3">
                <div>
                  <strong>Chest/Bust:</strong> Measure around the fullest part
                  of your chest
                </div>
                <div>
                  <strong>Waist:</strong> Measure around your natural waistline
                </div>
                <div>
                  <strong>Hips:</strong> Measure around the fullest part of your
                  hips
                </div>
                <div>
                  <strong>Inseam:</strong> Measure from crotch to ankle
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Women's Sizes */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <User className="h-6 w-6 text-red-600" />
            <span>Women's Sizes</span>
          </h2>

          <div className="space-y-8">
            {/* Women's Tops */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Tops & Dresses</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Bust (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Waist (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Hips (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XS
                      </td>
                      <td className="border border-gray-300 p-3">30-32</td>
                      <td className="border border-gray-300 p-3">24-26</td>
                      <td className="border border-gray-300 p-3">34-36</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        S
                      </td>
                      <td className="border border-gray-300 p-3">32-34</td>
                      <td className="border border-gray-300 p-3">26-28</td>
                      <td className="border border-gray-300 p-3">36-38</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        M
                      </td>
                      <td className="border border-gray-300 p-3">34-36</td>
                      <td className="border border-gray-300 p-3">28-30</td>
                      <td className="border border-gray-300 p-3">38-40</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        L
                      </td>
                      <td className="border border-gray-300 p-3">36-38</td>
                      <td className="border border-gray-300 p-3">30-32</td>
                      <td className="border border-gray-300 p-3">40-42</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XL
                      </td>
                      <td className="border border-gray-300 p-3">38-40</td>
                      <td className="border border-gray-300 p-3">32-34</td>
                      <td className="border border-gray-300 p-3">42-44</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XXL
                      </td>
                      <td className="border border-gray-300 p-3">40-42</td>
                      <td className="border border-gray-300 p-3">34-36</td>
                      <td className="border border-gray-300 p-3">44-46</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Women's Bottoms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Bottoms</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Waist (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Hips (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Inseam (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XS
                      </td>
                      <td className="border border-gray-300 p-3">24-26</td>
                      <td className="border border-gray-300 p-3">34-36</td>
                      <td className="border border-gray-300 p-3">30</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        S
                      </td>
                      <td className="border border-gray-300 p-3">26-28</td>
                      <td className="border border-gray-300 p-3">36-38</td>
                      <td className="border border-gray-300 p-3">30</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        M
                      </td>
                      <td className="border border-gray-300 p-3">28-30</td>
                      <td className="border border-gray-300 p-3">38-40</td>
                      <td className="border border-gray-300 p-3">32</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        L
                      </td>
                      <td className="border border-gray-300 p-3">30-32</td>
                      <td className="border border-gray-300 p-3">40-42</td>
                      <td className="border border-gray-300 p-3">32</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XL
                      </td>
                      <td className="border border-gray-300 p-3">32-34</td>
                      <td className="border border-gray-300 p-3">42-44</td>
                      <td className="border border-gray-300 p-3">32</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XXL
                      </td>
                      <td className="border border-gray-300 p-3">34-36</td>
                      <td className="border border-gray-300 p-3">44-46</td>
                      <td className="border border-gray-300 p-3">32</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Men's Sizes */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Users className="h-6 w-6 text-red-600" />
            <span>Men's Sizes</span>
          </h2>

          <div className="space-y-8">
            {/* Men's Tops */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Shirts & Tops</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Chest (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Waist (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Neck (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XS
                      </td>
                      <td className="border border-gray-300 p-3">32-34</td>
                      <td className="border border-gray-300 p-3">26-28</td>
                      <td className="border border-gray-300 p-3">13.5-14</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        S
                      </td>
                      <td className="border border-gray-300 p-3">34-36</td>
                      <td className="border border-gray-300 p-3">28-30</td>
                      <td className="border border-gray-300 p-3">14-14.5</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        M
                      </td>
                      <td className="border border-gray-300 p-3">36-38</td>
                      <td className="border border-gray-300 p-3">30-32</td>
                      <td className="border border-gray-300 p-3">14.5-15</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        L
                      </td>
                      <td className="border border-gray-300 p-3">38-40</td>
                      <td className="border border-gray-300 p-3">32-34</td>
                      <td className="border border-gray-300 p-3">15-15.5</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XL
                      </td>
                      <td className="border border-gray-300 p-3">40-42</td>
                      <td className="border border-gray-300 p-3">34-36</td>
                      <td className="border border-gray-300 p-3">15.5-16</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        XXL
                      </td>
                      <td className="border border-gray-300 p-3">42-44</td>
                      <td className="border border-gray-300 p-3">36-38</td>
                      <td className="border border-gray-300 p-3">16-16.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Men's Bottoms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Pants & Jeans</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        Waist Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Waist (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Hip (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Inseam Options
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        28
                      </td>
                      <td className="border border-gray-300 p-3">28</td>
                      <td className="border border-gray-300 p-3">36</td>
                      <td className="border border-gray-300 p-3">30, 32, 34</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        30
                      </td>
                      <td className="border border-gray-300 p-3">30</td>
                      <td className="border border-gray-300 p-3">38</td>
                      <td className="border border-gray-300 p-3">30, 32, 34</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        32
                      </td>
                      <td className="border border-gray-300 p-3">32</td>
                      <td className="border border-gray-300 p-3">40</td>
                      <td className="border border-gray-300 p-3">30, 32, 34</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        34
                      </td>
                      <td className="border border-gray-300 p-3">34</td>
                      <td className="border border-gray-300 p-3">42</td>
                      <td className="border border-gray-300 p-3">30, 32, 34</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        36
                      </td>
                      <td className="border border-gray-300 p-3">36</td>
                      <td className="border border-gray-300 p-3">44</td>
                      <td className="border border-gray-300 p-3">30, 32, 34</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        38
                      </td>
                      <td className="border border-gray-300 p-3">38</td>
                      <td className="border border-gray-300 p-3">46</td>
                      <td className="border border-gray-300 p-3">30, 32, 34</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Kids Sizes */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Baby className="h-6 w-6 text-red-600" />
            <span>Kids' Sizes</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Boys */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Boys</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Age
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Height (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Chest (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        4
                      </td>
                      <td className="border border-gray-300 p-3">3-4</td>
                      <td className="border border-gray-300 p-3">39-41</td>
                      <td className="border border-gray-300 p-3">22-23</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        6
                      </td>
                      <td className="border border-gray-300 p-3">5-6</td>
                      <td className="border border-gray-300 p-3">42-45</td>
                      <td className="border border-gray-300 p-3">23-24</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        8
                      </td>
                      <td className="border border-gray-300 p-3">7-8</td>
                      <td className="border border-gray-300 p-3">46-49</td>
                      <td className="border border-gray-300 p-3">24-25</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        10
                      </td>
                      <td className="border border-gray-300 p-3">9-10</td>
                      <td className="border border-gray-300 p-3">50-53</td>
                      <td className="border border-gray-300 p-3">25-26</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        12
                      </td>
                      <td className="border border-gray-300 p-3">11-12</td>
                      <td className="border border-gray-300 p-3">54-57</td>
                      <td className="border border-gray-300 p-3">26-27</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Girls */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Girls</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Age
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Height (inches)
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Chest (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        4
                      </td>
                      <td className="border border-gray-300 p-3">3-4</td>
                      <td className="border border-gray-300 p-3">39-41</td>
                      <td className="border border-gray-300 p-3">21-22</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        6
                      </td>
                      <td className="border border-gray-300 p-3">5-6</td>
                      <td className="border border-gray-300 p-3">42-45</td>
                      <td className="border border-gray-300 p-3">22-23</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        8
                      </td>
                      <td className="border border-gray-300 p-3">7-8</td>
                      <td className="border border-gray-300 p-3">46-49</td>
                      <td className="border border-gray-300 p-3">23-24</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        10
                      </td>
                      <td className="border border-gray-300 p-3">9-10</td>
                      <td className="border border-gray-300 p-3">50-53</td>
                      <td className="border border-gray-300 p-3">24-25</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        12
                      </td>
                      <td className="border border-gray-300 p-3">11-12</td>
                      <td className="border border-gray-300 p-3">54-57</td>
                      <td className="border border-gray-300 p-3">25-26</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Shoe Sizes */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Shoe Sizes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Women's Shoes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Women's Shoes</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        US Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        EU Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Foot Length (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        6
                      </td>
                      <td className="border border-gray-300 p-3">36</td>
                      <td className="border border-gray-300 p-3">9.25</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        7
                      </td>
                      <td className="border border-gray-300 p-3">37</td>
                      <td className="border border-gray-300 p-3">9.5</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        8
                      </td>
                      <td className="border border-gray-300 p-3">38</td>
                      <td className="border border-gray-300 p-3">9.75</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        9
                      </td>
                      <td className="border border-gray-300 p-3">39</td>
                      <td className="border border-gray-300 p-3">10</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        10
                      </td>
                      <td className="border border-gray-300 p-3">40</td>
                      <td className="border border-gray-300 p-3">10.25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Men's Shoes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Men's Shoes</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        US Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        EU Size
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Foot Length (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        8
                      </td>
                      <td className="border border-gray-300 p-3">41</td>
                      <td className="border border-gray-300 p-3">10.25</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        9
                      </td>
                      <td className="border border-gray-300 p-3">42</td>
                      <td className="border border-gray-300 p-3">10.5</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        10
                      </td>
                      <td className="border border-gray-300 p-3">43</td>
                      <td className="border border-gray-300 p-3">10.75</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        11
                      </td>
                      <td className="border border-gray-300 p-3">44</td>
                      <td className="border border-gray-300 p-3">11</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">
                        12
                      </td>
                      <td className="border border-gray-300 p-3">45</td>
                      <td className="border border-gray-300 p-3">11.25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Fit Tips */}
        <section className="bg-gray-50 p-8">
          <h2 className="text-2xl font-bold mb-6">
            Fit Tips & Recommendations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                General Fit Guidelines
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • When between sizes, size up for a more comfortable fit
                </li>
                <li>
                  • Consider the fabric - stretchy materials may fit smaller
                </li>
                <li>• Check the product description for fit notes</li>
                <li>• Read customer reviews for real-world fit feedback</li>
                <li>• Different brands may fit differently</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Still Not Sure?</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our customer service team is here to help you find the perfect
                  fit!
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> sizing@clothestore.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Live Chat:</strong> Available on our website
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  Remember: We offer free exchanges if the size isn't quite
                  right!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

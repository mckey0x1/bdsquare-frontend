"use client";

import { Headphones, RefreshCcw, Truck } from "lucide-react";
import Image from "next/image";

const peopleImages = [
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=300&h=300&fit=crop"
];

export default function ShowcaseSection() {
  return (
    <section className="py-12">
      {/* Top Icons */}
      <div className="flex justify-center gap-12 text-center mb-10 flex-wrap">
        <div className="flex flex-col items-center max-w-[150px]">
          <Headphones className="h-8 w-8 text-black mb-2" />
          <p className="text-sm text-gray-600">Expert Help, When You Need It</p>
        </div>
        <div className="flex flex-col items-center max-w-[180px]">
          <RefreshCcw className="h-8 w-8 text-black mb-2" />
          <p className="text-sm text-gray-600">7 Days Easy Return & Exchange</p>
        </div>
        <div className="flex flex-col items-center max-w-[160px]">
          <Truck className="h-8 w-8 text-black mb-2" />
          <p className="text-sm text-gray-600">Shipping within 24 Hours</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-center text-2xl font-bold mb-8">
        YOU FLAUNT IT, WE BACK IT!
      </h2>

      {/* Images */}
      <div className="flex justify-center gap-6 flex-wrap">
        {peopleImages.map((src, idx) => (
          <div
            key={idx}
            className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src={src}
              alt={`person-${idx}`}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

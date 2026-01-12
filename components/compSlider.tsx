"use client";
import { useEffect, useState } from "react";

const images = [
  {
    id: 1,
    image: "/image/banner2.jpg" // local image
  },
  {
    id: 2,
    image: "/image/banner.jpg" // local image
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
  }
];

export default function AutoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
      {images.map((item, index) => (
        <img
          key={item.id}
          src={item.image}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

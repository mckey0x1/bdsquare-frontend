"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: number;
  image: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/image/banner2.jpg" // Adjust the path as needed
  },
  {
    id: 2,
    image: "/image/banner.jpg"
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

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
      );
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            } ${isTransitioning ? "blur-sm" : "blur-0"}`}>
            <Image
              src={slide.image}
              alt={`Hero slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 transition-all duration-300 ${
                index === currentSlide
                  ? "bg-red-600 scale-125"
                  : "bg-white bg-opacity-70 hover:bg-opacity-100"
              } disabled:cursor-not-allowed`}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20 text-white bg-black bg-opacity-70 px-4 py-2">
        <span className="text-sm font-medium">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-50 z-20">
        <div
          className="h-full bg-red-600 transition-all duration-5000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
            animation: isTransitioning ? "none" : "progress 5s linear"
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: ${(currentSlide / heroSlides.length) * 100}%;
          }
          to {
            width: ${((currentSlide + 1) / heroSlides.length) * 100}%;
          }
        }
      `}</style>
    </section>
  );
}

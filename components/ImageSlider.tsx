"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  productName: string;
  onImageClick?: (src: string) => void;
}

export default function ImageSlider({ images, productName, onImageClick }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goToPrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <div
          key={currentIndex}
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            direction === "right"
              ? "animate-slide-in-right"
              : "animate-slide-in-left"
          }`}>
          <Image
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            onClick={() => onImageClick?.(images[currentIndex])}
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 hover:bg-white transition-all duration-200 z-10 rounded-full shadow-lg hover:scale-110">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 hover:bg-white transition-all duration-200 z-10 rounded-full shadow-lg hover:scale-110">
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative aspect-square border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                index === currentIndex
                  ? "border-red-600 ring-2 ring-red-600/30"
                  : "border-gray-300 hover:border-red-400"
              }`}>
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-in-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalProductSliderProps {
  products: Product[];
}

export default function HorizontalProductSlider({ products }: HorizontalProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  const translateX = -(currentIndex * (100 / itemsPerView));

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border-2 border-gray-300 p-3 hover:border-red-600 hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        disabled={currentIndex >= maxIndex}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border-2 border-gray-300 p-3 hover:border-red-600 hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slider Container */}
      <div className="overflow-hidden mx-16">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <Link href={`/products/${product.id}`} className="group block">
                <div className="bg-white border-2 border-gray-200 hover:border-red-600 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 space-y-1">
                      {product.isNew && (
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold">
                          NEW
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-black text-white px-2 py-1 text-xs font-semibold">
                          SALE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    
                    {/* Pricing */}
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-red-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 transition-colors ${
              index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
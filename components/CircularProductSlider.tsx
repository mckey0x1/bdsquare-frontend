'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface CircularProductSliderProps {
  products: Product[];
}

export default function CircularProductSlider({ products }: CircularProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const getVisibleProducts = () => {
    const visibleProducts = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % products.length;
      visibleProducts.push(products[index]);
    }
    return visibleProducts;
  };

  const visibleProducts = getVisibleProducts();

  return (
    <div className="relative w-full h-64 mb-8 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-80">
          {visibleProducts.map((product, index) => {
            const angle = (index * 72) - 90; // 360/5 = 72 degrees between items
            const radius = 120;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <Link
                key={`${product.id}-${index}`}
                href={`/products/${product.id}`}
                className="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div className="relative w-full h-full border-2 border-red-600 overflow-hidden group">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-xs font-semibold text-white bg-red-600 px-2 py-1 whitespace-nowrap">
                    ${product.price}
                  </p>
                </div>
              </Link>
            );
          })}
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">NEW</span>
          </div>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 transition-colors ${
              index === currentIndex ? 'bg-red-600' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
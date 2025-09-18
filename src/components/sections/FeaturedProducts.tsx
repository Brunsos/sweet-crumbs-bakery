'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const featuredProducts = products.slice(0, 6);

  useEffect(() => {
    if (isAutoPlaying && featuredProducts.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, featuredProducts.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === featuredProducts.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? featuredProducts.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  if (featuredProducts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-amber-900 sm:text-4xl">
              Featured Cookies
            </h2>
            <p className="mt-4 text-lg text-amber-700">
              Our featured products will be displayed here once connected to WordPress.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-amber-900 sm:text-4xl">
            Featured Cookies
          </h2>
          <p className="mt-4 text-lg text-amber-700">
            Discover our most popular and delicious cookie varieties
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                      <h3 className="text-2xl font-bold text-amber-900 mb-4">
                        {product.name}
                      </h3>
                      <p className="text-amber-700 mb-6 text-lg">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-3xl font-bold text-amber-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                          {product.category}
                        </span>
                      </div>
                      <Link
                        href={`/menu#${product.slug}`}
                        className="inline-flex items-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 transition-colors"
                      >
                        Order Now
                      </Link>
                    </div>
                    <div className="order-1 lg:order-2">
                      <img
                        src={product.image.url || '/api/placeholder/500/400'}
                        alt={product.image.alt || product.name}
                        className="w-full h-80 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {featuredProducts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="flex justify-center mt-8 space-x-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-amber-600' : 'bg-amber-200 hover:bg-amber-300'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_BANNERS } from "@/graphql/query/queries";

interface Banner {
  id: string;
  imageUrl: string;
  desktopImageUrl?: string | null;
  mobileImageUrl?: string | null;
  position: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HeroSlide {
  id: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
}

// Fallback images if no banners are available
const fallbackSlides: HeroSlide[] = [
  {
    id: "fallback-1",
    desktopImageUrl: "/image/banner2.jpg",
    mobileImageUrl: "/image/banner2.jpg"
  },
  {
    id: "fallback-2",
    desktopImageUrl: "/image/banner.jpg",
    mobileImageUrl: "/image/banner.jpg"
  },
  {
    id: "fallback-3",
    desktopImageUrl: "/image/banner1.jpg",
    mobileImageUrl: "/image/banner1.jpg"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data, loading, error } = useQuery(GET_BANNERS);

  // Detect device type
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check immediately
    if (typeof window !== "undefined") {
      checkDevice();
      window.addEventListener("resize", checkDevice);
      return () => window.removeEventListener("resize", checkDevice);
    }
  }, []);

  // Get active banners, sorted by position
  const allBanners: Banner[] = data?.banners
    ? data.banners
        .filter((banner: Banner) => banner.isActive)
        .sort((a: Banner, b: Banner) => {
          if (a.position === null && b.position === null) return 0;
          if (a.position === null) return 1;
          if (b.position === null) return -1;
          return a.position - b.position;
        })
    : [];

  // Separate banners by device type - include banners with specific device images
  const desktopBanners = allBanners.filter((banner) => {
    const desktopUrl = banner.desktopImageUrl?.trim();
    return !!desktopUrl;
  });

  const mobileBanners = allBanners.filter((banner) => {
    const mobileUrl = banner.mobileImageUrl?.trim();
    return !!mobileUrl;
  });

  // Create separate slide arrays for desktop and mobile
  const desktopSlidesRaw = desktopBanners
    .map((banner) => {
      const desktopUrl = banner.desktopImageUrl?.trim();
      if (!desktopUrl || desktopUrl === "") {
        return null;
      }
      return {
        id: banner.id,
        desktopImageUrl: desktopUrl,
        mobileImageUrl: desktopUrl // Use desktop as fallback for mobile
      };
    })
    .filter((slide): slide is HeroSlide => slide !== null);

  const desktopSlides: HeroSlide[] =
    desktopSlidesRaw.length > 0 ? desktopSlidesRaw : fallbackSlides;

  const mobileSlidesRaw = mobileBanners
    .map((banner) => {
      const mobileUrl = banner.mobileImageUrl?.trim();
      if (!mobileUrl || mobileUrl === "") {
        return null;
      }
      return {
        id: banner.id,
        desktopImageUrl: mobileUrl, // Use mobile as fallback for desktop
        mobileImageUrl: mobileUrl
      };
    })
    .filter((slide): slide is HeroSlide => slide !== null);

  const mobileSlides: HeroSlide[] =
    mobileSlidesRaw.length > 0 ? mobileSlidesRaw : fallbackSlides;

  // Use device-specific slides
  const heroSlides = isMobile ? mobileSlides : desktopSlides;

  // Debug logging

  // Reset slide index when switching between desktop and mobile
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  const shouldUnoptimize = (url: string) => url.startsWith("http");

  const nextSlide = () => {
    if (isTransitioning || heroSlides.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  useEffect(() => {
    if (heroSlides.length === 0 || heroSlides.length === 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % heroSlides.length;
        return next;
      });
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const prevSlide = () => {
    if (isTransitioning || heroSlides.length === 0) return;

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
    if (isTransitioning || index === currentSlide || heroSlides.length === 0)
      return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  // Reset to first slide when slides change or when switching device type
  useEffect(() => {
    if (heroSlides.length > 0) {
      if (currentSlide >= heroSlides.length) {
        setCurrentSlide(0);
      }
    }
  }, [heroSlides.length, currentSlide]);

  // Show loading state or empty state
  if (loading) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-gray-600">Loading banners...</div>
      </section>
    );
  }

  if (heroSlides.length === 0 && !loading) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-gray-600">No banners available</div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "100vh" }}>
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"
              } ${isTransitioning ? "blur-sm" : "blur-0"}`}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: isActive ? 10 : index
              }}>
              {(() => {
                const imageUrl = isMobile
                  ? slide.mobileImageUrl
                  : slide.desktopImageUrl;
                if (!imageUrl || imageUrl.trim() === "") {
                  console.warn(`Empty image URL for slide ${index}:`, slide);
                  return null;
                }
                return (
                  <Image
                    src={imageUrl}
                    alt={`Hero slide ${index + 1} ${
                      isMobile ? "mobile" : "desktop"
                    }`}
                    fill
                    className="object-cover"
                    priority={index === 0 || index === 1}
                    unoptimized={shouldUnoptimize(imageUrl)}
                    sizes="100vw"
                    loading={index <= 1 ? "eager" : "lazy"}
                    onError={(e) => {
                      console.error(`Failed to load image: ${imageUrl}`, e);
                    }}
                  />
                );
              })()}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Only show if more than one slide */}
      {heroSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Slide Indicators - Only show if more than one slide */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-red-600 scale-125"
                    : "bg-white bg-opacity-70 hover:bg-opacity-100"
                } disabled:cursor-not-allowed`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Slide Counter - Only show if more than one slide */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-8 right-8 z-20 text-white bg-black bg-opacity-70 px-4 py-2 rounded">
          <span className="text-sm font-medium">
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Progress Bar - Only show if more than one slide */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-50 z-20">
          <div
            className="h-full bg-red-600 transition-all duration-5000 ease-linear"
            style={{
              width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
              animation: isTransitioning ? "none" : "progress 5s linear"
            }}
          />
        </div>
      )}

      {heroSlides.length > 1 && (
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
      )}
    </section>
  );
}

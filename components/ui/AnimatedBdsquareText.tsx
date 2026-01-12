"use client";

import React, { useEffect, useRef, useState } from "react";

const AnimatedBdsquareText: React.FC = () => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true); // Trigger animation only once
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  return (
    <div className="w-full overflow-hidden flex justify-center mb-8">
      <h1
        ref={ref}
        className={`text-[clamp(2.5rem,10vw,8rem)] font-extrabold tracking-tight uppercase text-center whitespace-nowrap bg-gradient-to-r from-red-600 via-black to-red-600 bg-clip-text text-transparent ${
          hasAnimated ? "animate-bdsquare-once" : ""
        }`}
        style={{ letterSpacing: "0.1em", minWidth: "max-content" }}>
        bdsquare
      </h1>

      <style jsx>{`
        @keyframes bdsquare-once {
          0% {
            transform: scale(0.8) translateY(100px);
            opacity: 0;
          }
          60% {
            transform: scale(1.05) translateY(-10px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .animate-bdsquare-once {
          animation: bdsquare-once 1.5s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBdsquareText;

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
  staggerChildren?: string;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.8,
  className = "",
  staggerChildren,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    if (direction === "up") y = distance;
    if (direction === "down") y = -distance;
    if (direction === "left") x = distance;
    if (direction === "right") x = -distance;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (staggerChildren) {
              const items = el.querySelectorAll(staggerChildren);
              if (items.length > 0) {
                gsap.fromTo(
                  items,
                  { opacity: 0, y: distance },
                  {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    stagger: 0.12,
                    ease: "power3.out",
                  }
                );
              }
            } else {
              gsap.fromTo(
                el,
                { opacity: 0, x, y },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  duration,
                  delay,
                  ease: "power3.out",
                }
              );
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay, direction, distance, duration, staggerChildren]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

"use client";

import gsap from "gsap";

export const initGSAP = () => {
  if (typeof window !== "undefined") {
    // Custom defaults if needed
  }
};

export const animateFadeUp = (
  element: HTMLElement | null,
  delay: number = 0,
  duration: number = 0.8
) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    }
  );
};

export const animateStaggerChildren = (
  container: HTMLElement | null,
  childSelector: string,
  stagger: number = 0.15
) => {
  if (!container) return;
  const children = container.querySelectorAll(childSelector);
  if (!children.length) return;

  gsap.fromTo(
    children,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger,
      ease: "power3.out",
    }
  );
};

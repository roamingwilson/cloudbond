"use client";

import React from "react";
import styles from "./Button.module.css";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "sage" | "secondary" | "secondaryDark" | "ghost";
  size?: "small" | "medium" | "large";
  showArrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  showArrow = false,
  children,
  className = "",
  ...props
}) => {
  const sizeClass = size !== "medium" ? styles[size] : "";
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <span className={styles.iconWrapper}>
          <ArrowRight size={16} strokeWidth={2.2} />
        </span>
      )}
    </button>
  );
};

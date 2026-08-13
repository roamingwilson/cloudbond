import React from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  badge?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  description,
  align = "center",
  theme = "light",
  className = "",
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`${styles.container} ${
        align === "center" ? styles.center : styles.left
      } ${className}`}
    >
      {badge && (
        <span
          className={`${styles.badge} ${isDark ? styles.badgeDark : ""}`}
        >
          {badge}
        </span>
      )}
      <h2 className={`${styles.title} ${isDark ? styles.titleDark : ""}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`${styles.description} ${
            isDark ? styles.descriptionDark : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

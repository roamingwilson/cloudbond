"use client";

import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
import { Menu, X, ArrowRight, Moon, Sun } from "lucide-react";

interface NavigationProps {
  onJoinClick?: () => void;
}

export const CloudBondLogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <path
      d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22M4.93 4.93l2.47 2.47M16.6 16.6l2.47 2.47M4.93 19.07l2.47-2.47M16.6 7.4l2.47-2.47"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const Navigation: React.FC<NavigationProps> = ({ onJoinClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    if (currentTheme === "dark" || currentTheme === "light") setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
    setTheme(nextTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className="container-wide">
          <div className={styles.inner}>
            <a href="#" className={styles.brand}>
              <CloudBondLogoIcon size={22} />
              <span>Cloud Bond</span>
            </a>

            <nav className={styles.desktopNav}>
              <ul className={styles.navLinks}>
                <li>
                  <a href="#product" className={styles.navLink}>
                    Product
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className={styles.navLink}>
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#integrations" className={styles.navLink}>
                    Integrations
                  </a>
                </li>
                <li className={styles.moreNavItem}>
                  <details className={styles.moreNav}>
                    <summary className={styles.navLink}>Explore</summary>
                    <div className={styles.moreMenu}>
                      <a href="#security">Security</a>
                      <a href="#resources">Resources</a>
                      <a href="#pricing">Pricing</a>
                    </div>
                  </details>
                </li>
              </ul>
            </nav>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={toggleTheme}
                className={styles.themeToggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={onJoinClick}
                className={styles.signInBtn}
              >
                Sign in
              </button>
              <button
                onClick={onJoinClick}
                className={styles.ctaBtn}
              >
                <span>Get early access</span>
                <ArrowRight size={14} />
              </button>

              <button
                className={styles.mobileToggle}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className={styles.mobileMenuOpen}>
          <ul className={styles.mobileNavLinks}>
            <li>
              <a href="#product" onClick={() => setMobileOpen(false)}>
                Product
              </a>
            </li>
            <li>
              <a href="#how-it-works" onClick={() => setMobileOpen(false)}>
                How it works
              </a>
            </li>
            <li>
              <a href="#integrations" onClick={() => setMobileOpen(false)}>
                Integrations
              </a>
            </li>
            <li>
              <a href="#security" onClick={() => setMobileOpen(false)}>
                Security
              </a>
            </li>
            <li>
              <a href="#resources" onClick={() => setMobileOpen(false)}>
                Resources
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={() => setMobileOpen(false)}>
                Pricing
              </a>
            </li>
          </ul>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button onClick={toggleTheme} className={styles.mobileThemeBtn}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <span>Use {theme === "dark" ? "light" : "dark"} mode</span>
            </button>
            <button onClick={() => { setMobileOpen(false); onJoinClick?.(); }} className={styles.signInBtn}>
              Sign in
            </button>
            <button onClick={() => { setMobileOpen(false); onJoinClick?.(); }} className={styles.ctaBtn} style={{ width: "100%", justifyContent: "center" }}>
              <span>Get early access</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

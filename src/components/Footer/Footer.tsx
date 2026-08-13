"use client";

import React from "react";
import styles from "./Footer.module.css";
import { CloudBondLogoIcon } from "../Navigation/Navigation";
import { ArrowRight } from "lucide-react";

interface FooterProps {
  onJoinClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onJoinClick }) => {
  return (
    <footer className={styles.footer}>
      {/* FINAL CTA BOX */}
      <div className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaHeadline}>
              You focus on the business. <br />
              <span className={styles.serifItalic}>Cloud Bond handles the rest.</span>
            </h2>
            <p className={styles.ctaSubtext}>
              Give your AI employee the work you don't want to carry yourself.
            </p>
            <div className={styles.ctaButtonsRow}>
              <button onClick={onJoinClick} className={styles.primaryCta}>
                <span>Get early access</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("how-it-works");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={styles.secondaryCta}
              >
                See how it works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER LINKS & BRANDING */}
      <div className={styles.bottomFooter}>
        <div className="container">
          <div className={styles.topRow}>
            <div className={styles.brandCol}>
              <a href="#" className={styles.brand}>
                <CloudBondLogoIcon size={20} />
                <span>Cloud Bond</span>
              </a>
              <p className={styles.tagline}>
                One AI employee for everything you run. <br />
                The intelligent execution layer for modern business.
              </p>
            </div>

            <div className={styles.navCols}>
              <div className={styles.col}>
                <span className={styles.colTitle}>Product</span>
                <ul className={styles.linkList}>
                  <li><a href="#product">Overview</a></li>
                  <li><a href="#how-it-works">How it works</a></li>
                  <li><a href="#use-cases">Delegation Demos</a></li>
                  <li><a href="#integrations">Integrations</a></li>
                </ul>
              </div>

              <div className={styles.col}>
                <span className={styles.colTitle}>Trust & Security</span>
                <ul className={styles.linkList}>
                  <li><a href="#security">Human Approval Gate</a></li>
                  <li><a href="#security">Audit Transparency</a></li>
                  <li><a href="#security">Enterprise Data Privacy</a></li>
                </ul>
              </div>

              <div className={styles.col}>
                <span className={styles.colTitle}>Company</span>
                <ul className={styles.linkList}>
                  <li><a href="#">Wilson Cloud Limited</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#resources">Resources</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <div>
              © 2026 Wilson Cloud Limited. All rights reserved. Cloud Bond is a trademark of Wilson Cloud Limited.
            </div>
            <div className={styles.legalLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security Statement</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

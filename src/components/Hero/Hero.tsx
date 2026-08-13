"use client";

import React from "react";
import styles from "./Hero.module.css";
import { LivingWorkspace } from "./LivingWorkspace";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface HeroProps {
  onJoinClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick }) => {
  return (
    <section className={styles.heroSection} id="product">
      <div className="container-wide">
        {/* Editorial Headline & Narrative Copy */}
        <div className={styles.headerContent}>
          <h1 className={styles.primaryHeadline}>
            One AI <span className={styles.serifItalic}>employee</span>
            <br />
            for everything you run.
          </h1>

          <p className={styles.subtext}>
            Cloud Bond understands your business, plans the work, takes action,
            <br className={styles.desktopBr} />
            and keeps you ahead — across all your tools.
          </p>

          <div className={styles.ctasRow}>
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

        {/* Living Product Interface Surface */}
        <div className={styles.workspaceContainer}>
          <LivingWorkspace onJoinClick={onJoinClick} />
        </div>
      </div>
    </section>
  );
};

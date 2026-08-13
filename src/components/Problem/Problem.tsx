"use client";

import React from "react";
import styles from "./Problem.module.css";
import { SectionHeading } from "../shared/SectionHeading";
import { AnimatedReveal } from "../shared/AnimatedReveal";
import { Clock, Layers, MessageSquareX, ArrowRight } from "lucide-react";

export const Problem: React.FC = () => {
  return (
    <section className={styles.section} id="problem">
      <div className="container">
        <AnimatedReveal direction="up">
          <SectionHeading
            badge="The Fundamental Insight"
            title="You didn't start a business to spend half your day on digital admin."
            description="Modern business professionals are trapped in a coordination cycle — spending hours shuffling between email, calendar, CRM, and doc tools instead of doing core high-value work."
          />
        </AnimatedReveal>

        <div className={styles.grid}>
          <AnimatedReveal direction="up" delay={0.1}>
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <Clock size={24} />
              </div>
              <h3 className={styles.cardTitle}>Tool & Context Overwhelm</h3>
              <p className={styles.cardBody}>
                You switch between 10+ web apps every day just to copy data, follow up on pending items, schedule meetings, and update project trackers manually.
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.2}>
            <div className={styles.card}>
              <div className={styles.iconBox} style={{ backgroundColor: "#FDF3E6", color: "var(--amber)" }}>
                <MessageSquareX size={24} />
              </div>
              <h3 className={styles.cardTitle}>AI Chatbots Don't Do Work</h3>
              <p className={styles.cardBody}>
                Generic AI chat windows give advice and write text, but you still have to copy-paste answers, format spreadsheets, click buttons, and manually execute every step yourself.
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.3}>
            <div className={styles.card}>
              <div className={styles.iconBox} style={{ backgroundColor: "#EBF3EE", color: "var(--sage)" }}>
                <Layers size={24} />
              </div>
              <h3 className={styles.cardTitle}>Fragmented Business Memory</h3>
              <p className={styles.cardBody}>
                Critical context is scattered across emails, meeting notes, customer conversations, and past proposals. You spend ages hunting for information before taking action.
              </p>
            </div>
          </AnimatedReveal>
        </div>

        {/* The Fundamental Shift Banner */}
        <AnimatedReveal direction="up" delay={0.4}>
          <div className={styles.shiftBox}>
            <div className={styles.shiftLeft}>
              <h3 className={styles.shiftTitle}>
                The Paradigm Shift: From Chat to Delegation
              </h3>
              <p className={styles.shiftText}>
                Instead of learning dozens of tools and typing prompts to get advice, Cloud Bond gives you a true digital colleague. You delegate outcomes — Cloud Bond handles execution.
              </p>
            </div>
            <div className={styles.shiftDiagram}>
              <div className={styles.badgeOld}>AI Assistant (Chat)</div>
              <ArrowRight size={20} className={styles.arrow} />
              <div className={styles.badgeNew}>AI Employee (Action)</div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};

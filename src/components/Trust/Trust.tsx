"use client";

import React from "react";
import styles from "./Trust.module.css";
import { ShieldCheck, Eye, Lock, KeyRound, Building2 } from "lucide-react";

const PILLARS = [
  {
    icon: <ShieldCheck size={24} />,
    title: "Permission-Based Human Approvals",
    desc: "Cloud Bond operates with absolute safety. Any sensitive action — sending external client emails, scheduling meetings, or modifying records — requires your explicit 1-click approval.",
  },
  {
    icon: <Eye size={24} />,
    title: "100% Transparent Activity Log",
    desc: "No black-box AI behavior. Review full step-by-step audit logs of every command executed, files accessed, web searches performed, and drafts prepared in real-time.",
  },
  {
    icon: <Lock size={24} />,
    title: "Enterprise Data Privacy",
    desc: "Your proprietary business data, customer context, and internal documents are encrypted in transit and at rest. We never use your private data to train public models.",
  },
  {
    icon: <KeyRound size={24} />,
    title: "Granular Access Control",
    desc: "You dictate exactly which accounts, folders, and channels Cloud Bond can read or touch. Revoke or scope permissions at any moment with single-click authority.",
  },
];

export const Trust: React.FC = () => {
  return (
    <section className={styles.section} id="security">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.kicker}>Security & Governance</span>
          <h2 className={styles.headline}>
            Powerful enough to do work. <br />
            <span className={styles.serifItalic}>Controlled enough for total peace of mind.</span>
          </h2>
          <p className={styles.subheadline}>
            Giving an AI employee access to your business workflows requires uncompromised security, transparent execution, and absolute human authority.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {PILLARS.map((p, idx) => (
            <div key={idx} className={styles.pillarCard}>
              <div className={styles.iconWrapper}>{p.icon}</div>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarBody}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.companyBadge}>
          <Building2 size={18} className={styles.badgeBuildingIcon} />
          <span>
            Developed and operated by <span className={styles.companyName}>Wilson Cloud Limited</span> — Registered Technology Company
          </span>
        </div>
      </div>
    </section>
  );
};

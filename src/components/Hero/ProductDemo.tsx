"use client";

import React, { useState } from "react";
import styles from "./ProductDemo.module.css";
import { Sparkles, CheckCircle2, ShieldAlert, Cpu, Calendar, Mail, FileText } from "lucide-react";

interface Scenario {
  id: string;
  command: string;
  tag: string;
  steps: {
    title: string;
    detail: string;
    icon: React.ReactNode;
    status: "done" | "pending";
  }[];
  approvalRequired?: {
    title: string;
    detail: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "followup",
    command: "Follow up with clients who haven't replied to our quotes",
    tag: "CRM & Communication",
    steps: [
      {
        title: "Context & Email Scanning",
        detail: "Identified 4 unanswered client threads sent between 3-7 days ago.",
        icon: <Mail size={16} className="text-emerald-400" />,
        status: "done",
      },
      {
        title: "Drafting Tailored Messages",
        detail: "Generated 4 personalized follow-up emails matching previous tone and quote specs.",
        icon: <FileText size={16} />,
        status: "done",
      },
    ],
    approvalRequired: {
      title: "Approval Needed before sending 4 emails",
      detail: "Recipients: Apex Inc (Sarah L.), Nexus Labs (Mark K.), Horizon Group, Quantum Co.",
    },
  },
  {
    id: "meetings",
    command: "Prepare everything for tomorrow's client meetings",
    tag: "Calendar & Briefs",
    steps: [
      {
        title: "Schedule Analysis",
        detail: "Found 3 meetings scheduled for tomorrow (10:00 AM, 2:00 PM, 4:30 PM).",
        icon: <Calendar size={16} />,
        status: "done",
      },
      {
        title: "Dossier & History Retrieval",
        detail: "Pulled past email threads, Notion meeting notes, and latest pitch deck v3.",
        icon: <Cpu size={16} />,
        status: "done",
      },
      {
        title: "Executive Brief Synthesized",
        detail: "Created 1-page summary doc with key talking points and pending action items.",
        icon: <CheckCircle2 size={16} />,
        status: "done",
      },
    ],
  },
  {
    id: "suppliers",
    command: "Find three suppliers for sustainable packaging and compare pricing",
    tag: "Research & Procurement",
    steps: [
      {
        title: "Supplier Discovery",
        detail: "Researched UK & EU certified eco-packaging manufacturers.",
        icon: <Cpu size={16} />,
        status: "done",
      },
      {
        title: "Comparison Matrix Generated",
        detail: "Compiled pricing, minimum order quantities (MOQ), and shipping lead times.",
        icon: <FileText size={16} />,
        status: "done",
      },
    ],
    approvalRequired: {
      title: "Approval Needed to send inquiry RFQs",
      detail: "Send formal request for quotation to EcoPack UK, GreenBox Co, and TerraWrap?",
    },
  },
];

export const ProductDemo: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("followup");
  const [approved, setApproved] = useState<Record<string, boolean>>({});

  const activeScenario = SCENARIOS.find((s) => s.id === activeId) || SCENARIOS[0];

  const handleApprove = (id: string) => {
    setApproved((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className={styles.window}>
      {/* Title Bar */}
      <div className={styles.titleBar}>
        <div className={styles.windowDots}>
          <div className={`${styles.dot} ${styles.dotRed}`} />
          <div className={`${styles.dot} ${styles.dotYellow}`} />
          <div className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span>Cloud Bond Engine v1.4 — Active & Listening</span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className={styles.contentGrid}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <span className={styles.sidebarLabel}>Sample Delegations</span>
          <div className={styles.presetList}>
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`${styles.presetItem} ${
                  s.id === activeId ? styles.activePreset : ""
                }`}
              >
                <span className={styles.presetTag}>{s.tag}</span>
                <span>"{s.command}"</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Panel */}
        <div className={styles.mainPanel}>
          {/* Command Prompt Display */}
          <div className={styles.commandBox}>
            <Sparkles size={18} className={styles.commandIcon} />
            <span className={styles.commandText}>
              "{activeScenario.command}"
            </span>
          </div>

          {/* Execution Feed */}
          <div className={styles.executionFeed}>
            {activeScenario.steps.map((step, idx) => (
              <div key={idx} className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepTitle}>
                    {step.icon}
                    {step.title}
                  </span>
                  <span className={`${styles.stepStatus} ${styles.statusDone}`}>
                    <CheckCircle2 size={12} /> Executed
                  </span>
                </div>
                <div className={styles.stepDetail}>{step.detail}</div>
              </div>
            ))}

            {/* Approval Required Card */}
            {activeScenario.approvalRequired && (
              <div className={styles.approvalCard}>
                <div className={styles.approvalTitle}>
                  <ShieldAlert size={18} style={{ color: "#FBBF24" }} />
                  <span>{activeScenario.approvalRequired.title}</span>
                </div>
                <div className={styles.stepDetail}>
                  {activeScenario.approvalRequired.detail}
                </div>
                <div className={styles.approvalActions}>
                  {approved[activeScenario.id] ? (
                    <span
                      style={{
                        color: "#34D399",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <CheckCircle2 size={16} /> Approved & Action Executed
                    </span>
                  ) : (
                    <>
                      <button
                        className={styles.btnApprove}
                        onClick={() => handleApprove(activeScenario.id)}
                      >
                        Approve Action
                      </button>
                      <button className={styles.btnReview}>
                        Review Draft Details
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

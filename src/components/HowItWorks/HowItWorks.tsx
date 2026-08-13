"use client";

import React, { useState } from "react";
import styles from "./HowItWorks.module.css";
import {
  Brain,
  ListTodo,
  Zap,
  ShieldCheck,
  CheckCheck,
  Sparkles,
  ArrowRight,
  Mail,
  Calendar,
  FileText,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

interface Stage {
  id: string;
  number: string;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  previewData: {
    status: string;
    headline: string;
    items: string[];
    actionLabel?: string;
  };
}

const STAGES: Stage[] = [
  {
    id: "understand",
    number: "01",
    name: "Understand",
    icon: <Brain size={20} />,
    tagline: "Contextual business comprehension",
    description:
      "Cloud Bond connects to your business tools, reads historical threads, analyzes meeting dossiers, and understands the underlying context before taking any action.",
    previewData: {
      status: "Connected & Listening",
      headline: "Gathering enterprise context across 6 integrations",
      items: [
        "Analyzed 14 recent emails with Sarah Chen (Acme Inc.)",
        "Retrieved Q4 pricing agreement v2 from Google Drive",
        "Cross-referenced calendar availability for 3 key stakeholders",
      ],
    },
  },
  {
    id: "plan",
    number: "02",
    name: "Plan",
    icon: <ListTodo size={20} />,
    tagline: "Structured multi-step decomposition",
    description:
      "Instead of firing generic AI answers, Cloud Bond breaks your intent down into an organized execution plan with dependencies and milestones.",
    previewData: {
      status: "Plan Generated",
      headline: "Workflow Plan: Strategic Client Onboarding",
      items: [
        "1. Synthesize executive meeting dossier from emails & Notion notes",
        "2. Draft personalized proposal follow-ups tailored to Acme's feedback",
        "3. Surface high-impact approval requests to user before dispatch",
      ],
    },
  },
  {
    id: "act",
    number: "03",
    name: "Act",
    icon: <Zap size={20} />,
    tagline: "Cross-system execution",
    description:
      "Cloud Bond logs into connected systems to execute actual work: drafting emails, creating calendar invites, updating CRM deal stages, and filing briefs.",
    previewData: {
      status: "Executing Tasks",
      headline: "Automated Digital Delegation in Progress",
      items: [
        "✓ Created briefing doc in Google Drive",
        "✓ Updated Salesforce deal status to 'Proposal Sent'",
        "● Preparing meeting calendar invite for Thu 2:00 PM",
      ],
      actionLabel: "Working across Gmail, Notion & Salesforce",
    },
  },
  {
    id: "ask",
    number: "04",
    name: "Ask",
    icon: <ShieldCheck size={20} />,
    tagline: "Human-in-the-loop oversight",
    description:
      "Cloud Bond never acts blindly on critical operations. Whenever sending external messages or changing sensitive records, it flags actions for your approval.",
    previewData: {
      status: "Requires Your Input",
      headline: "Human Approval Gate Active",
      items: [
        "Draft email to Sarah Chen ready for review",
        "Proposed discount adjustment: 15% custom enterprise tier",
        "Action pending: Click 'Approve & Send' to proceed",
      ],
      actionLabel: "You maintain full decision authority",
    },
  },
  {
    id: "report",
    number: "05",
    name: "Report",
    icon: <CheckCheck size={20} />,
    tagline: "Executive summaries & clarity",
    description:
      "When work is complete, Cloud Bond delivers a succinct report showing what was done, key open questions, and suggested next steps for your team.",
    previewData: {
      status: "Work Completed",
      headline: "Daily Delegation Briefing Ready",
      items: [
        "✓ 3 client meeting dossiers prepared & synced to calendar",
        "✓ 7 customer follow-ups sent following approval",
        "✓ 2 open questions surfaced for tomorrow's standup",
      ],
      actionLabel: "Everything ready for your day",
    },
  },
];

export const HowItWorks: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>("understand");

  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.kicker}>How Cloud Bond Works</span>
          <h2 className={styles.headline}>
            From natural intent to <span className={styles.serifItalic}>executed work.</span>
          </h2>
          <p className={styles.subheadline}>
            Five structured stages turn complex business instructions into verified, high-quality outcomes.
          </p>
        </div>

        {/* 5-Stage Interactive Tabs Grid */}
        <div className={styles.grid}>
          {/* Left Column: Stage Selector Tabs */}
          <div className={styles.tabsColumn}>
            {STAGES.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`${styles.stageTab} ${isActive ? styles.stageTabActive : ""}`}
                >
                  <div className={styles.tabNumber}>{stage.number}</div>
                  <div className={styles.tabInfo}>
                    <div className={styles.tabTitleRow}>
                      <span className={styles.tabName}>{stage.name}</span>
                      <span className={styles.tabTagline}>{stage.tagline}</span>
                    </div>
                    {isActive && (
                      <p className={styles.tabDescription}>{stage.description}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Stage Live Preview Display Surface */}
          <div className={styles.previewColumn}>
            <div className={styles.previewWindow}>
              <div className={styles.windowHeader}>
                <div className={styles.windowDots}>
                  <span className={`${styles.dot} ${styles.dotRed}`} />
                  <span className={`${styles.dot} ${styles.dotYellow}`} />
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <div className={styles.windowStatus}>
                  <Sparkles size={13} className={styles.purpleSparkle} />
                  <span>Stage {currentStage.number}: {currentStage.name} — {currentStage.previewData.status}</span>
                </div>
              </div>

              <div className={styles.windowBody}>
                <h3 className={styles.previewTitle}>{currentStage.previewData.headline}</h3>
                
                <div className={styles.itemsList}>
                  {currentStage.previewData.items.map((item, idx) => (
                    <div key={idx} className={styles.previewItem}>
                      <CheckCircle2 size={16} className={styles.itemCheckIcon} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {currentStage.previewData.actionLabel && (
                  <div className={styles.actionNote}>
                    <Sparkles size={14} />
                    <span>{currentStage.previewData.actionLabel}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

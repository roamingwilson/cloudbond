"use client";

import React, { useState } from "react";
import styles from "./UseCases.module.css";
import { SectionHeading } from "../shared/SectionHeading";
import { AnimatedReveal } from "../shared/AnimatedReveal";
import { Clock, CheckCircle2, ShieldCheck, Mail, Calendar, FileSearch, Users, Briefcase } from "lucide-react";

interface UseCase {
  id: string;
  label: string;
  command: string;
  tag: string;
  desc: string;
  systems: string[];
  savings: string;
  mockTitle: string;
  items: { title: string; desc: string; status: string }[];
}

const USE_CASES: UseCase[] = [
  {
    id: "followup",
    label: "Client Follow-ups",
    command: '"Follow up with clients who haven\'t replied"',
    tag: "Communication & Sales",
    desc: "Cloud Bond scans sent emails, cross-references your CRM, identifies clients overdue for a response, and drafts personalized follow-up emails tailored to previous context.",
    systems: ["Gmail / Outlook", "HubSpot CRM", "Notion Notes"],
    savings: "Saves ~4.5 hours / week in manual inbox chasing",
    mockTitle: "Automated Communication Workflow",
    items: [
      {
        title: "Sarah Jenkins — CEO at Apex Studio",
        desc: 'Drafted follow-up: "Hi Sarah, checking in regarding the Q3 proposal sent on Tuesday..."',
        status: "Draft Ready (Approval Required)",
      },
      {
        title: "Marcus Vance — Director at Vance Bio",
        desc: "Updated CRM stage: Awaiting feedback on updated pricing matrix.",
        status: "CRM Updated",
      },
    ],
  },
  {
    id: "prep",
    label: "Meeting Prep",
    command: '"Prepare everything for tomorrow\'s meetings"',
    tag: "Executive Organization",
    desc: "Analyzes tomorrow's calendar schedule, pulls past email threads, meeting transcripts, and project files, synthesizing a concise 1-page executive brief before every call.",
    systems: ["Google Calendar", "Notion", "Google Drive", "Zoom Transcripts"],
    savings: "Saves 45 mins of prep per meeting",
    mockTitle: "Executive Brief — 10:00 AM Product Sync",
    items: [
      {
        title: "Key Objectives & Background",
        desc: "Reviewed 3 past meeting summaries. Primary goal: Finalize Q4 design scope approval.",
        status: "Brief Synthesized",
      },
      {
        title: "Attendes Dossier",
        desc: "Alex (Head of Product), Elena (Lead Engineer). Past friction: API rate limits.",
        status: "Dossier Compiled",
      },
    ],
  },
  {
    id: "research",
    label: "Supplier & Market Research",
    command: '"Find three packaging suppliers and compare them"',
    tag: "Procurement & Intelligence",
    desc: "Conducts multi-source web research, evaluates vendor credentials, compiles pricing and lead time matrices, and produces a structured comparison report.",
    systems: ["Web Search Engine", "Company Registries", "Google Docs"],
    savings: "Saves ~6 hours of manual web research",
    mockTitle: "Structured Procurement Comparison Matrix",
    items: [
      {
        title: "EcoPack Ltd (UK)",
        desc: "MOQ: 1,000 units | Lead Time: 5 days | ISO 14001 Certified | £1.20 / unit",
        status: "Verified",
      },
      {
        title: "GreenBox Co (EU)",
        desc: "MOQ: 500 units | Lead Time: 8 days | 100% Recyclable | £0.95 / unit",
        status: "Verified",
      },
    ],
  },
  {
    id: "admin",
    label: "Project Admin",
    command: '"Deal with the administrative work for this project"',
    tag: "Operations & Admin",
    desc: "Collates pending invoices, updates project status boards, files completed deliverables, and notifies team members about upcoming deadlines.",
    systems: ["Linear / Jira", "Slack", "Xero / QuickBooks", "Google Drive"],
    savings: "Eliminates Friday admin drag",
    mockTitle: "Automated Project Cleanup",
    items: [
      {
        title: "3 Milestones Closed",
        desc: "Marked Design Audit, Wireframes, and Specs as complete in Linear.",
        status: "Completed",
      },
      {
        title: "Client Notification Drafted",
        desc: "Prepared Slack status update for #proj-cloudbond channel.",
        status: "Draft Ready",
      },
    ],
  },
  {
    id: "customer",
    label: "Customer History",
    command: '"Find everything we have about this customer"',
    tag: "Information Retrieval",
    desc: "Queries emails, support tickets, invoices, and meeting notes to present a unified 360-degree memory view of any client or partner instantly.",
    systems: ["Zendesk / Intercom", "Stripe", "Gmail", "CRM"],
    savings: "Instant context retrieval",
    mockTitle: "Customer 360 Memory View — Acme Corp",
    items: [
      {
        title: "Contract & Billing",
        desc: "Active Growth Tier (£2,400/yr). Renewal date: Nov 14, 2026.",
        status: "Retrieved",
      },
      {
        title: "Recent Interactions",
        desc: "2 support tickets resolved last week. Requested custom API webhook support.",
        status: "Retrieved",
      },
    ],
  },
];

export const UseCases: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("followup");
  const activeUseCase = USE_CASES.find((u) => u.id === activeTabId) || USE_CASES[0];

  return (
    <section className={styles.section} id="use-cases">
      <div className="container">
        <AnimatedReveal direction="up">
          <SectionHeading
            badge="Real Practical Delegations"
            title="What can your AI employee handle today?"
            description="Designed for founders, consultants, small business owners, and professionals who need work done, not more advice."
          />
        </AnimatedReveal>

        {/* Tab Buttons */}
        <AnimatedReveal direction="up" delay={0.1}>
          <div className={styles.tabsNav}>
            {USE_CASES.map((uc) => (
              <button
                key={uc.id}
                onClick={() => setActiveTabId(uc.id)}
                className={`${styles.tabBtn} ${
                  uc.id === activeTabId ? styles.activeTab : ""
                }`}
              >
                {uc.label}
              </button>
            ))}
          </div>
        </AnimatedReveal>

        {/* Active Use Case Display Card */}
        <AnimatedReveal direction="up" delay={0.2}>
          <div className={styles.cardContainer}>
            {/* Left Info Column */}
            <div className={styles.leftCol}>
              <span className={styles.tag}>{activeUseCase.tag}</span>
              <h3 className={styles.commandTitle}>{activeUseCase.command}</h3>
              <p className={styles.description}>{activeUseCase.desc}</p>

              <div>
                <span className={styles.systemsLabel}>Connected Tools Used</span>
                <div className={styles.systemsList} style={{ marginTop: "0.5rem" }}>
                  {activeUseCase.systems.map((sys, idx) => (
                    <span key={idx} className={styles.systemBadge}>
                      {sys}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.metricBadge}>
                <Clock size={16} />
                <span>{activeUseCase.savings}</span>
              </div>
            </div>

            {/* Right Interactive Mock Output */}
            <div className={styles.rightCol}>
              <div className={styles.mockHeader}>
                <span>{activeUseCase.mockTitle}</span>
                <span style={{ color: "#34D399", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <ShieldCheck size={14} /> Active Memory
                </span>
              </div>

              <div className={styles.mockContent}>
                {activeUseCase.items.map((item, idx) => (
                  <div key={idx} className={styles.mockItem}>
                    <div className={styles.mockItemTitle}>
                      <span>{item.title}</span>
                      <span style={{ color: "#7BDCB5", fontSize: "0.75rem", fontWeight: 500 }}>
                        {item.status}
                      </span>
                    </div>
                    <div className={styles.mockItemDesc}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};

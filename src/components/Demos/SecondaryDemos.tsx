"use client";

import React, { useState } from "react";
import styles from "./SecondaryDemos.module.css";
import { DraftReviewModal, DraftItem } from "../InteractiveModal/DraftReviewModal";
import { Sparkles, Mail, Eye, Building2, Search, CheckCircle2, FileText, Calendar, Users, ArrowRight } from "lucide-react";

export const SecondaryDemos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"followup" | "acme">("followup");
  const [activeModalDraft, setActiveModalDraft] = useState<DraftItem | null>(null);
  const [approvedItems, setApprovedItems] = useState<Record<string, boolean>>({});

  const sampleDraft: DraftItem = {
    id: "northstar_followup",
    type: "email",
    recipient: "Marcus Vance",
    role: "VP of Engineering",
    company: "Northstar Technologies",
    subject: "Re: Security questionnaire & API migration schedule",
    content:
      "Hi Marcus,\n\nI reviewed our completed SOC2 Type II compliance audit and updated the API migration roadmap we discussed last Thursday.\n\nAre you available for a 15-min sync tomorrow at 2:00 PM to finalize sign-off?\n\nBest,\nAlex",
    contextSources: ["Northstar Slack thread #proj-migration", "SOC2 Compliance PDF", "Gmail thread"],
  };

  const handleApprove = (id: string) => {
    setApprovedItems((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className={styles.section} id="use-cases">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.kicker}>Realistic Digital Delegations</span>
          <h2 className={styles.headline}>
            Watch Cloud Bond <span className={styles.serifItalic}>move work forward.</span>
          </h2>
          <p className={styles.subheadline}>
            Try interactive command scenarios to experience real context gathering and automated execution.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "followup" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("followup")}
          >
            <span>💬 Communication Delegation</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "acme" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("acme")}
          >
            <span>🔍 Context Graph Search</span>
          </button>
        </div>

        {/* DEMO A: FOLLOW UP DEMO */}
        {activeTab === "followup" && (
          <div className={styles.demoCard}>
            <div className={styles.commandHeader}>
              <div className={styles.commandPill}>
                <Sparkles size={16} className={styles.purpleSparkle} />
                <span>"Follow up with everyone waiting for a response."</span>
              </div>
              <span className={styles.statusBadge}>
                <CheckCircle2 size={13} /> 7 conversations scanned
              </span>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statChip}>
                <span className={styles.statNumber}>7</span>
                <span className={styles.statLabel}>conversations found</span>
              </div>
              <div className={styles.statChip}>
                <span className={styles.statNumber}>4</span>
                <span className={styles.statLabel}>follow-ups prepared</span>
              </div>
              <div className={styles.statChip}>
                <span className={styles.statNumber}>2</span>
                <span className={styles.statLabel}>ready for approval</span>
              </div>
            </div>

            {/* Contacts Table */}
            <div className={styles.contactsGrid}>
              <div className={styles.contactCard}>
                <div className={styles.contactTop}>
                  <div className={styles.companyBadge}>A</div>
                  <div>
                    <div className={styles.companyName}>Acme Inc.</div>
                    <div className={styles.contactPerson}>Sarah Chen</div>
                  </div>
                </div>
                <div className={styles.threadMeta}>3 days ago • Pricing follow-up</div>
                <div className={styles.cardActions}>
                  {approvedItems["sarah_followup"] ? (
                    <span className={styles.approvedPill}><CheckCircle2 size={12} /> Approved & Sent</span>
                  ) : (
                    <button
                      className={styles.btnReview}
                      onClick={() => setActiveModalDraft(sampleDraft)}
                    >
                      <Eye size={13} /> Review draft
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactTop}>
                  <div className={styles.companyBadge} style={{ background: "#2563EB" }}>N</div>
                  <div>
                    <div className={styles.companyName}>Northstar</div>
                    <div className={styles.contactPerson}>Marcus Vance</div>
                  </div>
                </div>
                <div className={styles.threadMeta}>4 days ago • Security audit sync</div>
                <div className={styles.cardActions}>
                  {approvedItems["northstar_followup"] ? (
                    <span className={styles.approvedPill}><CheckCircle2 size={12} /> Approved & Sent</span>
                  ) : (
                    <button
                      className={styles.btnReview}
                      onClick={() => setActiveModalDraft(sampleDraft)}
                    >
                      <Eye size={13} /> Review draft
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactTop}>
                  <div className={styles.companyBadge} style={{ background: "#059669" }}>G</div>
                  <div>
                    <div className={styles.companyName}>Globex Corp</div>
                    <div className={styles.contactPerson}>Elena Rostova</div>
                  </div>
                </div>
                <div className={styles.threadMeta}>Yesterday • Contract renewal</div>
                <div className={styles.cardActions}>
                  <span className={styles.statusAuto}>Draft auto-queued</span>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactTop}>
                  <div className={styles.companyBadge} style={{ background: "#D97706" }}>U</div>
                  <div>
                    <div className={styles.companyName}>Umbrella Co</div>
                    <div className={styles.contactPerson}>David Miller</div>
                  </div>
                </div>
                <div className={styles.threadMeta}>5 days ago • SLA review</div>
                <div className={styles.cardActions}>
                  <span className={styles.statusAuto}>Draft auto-queued</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEMO B: ACME CONTEXT SEARCH DEMO */}
        {activeTab === "acme" && (
          <div className={styles.demoCard}>
            <div className={styles.commandHeader}>
              <div className={styles.commandPill}>
                <Search size={16} className={styles.purpleSparkle} />
                <span>"Find everything we have about Acme."</span>
              </div>
              <span className={styles.statusBadge}>
                <CheckCircle2 size={13} /> Context Graph Unified
              </span>
            </div>

            <div className={styles.acmeSummaryHeader}>
              <div className={styles.acmeAvatar}>A</div>
              <div>
                <h3 className={styles.acmeTitle}>Acme Inc. — Enterprise Customer Record</h3>
                <p className={styles.acmeSub}>Cloud Bond synthesized 6 business data streams into 1 live workspace</p>
              </div>
            </div>

            <div className={styles.graphGrid}>
              <div className={styles.graphBox}>
                <Mail size={18} className={styles.graphIcon} />
                <span className={styles.graphVal}>12</span>
                <span className={styles.graphLbl}>Gmail Threads</span>
              </div>
              <div className={styles.graphBox}>
                <Calendar size={18} className={styles.graphIcon} />
                <span className={styles.graphVal}>3</span>
                <span className={styles.graphLbl}>Meetings</span>
              </div>
              <div className={styles.graphBox}>
                <FileText size={18} className={styles.graphIcon} />
                <span className={styles.graphVal}>4</span>
                <span className={styles.graphLbl}>Notion Docs</span>
              </div>
              <div className={styles.graphBox}>
                <CheckCircle2 size={18} className={styles.graphIcon} />
                <span className={styles.graphVal}>2</span>
                <span className={styles.graphLbl}>Open Tasks</span>
              </div>
              <div className={styles.graphBox}>
                <Sparkles size={18} className={styles.graphIcon} />
                <span className={styles.graphVal}>3</span>
                <span className={styles.graphLbl}>Decisions</span>
              </div>
              <div className={styles.graphBox}>
                <Users size={18} className={styles.graphIcon} />
                <span className={styles.graphVal}>6</span>
                <span className={styles.graphLbl}>Contacts</span>
              </div>
            </div>
          </div>
        )}

        {/* DRAFT REVIEW MODAL */}
        <DraftReviewModal
          isOpen={!!activeModalDraft}
          onClose={() => setActiveModalDraft(null)}
          draft={activeModalDraft}
          onApprove={handleApprove}
        />
      </div>
    </section>
  );
};

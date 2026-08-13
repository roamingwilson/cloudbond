"use client";

import React from "react";
import styles from "./Integrations.module.css";
import { CloudBondLogoIcon } from "../Navigation/Navigation";
import { Sparkles, Mail, Calendar, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export const Integrations: React.FC = () => {
  const tools = [
    { name: "Gmail", icon: "✉️", color: "#EA4335" },
    { name: "Google Calendar", icon: "📅", color: "#4285F4" },
    { name: "Slack", icon: "💬", color: "#E01E5A" },
    { name: "Notion", icon: "📄", color: "#141412" },
    { name: "Google Drive", icon: "📁", color: "#0F9D58" },
    { name: "Salesforce", icon: "☁️", color: "#00A1E0" },
    { name: "HubSpot", icon: "🟧", color: "#FF7A59" },
  ];

  return (
    <section className={styles.section} id="integrations">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.kicker}>Connected Ecosystem</span>
          <h2 className={styles.headline}>
            Cloud Bond works across the <span className={styles.serifItalic}>tools you already use.</span>
          </h2>
          <p className={styles.subheadline}>
            No complex custom API engineering or workflow builders needed. Connect your tools in seconds and delegate immediately.
          </p>
        </div>

        {/* Horizontal Intelligent Infrastructure Pipeline */}
        <div className={styles.pipelineContainer}>
          {/* Tools Badge Bar */}
          <div className={styles.toolsBar}>
            {tools.map((tool, idx) => (
              <div key={idx} className={styles.toolBadge}>
                <span className={styles.toolIcon}>{tool.icon}</span>
                <span className={styles.toolName}>{tool.name}</span>
              </div>
            ))}
          </div>

          {/* Connected Data Flow Diagram */}
          <div className={styles.flowSurface}>
            <div className={styles.flowNode}>
              <Mail size={18} className={styles.nodeIcon} />
              <div className={styles.nodeText}>
                <span className={styles.nodeTitle}>Email & Chat</span>
                <span className={styles.nodeSub}>Inbox context</span>
              </div>
            </div>

            <div className={styles.flowPath}>
              <div className={styles.pathLine} />
              <ArrowRight size={14} className={styles.pathArrow} />
            </div>

            <div className={styles.flowNodeCenter}>
              <CloudBondLogoIcon size={24} />
              <div className={styles.nodeText}>
                <span className={styles.nodeTitleCenter}>Cloud Bond</span>
                <span className={styles.nodeSubCenter}>Context Synthesis</span>
              </div>
            </div>

            <div className={styles.flowPath}>
              <div className={styles.pathLine} />
              <ArrowRight size={14} className={styles.pathArrow} />
            </div>

            <div className={styles.flowNode}>
              <Calendar size={18} className={styles.nodeIcon} />
              <div className={styles.nodeText}>
                <span className={styles.nodeTitle}>Calendar</span>
                <span className={styles.nodeSub}>Briefs & Syncs</span>
              </div>
            </div>

            <div className={styles.flowPath}>
              <div className={styles.pathLine} />
              <ArrowRight size={14} className={styles.pathArrow} />
            </div>

            <div className={styles.flowNode}>
              <FileText size={18} className={styles.nodeIcon} />
              <div className={styles.nodeText}>
                <span className={styles.nodeTitle}>Docs & CRM</span>
                <span className={styles.nodeSub}>Filing & Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import styles from "./DraftReviewModal.module.css";
import { X, CheckCircle2, Mail, Calendar, FileText, Send, Sparkles } from "lucide-react";

export interface DraftItem {
  id: string;
  type: "email" | "calendar" | "task";
  recipient: string;
  role: string;
  company: string;
  subject: string;
  content: string;
  suggestedTime?: string;
  contextSources: string[];
}

interface DraftReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  draft: DraftItem | null;
  onApprove: (id: string) => void;
}

export const DraftReviewModal: React.FC<DraftReviewModalProps> = ({
  isOpen,
  onClose,
  draft,
  onApprove,
}) => {
  const [editedContent, setEditedContent] = useState("");
  const [approvedState, setApprovedState] = useState(false);

  React.useEffect(() => {
    if (draft) {
      setEditedContent(draft.content);
      setApprovedState(false);
    }
  }, [draft]);

  if (!isOpen || !draft) return null;

  const handleApproveAction = () => {
    setApprovedState(true);
    setTimeout(() => {
      onApprove(draft.id);
      onClose();
    }, 900);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Sparkles size={18} className={styles.sparkleIcon} />
            <div>
              <h3>Review Action Draft</h3>
              <p>Cloud Bond prepared this action based on recent thread context</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.body}>
          {/* Recipient & Metadata Bar */}
          <div className={styles.metaBox}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>To:</span>
              <span className={styles.metaValue}>{draft.recipient} &lt;{draft.recipient.toLowerCase().replace(" ", ".")}@{draft.company.toLowerCase().replace(/[^a-z]/g, "")}.com&gt;</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Role:</span>
              <span className={styles.metaValue}>{draft.role} at {draft.company}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Subject:</span>
              <span className={styles.metaValueStrong}>{draft.subject}</span>
            </div>
          </div>

          {/* Context Sources Pills */}
          <div className={styles.sourcesBox}>
            <span className={styles.sourcesLabel}>Sources analyzed:</span>
            <div className={styles.pillsList}>
              {draft.contextSources.map((source, i) => (
                <span key={i} className={styles.sourcePill}>
                  {i % 2 === 0 ? <Mail size={12} /> : <FileText size={12} />}
                  {source}
                </span>
              ))}
            </div>
          </div>

          {/* Draft Message Editor */}
          <div className={styles.editorBox}>
            <div className={styles.editorHeader}>
              <span>Generated Message Draft</span>
              <span className={styles.editableHint}>Click to edit message</span>
            </div>
            <textarea
              className={styles.textarea}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={7}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Close
          </button>
          {approvedState ? (
            <div className={styles.approvedNotice}>
              <CheckCircle2 size={16} />
              <span>Approved & Executed Successfully!</span>
            </div>
          ) : (
            <button className={styles.approveBtn} onClick={handleApproveAction}>
              <Send size={14} />
              <span>Approve & Execute Action</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

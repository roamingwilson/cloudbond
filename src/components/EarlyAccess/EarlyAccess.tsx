"use client";

import React, { useState } from "react";
import styles from "./EarlyAccess.module.css";
import { X, CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { CloudBondLogoIcon } from "../Navigation/Navigation";

interface EarlyAccessProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const EarlyAccess: React.FC<EarlyAccessProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalLogoBox}>
                <CloudBondLogoIcon size={22} />
              </div>
              <div>
                <h3 className={styles.modalTitle}>Join Cloud Bond Early Access</h3>
                <p className={styles.modalDesc}>
                  Be among the first professionals to delegate work to an AI employee.
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className={styles.trustRow}>
              <span className={styles.trustBadge}>
                <Sparkles size={12} /> Limited Founder Cohort
              </span>
              <span className={styles.trustBadge}>
                <ShieldCheck size={12} /> Privacy Guaranteed
              </span>
              <span className={styles.trustBadge}>
                Zero Spam
              </span>
            </div>

            {/* Form */}
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Full Name</label>
                <input
                  type="text"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Work Email</label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Company (optional)</label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                <span>Reserve My Access Spot</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIconBox}>
              <CheckCircle2 size={28} />
            </div>
            <h3 className={styles.modalTitle}>Spot Reserved!</h3>
            <p className={styles.modalDesc}>
              Thank you, {name || "there"}. We've saved your spot for early access.
              You will hear from the Wilson Cloud team as soon as onboarding opens.
            </p>
            <button className={styles.closeModalBtn} onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

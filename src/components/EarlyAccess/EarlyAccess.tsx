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
  const [error, setError] = useState("");

  const handleClose = () => {
    setError("");
    setSubmitted(false);
    setEmail("");
    setName("");
    setCompany("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please add your name and work email to continue.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose} role="presentation">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="early-access-title">
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close early access form">
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
                <h3 id="early-access-title" className={styles.modalTitle}>Join Cloud Bond Early Access</h3>
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
                <label className={styles.inputLabel} htmlFor="early-access-name">Full Name</label>
                <input
                  id="early-access-name"
                  type="text"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="early-access-email">Work Email</label>
                <input
                  id="early-access-email"
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="early-access-company">Company (optional)</label>
                <input
                  id="early-access-company"
                  type="text"
                  placeholder="Acme Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={styles.input}
                />
              </div>
              {error && <p role="alert" style={{ color: "var(--accent-purple)", fontSize: "0.8rem" }}>{error}</p>}
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
              Thank you, {name || "there"}. We&apos;ve saved your spot for early access.
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

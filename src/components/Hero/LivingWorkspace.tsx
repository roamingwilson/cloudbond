"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LivingWorkspace.module.css";
import { CloudBondLogoIcon } from "../Navigation/Navigation";
import { DraftReviewModal, DraftItem } from "../InteractiveModal/DraftReviewModal";
import {
  ArrowUp,
  CheckCircle2,
  Calendar,
  Mail,
  FileText,
  Sparkles,
  UserCheck,
  Building2,
  Check,
  AlertCircle,
  Eye,
  ChevronDown,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// App Logos SVGs
const GmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" fill="#EA4335" fillOpacity="0.15" />
    <path d="M20 6L12 13L4 6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SlackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 15A3 3 0 109 18V15H6zM15 6A3 3 0 1018 9H15V6zM9 15A3 3 0 106 12H9v3zM15 9A3 3 0 1012 6v3h3z" fill="#E01E5A" fillOpacity="0.2" stroke="#E01E5A" strokeWidth="1.8" />
  </svg>
);

const DriveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 17H7.5L12 8.5L16.5 17H21L12 2Z" fill="#0F9D58" fillOpacity="0.8" />
    <path d="M3 17L7.5 21H16.5L21 17H3Z" fill="#4285F4" fillOpacity="0.8" />
  </svg>
);

const NotionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="3" fill="#141412" />
    <path d="M8 8V16L12 12V16L16 8V12" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SalesforceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M19.5 9A4.5 4.5 0 0015.2 6a5.5 5.5 0 00-9.4 2.8A4.5 4.5 0 001.5 13a4.5 4.5 0 004.5 4.5h13.5a3.5 3.5 0 000-7z" fill="#00A1E0" fillOpacity="0.2" stroke="#00A1E0" strokeWidth="1.8" />
  </svg>
);

// The demo runs through 9 discrete stages. Scroll progress (or autoplay)
// advances `stage`; every reveal below is derived from it.
const STAGE_MAX = 9;
const DEFAULT_COMMAND = "Handle my day.";

// Scroll-progress (0..1) thresholds -> stage index (0..9)
const STAGE_THRESHOLDS = [0.05, 0.16, 0.28, 0.4, 0.51, 0.62, 0.73, 0.84, 0.93];
const stageFromProgress = (p: number): number => {
  let s = 0;
  for (let i = 0; i < STAGE_THRESHOLDS.length; i++) {
    if (p >= STAGE_THRESHOLDS[i]) s = i + 1;
  }
  return s;
};

export const LivingWorkspace: React.FC<{ onJoinClick?: () => void }> = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [stage, setStage] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [scrollDriven, setScrollDriven] = useState(false);
  const [typing, setTyping] = useState(true);
  const [approvedItems, setApprovedItems] = useState<Record<string, boolean>>({});
  const [activeModalDraft, setActiveModalDraft] = useState<DraftItem | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const engagedRef = useRef(false);
  const stageValRef = useRef(0);
  const playTimerRef = useRef<number | null>(null);
  const typeTimerRef = useRef<number | null>(null);

  // Keep a stage value in a ref so the ScrollTrigger callback can read it
  // without re-subscribing on every render.
  const updateStage = (s: number) => {
    stageValRef.current = s;
    setStage(s);
  };

  const clearTimers = () => {
    if (playTimerRef.current) window.clearTimeout(playTimerRef.current);
    playTimerRef.current = null;
  };

  // Advance stage -> STAGE_MAX on a timer (used for autoplay + on-engage playback)
  const advanceFrom = (from: number) => {
    clearTimers();
    let s = from;
    const step = () => {
      s += 1;
      updateStage(s);
      if (s < STAGE_MAX) {
        playTimerRef.current = window.setTimeout(step, 280);
      }
    };
    playTimerRef.current = window.setTimeout(step, 280);
  };

  // Suggested Prompts
  const suggestedPrompts = [
    "Handle my day.",
    "Prepare tomorrow's client meetings.",
    "Follow up with everyone waiting for a response.",
    "Find everything we have about Acme.",
    "Organize this project.",
  ];

  // Quick Chips
  const chips = [
    { label: "3 meetings today", icon: "📅" },
    { label: "7 customer replies waiting", icon: "💬" },
    { label: "2 urgent tasks", icon: "☑️" },
    { label: "1 contract deadline", icon: "📄" },
  ];

  // Draft Data for Review Modal
  const draftDetails: Record<string, DraftItem> = {
    sarah_followup: {
      id: "sarah_followup",
      type: "email",
      recipient: "Sarah Chen",
      role: "Head of Operations",
      company: "Acme Inc.",
      subject: "Re: Integration timeline & Strategic review preparation",
      content:
        "Hi Sarah,\n\nFollowing up on our discussion regarding the integration timeline. I've prepared our strategic review brief for tomorrow's 10:00 AM session.\n\nCould you confirm if the updated deployment specs meet your team's milestone requirements?\n\nBest regards,\nAlex",
      contextSources: ["12 Gmail threads", "Acme Notion Spec v2.4", "Calendar sync"],
    },
    acme_schedule: {
      id: "acme_schedule",
      type: "calendar",
      recipient: "Sarah Chen & Acme Team",
      role: "Executive Team",
      company: "Acme Inc.",
      subject: "Acme Project Review & Milestone Alignment",
      content:
        "Proposed Meeting Details:\n- Date: Thursday, 2:00 PM EST\n- Duration: 45 min\n- Agenda: Finalize Q4 contract extension & technical onboarding checklist.",
      suggestedTime: "Thu 2:00 PM",
      contextSources: ["Calendar availability", "Salesforce Account record"],
    },
  };

  // Typewriter for the command bar (delightful first-load touch, cancels on engage)
  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (engagedRef.current) return;
      i += 1;
      setInputValue(DEFAULT_COMMAND.slice(0, i));
      if (i < DEFAULT_COMMAND.length) {
        typeTimerRef.current = window.setTimeout(tick, 60);
      } else {
        setTyping(false);
      }
    };
    typeTimerRef.current = window.setTimeout(tick, 500);
    return () => {
      if (typeTimerRef.current) window.clearTimeout(typeTimerRef.current);
    };
  }, []);

  // Scroll-driven controller (or autoplay fallback).
  // Plain matchMedia (not gsap.matchMedia) so setup runs synchronously and
  // survives React StrictMode's mount/cleanup/mount cycle.
  useEffect(() => {
    const scrollQuery = window.matchMedia(
      "(min-width: 1120px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)"
    );
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let st: ScrollTrigger | null = null;

    const refresh = () => ScrollTrigger.refresh();

    const teardown = () => {
      if (st) {
        st.kill();
        st = null;
      }
      clearTimers();
      window.removeEventListener("load", refresh);
    };

    const setup = () => {
      teardown();
      if (engagedRef.current) return;

      if (scrollQuery.matches) {
        // Scroll drives the demo.
        setScrollDriven(true);
        updateStage(0);
        innerRef.current?.style.setProperty("--p", "0");

        st = ScrollTrigger.create({
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            if (engagedRef.current) return;
            const p = self.progress;
            innerRef.current?.style.setProperty("--p", p.toFixed(4));
            const s = stageFromProgress(p);
            if (s !== stageValRef.current) updateStage(s);
          },
        });

        // Recalculate after the tall track + fonts settle.
        requestAnimationFrame(refresh);
        window.setTimeout(refresh, 200);
        window.addEventListener("load", refresh);
      } else {
        // Fallback: no pinning — play the demo automatically.
        setScrollDriven(false);
        if (reduceQuery.matches) {
          updateStage(STAGE_MAX);
        } else {
          updateStage(0);
          advanceFrom(0);
        }
      }
    };

    setup();
    scrollQuery.addEventListener("change", setup);
    reduceQuery.addEventListener("change", setup);

    return () => {
      scrollQuery.removeEventListener("change", setup);
      reduceQuery.removeEventListener("change", setup);
      teardown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // User touched the demo -> hand over manual control; scroll stops driving state.
  const markEngaged = (restart: boolean) => {
    engagedRef.current = true;
    setEngaged(true);
    setTyping(false);
    if (typeTimerRef.current) window.clearTimeout(typeTimerRef.current);
    innerRef.current?.style.setProperty("--p", "1");
    if (restart) {
      updateStage(0);
      advanceFrom(0);
    } else if (stageValRef.current < STAGE_MAX) {
      advanceFrom(stageValRef.current);
    }
  };

  const triggerExecution = (commandText: string) => {
    setInputValue(commandText);
    markEngaged(true);
  };

  const handleApprove = (id: string) => {
    markEngaged(false);
    setApprovedItems((prev) => ({ ...prev, [id]: true }));
  };

  const handleOpenReview = (id: string) => {
    markEngaged(false);
    if (draftDetails[id]) {
      setActiveModalDraft(draftDetails[id]);
    }
  };

  // ---- Derived reveal state ----
  const done1 = stage >= 1; // Understanding your day
  const done2 = stage >= 2; // Reviewing calendar (tool badges)
  const c1 = stage >= 3; // Found 12 emails
  const c2 = stage >= 4; // Analyzed documents
  const c3 = stage >= 5; // Prepared brief
  const c4 = stage >= 6; // Identified follow-ups
  const showApprovals = stage >= 6;
  const donePending1 = stage >= 7;
  const donePending2 = stage >= 8;
  const allDone = stage >= 9;
  const itemsDone = Math.max(0, Math.min(4, stage - 2));
  const activeInProgress = scrollDriven && !engaged && stage > 0 && stage < STAGE_MAX;

  const pendingApprovals =
    2 - Object.values(approvedItems).filter(Boolean).length;

  return (
    <div className={styles.workspaceWrapper}>
      {/* 1. COMMAND INTERACTION AREA */}
      <div className={styles.commandContainer}>
        {/* Handwritten Annotation Note */}
        <div className={styles.handwrittenAnnotation}>
          <span>Just tell Cloud Bond what needs to get done.</span>
          <svg width="45" height="32" viewBox="0 0 50 35" fill="none" className={styles.annotationArrow}>
            <path
              d="M 5 5 Q 30 1 42 26 M 34 22 L 42 26 L 40 18"
              stroke="#57554F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Primary Interactive Command Bar */}
        <div className={`${styles.commandBar} ${isFocused ? styles.commandBarFocused : ""} ${activeInProgress ? styles.commandBarExecuting : ""}`}>
          <div className={styles.commandIconBox}>
            <CloudBondLogoIcon size={20} className={styles.logoIcon} />
          </div>
          <input
            type="text"
            className={styles.commandInput}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              markEngaged(false);
            }}
            onFocus={() => {
              setIsFocused(true);
              setTyping(false);
              if (typeTimerRef.current) window.clearTimeout(typeTimerRef.current);
            }}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                triggerExecution(inputValue);
              }
            }}
            placeholder="Tell Cloud Bond what needs to get done."
          />
          {typing && <span className={styles.typingCaret} aria-hidden />}
          <button
            className={styles.submitBtn}
            onClick={() => triggerExecution(inputValue)}
            aria-label="Submit command"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Context Suggestion Chips */}
        <div className={styles.chipsRow}>
          {chips.map((chip, i) => (
            <button
              key={i}
              type="button"
              className={styles.chipPill}
              onClick={() => triggerExecution(`Handle my ${chip.label}`)}
              aria-label={`Run Cloud Bond command: Handle my ${chip.label}`}
            >
              <span className={styles.chipIcon}>{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>

        {/* Suggested Dropdown Commands on Focus */}
        {isFocused && (
          <div className={styles.suggestionsDropdown}>
            <span className={styles.suggestionsLabel}>Suggested Delegations</span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                className={styles.suggestionItem}
                onMouseDown={() => triggerExecution(prompt)}
              >
                <Sparkles size={14} className={styles.suggestIcon} />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. LIVING SPATIAL WORKSPACE — scroll-scrubbed stage */}
      <div ref={trackRef} className={`${styles.scrollTrack} ${scrollDriven ? styles.scrollDriven : ""}`}>
        <div ref={innerRef} className={styles.stageInner}>
          <div className={styles.spatialSurface}>
            {/* Floating App Badges in Ambient 3D Depth */}
            <div className={`${styles.appBadge} ${styles.badgeGmail} animate-float`}>
              <GmailIcon />
            </div>
            <div className={`${styles.appBadge} ${styles.badgeSlackLeft} animate-float-reverse`}>
              <SlackIcon />
            </div>
            <div className={`${styles.appBadge} ${styles.badgeDriveLeft} animate-float`}>
              <DriveIcon />
            </div>
            <div className={`${styles.appBadge} ${styles.badgeNotionRight} animate-float-reverse`}>
              <NotionIcon />
            </div>
            <div className={`${styles.appBadge} ${styles.badgeSalesforceRight} animate-float`}>
              <SalesforceIcon />
            </div>
            <div className={`${styles.appBadge} ${styles.badgeSlackRight} animate-float-reverse`}>
              <SlackIcon />
            </div>

            {/* Grid Layout: Left Cards | Central Laptop Surface | Right Cards */}
            <div className={styles.workspaceGrid}>
              {/* LEFT CONTEXT CARDS COLUMN */}
              <div className={styles.leftColumn}>
                {/* Card 1: Calendar Context */}
                <div className={`${styles.contextCard} ${styles.calendarCard}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>
                      <Calendar size={14} />
                      <span>Tomorrow</span>
                    </div>
                    <span className={styles.cardLink}>View &gt;</span>
                  </div>
                  <div className={styles.calendarList}>
                    <div className={styles.calendarItem}>
                      <span className={styles.itemTime}>9:00</span>
                      <span className={styles.itemTitle}>Team stand-up</span>
                    </div>
                    <div className={`${styles.calendarItem} ${styles.activeCalendarItem}`}>
                      <span className={styles.itemTime}>10:00</span>
                      <div className={styles.itemBullet} />
                      <span className={styles.itemTitleStrong}>Acme — Strategic review</span>
                    </div>
                    <div className={styles.calendarItem}>
                      <span className={styles.itemTime}>1:30</span>
                      <span className={styles.itemTitle}>Northstar project sync</span>
                    </div>
                    <div className={styles.calendarItem}>
                      <span className={styles.itemTime}>4:00</span>
                      <span className={styles.itemTitle}>Product roadmap</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Acme Customer Context Card */}
                <div className={`${styles.contextCard} ${styles.customerCard}`}>
                  <div className={styles.customerHeader}>
                    <div className={styles.customerAvatar}>A</div>
                    <div>
                      <div className={styles.customerName}>Acme Inc.</div>
                      <div className={styles.customerSub}>Strategic customer</div>
                    </div>
                  </div>
                  <div className={styles.customerTags}>
                    <span className={styles.tagActive}>Active</span>
                    <span className={styles.tagSubtle}>Executive meeting</span>
                  </div>
                  <div className={styles.contactRow}>
                    <div className={styles.contactAvatar}>SC</div>
                    <div>
                      <div className={styles.contactName}>Sarah Chen</div>
                      <div className={styles.contactRole}>Head of Operations</div>
                    </div>
                  </div>
                  <div className={styles.statsGrid}>
                    <div className={styles.statBox}>
                      <span className={styles.statVal}>12</span>
                      <span className={styles.statLbl}>emails</span>
                    </div>
                    <div className={styles.statBox}>
                      <span className={styles.statVal}>3</span>
                      <span className={styles.statLbl}>meetings</span>
                    </div>
                    <div className={styles.statBox}>
                      <span className={styles.statVal}>4</span>
                      <span className={styles.statLbl}>docs</span>
                    </div>
                    <div className={styles.statBox}>
                      <span className={styles.statVal}>2</span>
                      <span className={styles.statLbl}>tasks</span>
                    </div>
                  </div>
                  <div className={styles.latestUpdate}>
                    <span>Latest: Re: Integration timeline - 2h ago</span>
                  </div>
                </div>
              </div>

              {/* CENTRAL WORKSPACE SURFACE (Laptop Component) */}
              <div className={`${styles.centralSurface} ${activeInProgress ? styles.centralSurfaceActive : ""}`}>
                <div className={styles.centralHeader}>
                  <div className={styles.centralTitleGroup}>
                    <Sparkles size={16} className={styles.sparkleAccent} />
                    <span>{allDone ? "Cloud Bond handled your day" : "Cloud Bond is working on your day"}</span>
                  </div>
                  <div className={`${styles.liveIndicator} ${allDone ? styles.liveIndicatorDone : ""}`}>
                    {allDone ? <Check size={12} /> : <span className={styles.livePulse} />}
                    <span>{allDone ? "Done" : "Live"}</span>
                  </div>
                </div>

                {/* Scrub progress line (only meaningful while scroll-driven) */}
                {scrollDriven && !engaged && (
                  <div className={styles.scrubTrack}>
                    <div className={styles.scrubFill} />
                  </div>
                )}

                {/* Execution Steps Workflow Panel */}
                <div className={styles.stepsPanel}>
                  {/* Step 1 */}
                  <div className={styles.stepRow}>
                    <div className={`${styles.stepCheck} ${done1 ? styles.stepCheckDone : ""}`}>
                      {done1 && <Check size={12} className={styles.checkPop} />}
                    </div>
                    <span className={done1 ? styles.textDone : ""}>
                      Understanding your day
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className={styles.stepRow}>
                    <div className={`${styles.stepCheck} ${done2 ? styles.stepCheckDone : ""}`}>
                      {done2 && <Check size={12} className={styles.checkPop} />}
                    </div>
                    <div className={styles.stepTextWithBadges}>
                      <span className={done2 ? styles.textDone : ""}>
                        Reviewing calendar and priorities
                      </span>
                      <div className={`${styles.toolBadgesMini} ${done2 ? "" : styles.toolBadgesHidden}`}>
                        <SlackIcon />
                        <GmailIcon />
                        <DriveIcon />
                        <NotionIcon />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Active Expanded Task */}
                  <div className={styles.stepRowActive}>
                    <div className={styles.stepHeaderActive}>
                      <div className={styles.stepNumberBadge}>3</div>
                      <span className={styles.activeTaskTitle}>
                        {itemsDone >= 4 ? "Prepared tomorrow's client meetings" : "Preparing tomorrow's client meetings"}
                      </span>
                      <div className={styles.progressBarWrapper}>
                        <div className={styles.progressBarFill} style={{ width: `${(itemsDone / 4) * 100}%` }} />
                      </div>
                      <span className={styles.progressCounter}>{itemsDone} of 4</span>
                    </div>

                    {/* Expanded Briefing Detail Box */}
                    <div className={styles.briefingBox}>
                      <div className={styles.briefingHeader}>
                        <div className={styles.briefingTitleGroup}>
                          <span className={styles.briefingAvatar}>A</span>
                          <span className={styles.briefingTitle}>Acme — Strategic review</span>
                        </div>
                        <span className={styles.briefingTime}>Tomorrow, 10:00 AM</span>
                      </div>

                      <div className={styles.briefingChecklist}>
                        <div className={`${styles.checkItem} ${c1 ? "" : styles.checkItemPending}`}>
                          {c1 ? <CheckCircle2 size={14} className={`${styles.iconDone} ${styles.checkPop}`} /> : <span className={styles.checkDot} />}
                          <span>Found 12 relevant emails</span>
                        </div>
                        <div className={`${styles.checkItem} ${c2 ? "" : styles.checkItemPending}`}>
                          {c2 ? <CheckCircle2 size={14} className={`${styles.iconDone} ${styles.checkPop}`} /> : <span className={styles.checkDot} />}
                          <span>Analyzed latest documents</span>
                        </div>
                        <div className={`${styles.checkItem} ${c3 ? "" : styles.checkItemPending}`}>
                          {c3 ? <CheckCircle2 size={14} className={`${styles.iconDone} ${styles.checkPop}`} /> : <span className={styles.checkDot} />}
                          <span>Prepared meeting brief</span>
                          {c3 && <span className={styles.statusBadgeReady}>Almost ready</span>}
                        </div>
                        <div className={`${styles.checkItem} ${c4 ? "" : styles.checkItemPending}`}>
                          {c4 ? <CheckCircle2 size={14} className={`${styles.iconDone} ${styles.checkPop}`} /> : <span className={styles.checkDot} />}
                          <span>Identified 2 follow-up items</span>
                          {c4 && <span className={styles.statusBadgeApproval}>Needs your approval</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pending Steps */}
                  <div className={styles.stepRow}>
                    <div className={`${donePending1 ? styles.stepCheckDone : styles.stepCheckPending}`}>
                      {donePending1 && <Check size={12} className={styles.checkPop} />}
                    </div>
                    <span className={donePending1 ? styles.textDone : styles.textPending}>
                      Following up with customers waiting for a response
                    </span>
                  </div>
                  <div className={styles.stepRow}>
                    <div className={`${donePending2 ? styles.stepCheckDone : styles.stepCheckPending}`}>
                      {donePending2 && <Check size={12} className={styles.checkPop} />}
                    </div>
                    <span className={donePending2 ? styles.textDone : styles.textPending}>
                      Organizing urgent tasks
                    </span>
                  </div>
                  <div className={styles.stepRow}>
                    <div className={`${allDone ? styles.stepCheckDone : styles.stepCheckPending}`}>
                      {allDone && <Check size={12} className={styles.checkPop} />}
                    </div>
                    <span className={allDone ? styles.textDone : styles.textPending}>
                      Summarizing key updates
                    </span>
                  </div>
                </div>

                {/* Bottom Floating Pill */}
                <div className={`${styles.centralBottomPill} ${allDone ? styles.pillDone : ""}`}>
                  <CheckCircle2 size={15} className={styles.pillCheckIcon} />
                  <div>
                    <span className={styles.pillTitle}>Everything is coming together.</span>{" "}
                    <span className={styles.pillSub}>You focus on decisions. Cloud Bond handles the rest.</span>
                  </div>
                </div>
              </div>

              {/* RIGHT CONTEXT CARDS COLUMN */}
              <div className={styles.rightColumn}>
                {/* Card 1: Needs your approval */}
                <div className={`${styles.contextCard} ${styles.approvalCard}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleApproval}>
                      <AlertCircle size={15} className={styles.bellIcon} />
                      <span>Needs your approval</span>
                    </div>
                    <span className={styles.approvalCountPill}>
                      {showApprovals ? Math.max(0, pendingApprovals) : 0}
                    </span>
                  </div>

                  <div className={styles.approvalList}>
                    {/* Item 1: Sarah Chen Followup */}
                    <div className={`${styles.approvalItem} ${showApprovals ? "" : styles.approvalHidden}`}>
                      <div className={styles.approvalItemTitle}>
                        <span className={styles.orangeDot} />
                        <span>Send follow-up to Sarah Chen</span>
                      </div>
                      <div className={styles.approvalSub}>No response for 3 days</div>
                      <div className={styles.approvalActionsRow}>
                        {approvedItems["sarah_followup"] ? (
                          <span className={styles.approvedLabel}>
                            <Check size={12} /> Approved
                          </span>
                        ) : (
                          <>
                            <button
                              className={styles.btnReview}
                              onClick={() => handleOpenReview("sarah_followup")}
                            >
                              <Eye size={12} /> Review
                            </button>
                            <button
                              className={styles.btnApprove}
                              onClick={() => handleApprove("sarah_followup")}
                            >
                              Approve
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Item 2: Schedule Acme review */}
                    <div className={`${styles.approvalItem} ${showApprovals ? "" : styles.approvalHidden}`} style={{ transitionDelay: showApprovals ? "0.12s" : "0s" }}>
                      <div className={styles.approvalItemTitle}>
                        <span className={styles.orangeDot} />
                        <span>Schedule Acme project review</span>
                      </div>
                      <div className={styles.approvalSub}>Suggested: Thu 2:00 PM</div>
                      <div className={styles.approvalActionsRow}>
                        {approvedItems["acme_schedule"] ? (
                          <span className={styles.approvedLabel}>
                            <Check size={12} /> Approved
                          </span>
                        ) : (
                          <>
                            <button
                              className={styles.btnReview}
                              onClick={() => handleOpenReview("acme_schedule")}
                            >
                              <Eye size={12} /> Review
                            </button>
                            <button
                              className={styles.btnApprove}
                              onClick={() => handleApprove("acme_schedule")}
                            >
                              Approve
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Recent Activity Card */}
                <div className={`${styles.contextCard} ${styles.activityCard}`}>
                  <div className={styles.cardHeader}>
                    <span className={styles.activityTitle}>Recent activity</span>
                    <span className={styles.cardLink}>View all</span>
                  </div>

                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      <FileText size={14} className={styles.activityIcon} />
                      <div>
                        <div className={styles.actTitle}>Contract updated</div>
                        <div className={styles.actMeta}>Northstar • 15m ago</div>
                      </div>
                    </div>

                    <div className={styles.activityItem}>
                      <FileText size={14} className={styles.activityIcon} />
                      <div>
                        <div className={styles.actTitle}>Meeting brief ready</div>
                        <div className={styles.actMeta}>Acme • 26m ago</div>
                      </div>
                    </div>

                    <div className={styles.activityItem}>
                      <Mail size={14} className={styles.activityIcon} />
                      <div>
                        <div className={styles.actTitle}>3 customer replies drafted</div>
                        <div className={styles.actMeta}>Today • 1h ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll affordance while the demo is scroll-driven */}
          {scrollDriven && (
            <div className={`${styles.scrollHint} ${engaged || stage >= STAGE_MAX ? styles.scrollHintHidden : ""}`}>
              <span>{stage === 0 ? "Scroll to watch Cloud Bond work" : "Keep scrolling"}</span>
              <ChevronDown size={14} className={styles.scrollChevron} />
            </div>
          )}
        </div>
      </div>

      {/* 3. BOTTOM CAPABILITIES SUMMARY ROW (5 Pillars matching reference image) */}
      <div className={styles.capabilitiesRow}>
        <div className={styles.capabilityCol}>
          <div className={styles.capIconBox}>
            <Building2 size={16} />
          </div>
          <div>
            <div className={styles.capTitle}>Understands your business</div>
            <div className={styles.capDesc}>Connects to the tools you already use</div>
          </div>
        </div>

        <div className={styles.capabilityCol}>
          <div className={styles.capIconBox}>
            <FileText size={16} />
          </div>
          <div>
            <div className={styles.capTitle}>Plans the work</div>
            <div className={styles.capDesc}>Breaks intent into clear next steps</div>
          </div>
        </div>

        <div className={styles.capabilityCol}>
          <div className={styles.capIconBox}>
            <Sparkles size={16} />
          </div>
          <div>
            <div className={styles.capTitle}>Takes action</div>
            <div className={styles.capDesc}>Gets real work done across your systems</div>
          </div>
        </div>

        <div className={styles.capabilityCol}>
          <div className={styles.capIconBox}>
            <UserCheck size={16} />
          </div>
          <div>
            <div className={styles.capTitle}>Asks for approval</div>
            <div className={styles.capDesc}>Keeps you in control where it matters</div>
          </div>
        </div>

        <div className={styles.capabilityCol}>
          <div className={styles.capIconBox}>
            <CheckCircle2 size={16} />
          </div>
          <div>
            <div className={styles.capTitle}>Reports back</div>
            <div className={styles.capDesc}>Shows what's done, what's next</div>
          </div>
        </div>
      </div>

      {/* DRAFT REVIEW MODAL */}
      <DraftReviewModal
        isOpen={!!activeModalDraft}
        onClose={() => setActiveModalDraft(null)}
        draft={activeModalDraft}
        onApprove={handleApprove}
      />
    </div>
  );
};

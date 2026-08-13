"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { SecondaryDemos } from "@/components/Demos/SecondaryDemos";
import { Integrations } from "@/components/Integrations/Integrations";
import { Trust } from "@/components/Trust/Trust";
import { EarlyAccess } from "@/components/EarlyAccess/EarlyAccess";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <main style={{ minHeight: "100vh", position: "relative", backgroundColor: "var(--canvas)" }}>
      <Navigation onJoinClick={handleOpenModal} />
      <Hero onJoinClick={handleOpenModal} />
      <HowItWorks />
      <SecondaryDemos />
      <Integrations />
      <Trust />
      <EarlyAccess
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onOpen={handleOpenModal}
      />
      <Footer onJoinClick={handleOpenModal} />
    </main>
  );
}

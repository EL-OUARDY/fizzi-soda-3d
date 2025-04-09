"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SkyDive from "@/components/SkyDive";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="px-4 md:px-6">
          <Hero />
          <SkyDive />
        </div>
      </main>
    </>
  );
}

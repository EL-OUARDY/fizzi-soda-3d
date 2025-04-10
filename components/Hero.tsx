"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useStore from "@/hooks/useStore";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Environment, View } from "@react-three/drei";
import CansScene from "@/components/scenes/CansScene";
import Bubbles from "@/components/Bubbles";
import Bounded from "@/components/BoundedContainer";
import TextSplitter from "@/components/TextSplitter";
import Image from "next/image";
import cansImage from "@/public/img/cans.png";
import VerticalFadeLayer from "./VerticalFadeLayer";

gsap.registerPlugin(useGSAP);

function Hero() {
  const { ready, setBackground } = useStore();
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      // Initial entrance animation timeline
      const introTl = gsap.timeline();

      introTl
        // Make hero visible
        .set(".hero", { opacity: 1 })
        // Animate main title with zoom effect
        .from(".hero-title", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1,
        })
        // Fade in subheading with slight upward motion
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        // Fade in body text
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        // Fade in CTA button
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });

      // Scroll-triggered animation timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: () => {
            // Grab the current color on each tick:
            const color = gsap.getProperty("body", "backgroundColor");
            // Store it in state:
            setBackground(color.toString());
          },
        },
      });

      scrollTl
        // Background color transition on scroll
        .fromTo(
          "body",
          {
            backgroundColor: "#FDE047",
          },
          {
            backgroundColor: "#D9F99D",
            overwrite: "auto",
          },
          1,
        )
        // Animate flavor section title characters
        .from(".flavors-title .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        // Fade in flavor section body text
        .from(".flavors-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded className="hero opacity-0">
      <View className="pointer-events-none sticky top-0 z-100 -mt-[100vh] h-screen w-screen">
        {isDesktop && <CansScene />}
        <Bubbles />
        <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
      </View>
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="text-8xl leading-[.8] font-black text-orange-500 uppercase md:text-7xl md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                className="hero-title"
                text={"LIVE GUTSY"}
                display="block"
                onlyWords
              />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              Soda Perfected
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              3-5g sugar. 9g fiber. 5 delicious flavors.
            </div>
            <button className="hero-button mt-12 cursor-pointer rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-orange-700 md:text-2xl">
              Shop Now
            </button>
          </div>
        </div>

        <div className="text-side relative grid items-center gap-4 md:h-screen md:grid-cols-2">
          <div className="z-101">
            <h2 className="text-side-heading text-6xl font-black text-balance text-sky-950 uppercase lg:text-8xl">
              <TextSplitter
                className="flavors-title"
                text={"Try all five flavors"}
              />
            </h2>
            <div className="flavors-body text-side-body mt-4 max-w-xl text-xl font-normal text-balance text-sky-950">
              Our soda is made with real fruit juice and a touch of cane sugar.
              We never use artificial sweeteners or high fructose corn syrup.
              Try all five flavors and find your favorite!
            </div>
          </div>
          <div className="relative h-full w-full md:hidden">
            <Image
              src={cansImage}
              alt="All flavors"
              width={500}
              height={500}
              quality={100}
              priority
              className="my-10 w-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Gradient overlay at the bottom of the hero section for a smooth visual transition */}
      <VerticalFadeLayer className="pointer-events-none z-109 -mt-20 h-20 w-screen" />
    </Bounded>
  );
}

export default Hero;

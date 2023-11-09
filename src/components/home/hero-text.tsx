"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroText({ animateHash }: { animateHash: string }) {
  const start = {
    opacity: 0,
  };

  const end = {
    opacity: 1,
  };

  return (
    <div className="flex flex-col gap-2 items-center text-center">
      <motion.h1
        initial={start}
        animate={end}
        transition={{
          duration: 1,
        }}
        className="text-4xl font-bold md:text-5xl"
      >
        Wellcome to <span className="text-violet-500">panoptico</span>
      </motion.h1>
      <motion.p
        initial={start}
        animate={end}
        transition={{
          duration: 1,
          delay: 0.8,
        }}
        className="md:text-xl"
      >
        A sample web-app for real-time event tracking
      </motion.p>
    </div>
  );
}

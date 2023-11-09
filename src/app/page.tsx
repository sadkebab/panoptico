import { HeroText } from "@/components/home/hero-text";
import { nanoid } from "nanoid";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description: "A custom event tracking solution",
};

export default function Home() {
  const hash = nanoid();
  return (
    <div className="bg-background">
      <div className="flex w-full h-[95vh] flex-col items-center justify-center p-8 md:p-24">
        <HeroText animateHash={hash} />
      </div>
      <div className="flex flex-col p-8 md:p-24 gap-2 items-center">
        <h2 className="text-3xl font-bold">How to use</h2>
        <div className="text-lg">
          <p className="">
            1. Open the{" "}
            <Link
              href={"/playground"}
              className="font-bold text-cyan-500"
              target="_blank"
            >
              playground
            </Link>
          </p>
          <p>2. Trigger some events</p>
          <p>
            3. Open the{" "}
            <Link
              href={"/dashboard"}
              className="font-bold text-teal-500"
              target="_blank"
            >
              dashboard
            </Link>
          </p>
          <p>4. Look at the charts</p>
          <p>5. Keep both windows open side to side</p>
          <p>6. Look the dashboard update in real-time</p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface MeteorStyle {
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([]);

  useEffect(() => {
    const meteorCount = number || 20;
    const styles: MeteorStyle[] = [];

    for (let idx = 0; idx < meteorCount; idx++) {
      // Calculate position to evenly distribute meteors across container width
      const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered

      styles.push({
        top: "-40px", // Start above the container
        left: position + "px",
        animationDelay: Math.random() * 5 + "s", // Random delay between 0-5s
        animationDuration: Math.floor(Math.random() * (10 - 5) + 5) + "s", // Random duration between 5-10s
      });
    }

    setMeteorStyles(styles);
  }, [number]);

  if (meteorStyles.length === 0) {
    return null; // Don't render anything until client-side styles are ready
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className,
          )}
          style={style}
        ></span>
      ))}
    </motion.div>
  );
};

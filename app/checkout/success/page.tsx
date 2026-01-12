"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const redirectStatus = searchParams.get("redirect_status");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Variant for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
              >
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
              </motion.div>

              {/* Decorative rings */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeOut",
                  delay: 1,
                }}
                className="absolute inset-0 rounded-full border-2 border-green-500/50"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your order has been confirmed and is
              being processed.
            </p>
          </motion.div>

          {/* Info Card */}
          <motion.div
            variants={itemVariants}
            className="bg-secondary/50 rounded-2xl p-6 mb-8 border border-border/50 text-left space-y-3"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Order Status</span>
              <span className="font-semibold text-green-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 ml-1 inline-block" />
                Confirmed
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Currency</span>
              <span className="font-medium">CZK</span>
            </div>
            {redirectStatus && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Reference</span>
                <span className="font-mono text-xs bg-background/50 px-2 py-1 rounded">
                  {redirectStatus === "succeeded"
                    ? "COMPLETED"
                    : redirectStatus.toUpperCase()}
                </span>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <Link href="/" passHref className="w-full">
              <Button size="lg" className="w-full font-semibold group">
                Return to Home
                <Home className="ml-2 w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

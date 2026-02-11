"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RotateCcw, XCircle } from "lucide-react";

interface CheckoutErrorProps {
  error: string;
}

export function CheckoutError({ error }: CheckoutErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-in fade-in zoom-in duration-300">
      <Card className="w-full max-w-md border-primary/20 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        <CardHeader className="text-center pb-2">
          <div className="mx-auto rounded-full bg-destructive/10 p-4 mb-4">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Platba se nezdařila
          </CardTitle>
          <CardDescription className="text-base mt-2">{error}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center pb-8">
          <Button
            size="lg"
            variant="default"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Zkusit znovu
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

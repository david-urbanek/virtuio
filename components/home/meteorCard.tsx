import React from "react";
import { Meteors } from "@/components/ui/meteors";

export default function MeteorCard() {
  return (
    <div className="relative w-full max-w-xl hover:translate-y-[-10px] transition-all hover:shadow-xl">
      <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full" />
      <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
        <h3 className="relative z-50 mb-4 text-xl font-bold text-white">
          Jak probíhá proces rezervace?
        </h3>

        <p className="relative z-50 mb-4 text-base font-normal text-gray-200">
          Po odeslání{" "}
          <span className="font-semibold text-white">nezávazné rezervace</span>{" "}
          Vám do 24&nbsp;hodin zašleme fakturu s částkou za pronájem. Po jejím
          uhrazení Vám{" "}
          <span className="font-semibold text-white">
            {" "}
            VR headset zarezervujeme
          </span>{" "}
          na Vámi zvolený termín.
        </p>

        {/* Meaty part - Meteor effect */}
        <Meteors number={20} />
      </div>
    </div>
  );
}

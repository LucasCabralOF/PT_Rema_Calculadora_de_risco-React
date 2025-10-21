"use client";

import { useState } from "react";
import { calculateRisk } from "../lib/calculator";
import { getRfD, listContaminants } from "../lib/contaminants";
import { IntakeParameters, RiskResult } from "../lib/types/types";

export default function CalculatorPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mt-10"></h1>
    </div>
  );
}

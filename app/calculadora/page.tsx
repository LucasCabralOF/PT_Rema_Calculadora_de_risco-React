"use client";

import { useState, useMemo } from "react"; // 1. Importe o useMemo
import { calculateRisk } from "../../lib/calculator";
import { getRfD, listContaminants } from "../../lib/contaminants";
import type { IntakeParameters, RiskResult } from "../../lib/types/types";

export default function Calculadora() {
  const [contaminant, setContaminant] = useState("");
  const [cValue, setCValue] = useState("");
  const [irValue, setIrValue] = useState("");
  const [efValue, setEfValue] = useState("");
  const [edValue, setEdValue] = useState("");
  const [bwValue, setBwValue] = useState("");
  const [atValue, setAtValue] = useState("");
  const [result, setResult] = useState<RiskResult | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const allContaminants = useMemo(() => listContaminants(), []);

  const filteredContaminants = useMemo(() => {
    if (contaminant === "") {
      // Se o campo estiver vazio, mostre a lista completa
      return allContaminants;
    }

    return allContaminants.filter((name) =>
      name.toLowerCase().includes(contaminant.toLowerCase()),
    );
  }, [contaminant, allContaminants]);

  const handleCalculate = () => {
    if (!contaminant) {
      alert("Por favor, selecione um contaminante.");
      return;
    }

    const params: IntakeParameters = {
      C: Number(cValue),
      IR: Number(irValue),
      EF: Number(efValue),
      ED: Number(edValue),
      BW: Number(bwValue),
      AT: Number(atValue),
    };

    if (Object.values(params).some((v) => isNaN(v) || v < 0)) {
      alert("Erro: preencha todos os campos com números válidos e positivos.");
      return;
    }

    if (params.BW === 0 || params.AT === 0) {
      alert("Erro: Peso corporal e tempo médio não podem ser zero.");
      return;
    }

    const rfd = getRfD(contaminant);
    if (!rfd) {
      alert(`Erro: O contaminante "${contaminant}" não foi encontrado.`);
      return;
    }

    const calculationResult = calculateRisk(rfd, params);
    setResult(calculationResult);
  };

  return (
    <main className="min-h-screen bg-gradient-to-t from-white to-lime-100 flex flex-col py-10">
      <div className=" bg-white rounded-lg shadow p-6  sm:w-3/4 lg:w-1/2 mx-auto">
        <h1 className="text-center text-gray-700 text-2xl font-bold mb-6">
          Calculadora de Risco Não-Cancerígeno
        </h1>

        <div className="mb-4 relative">
          {" "}
          <label
            htmlFor="contaminant"
            className="block mb-2 font-semibold text-gray-700"
          >
            Selecione o contaminante:
          </label>
          <input
            type="text"
            id="contaminant"
            value={contaminant}
            onChange={(e) => {
              setContaminant(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => {
              setTimeout(() => setIsDropdownOpen(false), 200);
            }}
            placeholder="Digite para buscar..."
            autoComplete="off"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
          />
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredContaminants.length > 0 ? (
                filteredContaminants.map((name) => (
                  <li
                    key={name}
                    className="px-4 py-2 text-black hover:bg-lime-100 cursor-pointer"
                    onMouseDown={() => {
                      setContaminant(name);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 italic">
                  Nenhum contaminante encontrado.
                </li>
              )}
            </ul>
          )}
        </div>

        {[
          {
            id: "C",
            label: "C (mg/L ou mg/kg):",
            value: cValue,
            set: setCValue,
          },
          {
            id: "IR",
            label: "IR (L/dia ou kg/dia):",
            value: irValue,
            set: setIrValue,
          },
          {
            id: "EF",
            label: "EF (dias/ano):",
            value: efValue,
            set: setEfValue,
          },
          { id: "ED", label: "ED (anos):", value: edValue, set: setEdValue },
          { id: "BW", label: "BW (kg):", value: bwValue, set: setBwValue },
          { id: "AT", label: "AT (dias):", value: atValue, set: setAtValue },
        ].map(({ id, label, value, set }) => (
          <div key={id} className="mb-4">
            <label
              htmlFor={id}
              className="block mb-2 font-semibold text-gray-700"
            >
              {label}
            </label>
            <input
              type="number"
              id={id}
              placeholder="Ex: 1.5"
              step="any"
              value={value}
              onChange={(e) => set(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
            />
          </div>
        ))}

        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-lg font-semibold transition-colors duration-300"
        >
          Calcular
        </button>

        {result && (
          <div className="mt-6 p-4 bg-white border border-lime-600 rounded-lg transition-colors duration-300">
            <h3 className="text-gray-700 font-bold mb-2">
              Resultado da Análise:
            </h3>
            <p>
              <strong>Ingestão (I):</strong> {result.I.toExponential(4)}{" "}
              mg/(kg·dia)
            </p>
            <p>
              <strong>Quociente de Risco (QR):</strong> {result.QR.toFixed(4)}
            </p>
            <p>
              <strong>Conclusão:</strong> {result.risk}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

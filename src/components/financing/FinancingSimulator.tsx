"use client";

import { useState } from "react";
import { Calculator, MessageCircle, ArrowRight } from "lucide-react";
import { calcularFinanciamento, formatarPreco, WHATSAPP_NUMBER } from "@/lib/utils";

interface FinancingSimulatorProps {
  valorInicial?: number;
  nomeVeiculo?: string;
}

export function FinancingSimulator({ valorInicial, nomeVeiculo }: FinancingSimulatorProps) {
  const [valorVeiculo, setValorVeiculo] = useState(valorInicial || 0);
  const [entrada, setEntrada] = useState(0);
  const [parcelas, setParcelas] = useState(48);
  const [taxa, setTaxa] = useState(1.5);
  const [resultado, setResultado] = useState<ReturnType<typeof calcularFinanciamento> | null>(null);

  const simular = () => {
    if (valorVeiculo <= 0 || entrada >= valorVeiculo) return;
    setResultado(calcularFinanciamento(valorVeiculo, entrada, parcelas, taxa));
  };

  const enviarWhatsApp = () => {
    if (!resultado) return;
    const msg =
      `Olá! Tenho interesse em financiar${nomeVeiculo ? ` o *${nomeVeiculo}*` : " um veículo"} pela VDcar.\n\n` +
      `📊 *Simulação:*\n` +
      `• Veículo: ${formatarPreco(valorVeiculo)}\n` +
      `• Entrada: ${formatarPreco(entrada)}\n` +
      `• Financiado: ${formatarPreco(resultado.valorFinanciado)}\n` +
      `• ${resultado.parcelas}x de ${formatarPreco(resultado.valorParcela)}\n` +
      `• Taxa: ${resultado.taxaJuros}% a.m.\n` +
      `• Total: ${formatarPreco(resultado.totalPago)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const pct = valorVeiculo > 0 ? Math.round((entrada / valorVeiculo) * 100) : 0;

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 border-b border-zinc-100 flex items-center gap-3 bg-zinc-50">
        <div className="w-9 h-9 bg-zinc-900 rounded-xl flex items-center justify-center">
          <Calculator className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-zinc-900 font-bold">Simulador de Financiamento</h2>
          <p className="text-zinc-400 text-xs mt-0.5">Calcule as condições do seu financiamento</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Valor do Veículo (R$)</label>
            <input type="number" value={valorVeiculo || ""}
              onChange={(e) => setValorVeiculo(Number(e.target.value))}
              placeholder="Ex: 80.000" className="input" />
          </div>
          <div>
            <label className="label">
              Entrada (R$)
              {pct > 0 && <span className="ml-1 text-zinc-400 font-normal normal-case tracking-normal">— {pct}% do valor</span>}
            </label>
            <input type="number" value={entrada || ""}
              onChange={(e) => setEntrada(Number(e.target.value))}
              placeholder="Ex: 20.000" className="input" />
          </div>
          <div>
            <label className="label">Parcelas</label>
            <select value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))} className="input">
              {[12, 24, 36, 48, 60, 72, 84].map((p) => (
                <option key={p} value={p}>{p}x</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">
              Taxa mensal (%)
              <span className="ml-1 text-zinc-400 font-normal normal-case tracking-normal">ref. ~1.2%</span>
            </label>
            <input type="number" value={taxa} onChange={(e) => setTaxa(Number(e.target.value))}
              step="0.1" min="0" max="10" className="input" />
          </div>
        </div>

        {/* Info bar */}
        {valorVeiculo > 0 && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm">
            {entrada >= valorVeiculo ? (
              <span className="text-red-500">⚠️ Entrada não pode ser maior que o valor do veículo.</span>
            ) : (
              <span className="text-zinc-500">
                Valor a financiar:{" "}
                <span className="text-zinc-900 font-semibold">
                  {formatarPreco(Math.max(0, valorVeiculo - entrada))}
                </span>
              </span>
            )}
          </div>
        )}

        <button
          onClick={simular}
          disabled={valorVeiculo <= 0 || entrada >= valorVeiculo}
          className="btn-primary w-full py-3"
        >
          <Calculator className="w-4 h-4" />
          Calcular
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Result */}
        {resultado && (
          <div className="border border-zinc-200 rounded-2xl overflow-hidden animate-fade-up">
            {/* Highlight — black strip */}
            <div className="bg-zinc-900 px-6 py-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-400 text-xs mb-1">Parcela mensal</p>
                <p className="text-white font-black text-3xl">
                  {formatarPreco(resultado.valorParcela)}
                </p>
                <p className="text-zinc-500 text-xs mt-0.5">{resultado.parcelas}x</p>
              </div>
              <div>
                <p className="text-zinc-400 text-xs mb-1">Valor financiado</p>
                <p className="text-white font-bold text-2xl">
                  {formatarPreco(resultado.valorFinanciado)}
                </p>
                <p className="text-zinc-500 text-xs mt-0.5">sem entrada</p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="px-5 py-4 space-y-2.5 bg-white">
              {[
                { label: "Valor do veículo", value: formatarPreco(valorVeiculo) },
                { label: "Entrada", value: formatarPreco(entrada) },
                { label: "Taxa de juros", value: `${resultado.taxaJuros}% a.m.` },
                { label: "Total de juros", value: `+ ${formatarPreco(resultado.totalJuros)}`, red: true },
              ].map(({ label, value, red }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-zinc-500">{label}</span>
                  <span className={red ? "text-red-500 font-medium" : "text-zinc-700"}>{value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2.5 border-t border-zinc-100">
                <span className="text-zinc-900 font-semibold">Total pago</span>
                <span className="text-zinc-900 font-bold">{formatarPreco(resultado.totalPago)}</span>
              </div>
            </div>

            <div className="px-5 pb-5 bg-white border-t border-zinc-100 pt-3">
              <p className="text-zinc-400 text-[11px] mb-3 text-center">
                * Simulação ilustrativa. Sujeito à análise de crédito.
              </p>
              <button
                onClick={enviarWhatsApp}
                className="btn-whatsapp w-full py-3 rounded-xl"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar simulação pelo WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

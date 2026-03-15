"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, ArrowUpDown } from "lucide-react";
import { MARCAS, COMBUSTIVEL_LABELS, CAMBIO_LABELS, cn } from "@/lib/utils";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";

export function VehicleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const [marca, setMarca] = useState(searchParams.get("marca") || "");
  const [combustivel, setCombustivel] = useState(searchParams.get("combustivel") || "");
  const [cambio, setCambio] = useState(searchParams.get("cambio") || "");
  const [precoMin, setPrecoMin] = useState(searchParams.get("precoMin") || "");
  const [precoMax, setPrecoMax] = useState(searchParams.get("precoMax") || "");
  const [anoMin, setAnoMin] = useState(searchParams.get("anoMin") || "");
  const [anoMax, setAnoMax] = useState(searchParams.get("anoMax") || "");
  const [ordem, setOrdem] = useState(searchParams.get("ordem") || "");

  const applyFilters = (overrides?: Record<string, string>) => {
    const busca = searchParams.get("busca") || "";
    const state = { busca, marca, combustivel, cambio, precoMin, precoMax, anoMin, anoMax, ordem, ...overrides };
    const params = new URLSearchParams();
    Object.entries(state).forEach(([k, v]) => { if (v) params.set(k, v); });
    router.push(`/catalogo?${params.toString()}`);
  };

  const clearFilters = () => {
    setMarca(""); setCombustivel(""); setCambio("");
    setPrecoMin(""); setPrecoMax(""); setAnoMin(""); setAnoMax(""); setOrdem("");
    router.push("/catalogo");
  };

  const handleOrdem = (value: string) => {
    setOrdem(value);
    applyFilters({ ordem: value });
  };

  const activeCount = [marca, combustivel, cambio, precoMin, precoMax, anoMin, anoMax].filter(Boolean).length;

  const sortOptions = [
    { value: "", label: "Relevância" },
    { value: "preco_asc", label: "Menor preço" },
    { value: "preco_desc", label: "Maior preço" },
    { value: "ano_desc", label: "Mais novo" },
    { value: "ano_asc", label: "Mais antigo" },
    { value: "km_asc", label: "Menor km" },
  ];

  return (
    <div className="space-y-3 mb-8">
      {/* Main row */}
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        {/* Search with suggestions */}
        <SearchSuggestions
          placeholder="Buscar por marca, modelo ou nome..."
          className="flex-1 min-w-0"
          size="md"
        />

        {/* Sort */}
        <div className="relative shrink-0">
          <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <select
            value={ordem}
            onChange={(e) => handleOrdem(e.target.value)}
            className="input h-12 pl-9 pr-9 appearance-none cursor-pointer min-w-[160px] rounded-xl"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* Filters toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 h-12 px-4 rounded-xl border text-sm font-medium transition-all shrink-0",
            showFilters || activeCount > 0
              ? "bg-zinc-900 text-white border-zinc-900"
              : "border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filtros</span>
          {activeCount > 0 && (
            <span className={cn(
              "w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center",
              showFilters || activeCount > 0 ? "bg-white text-zinc-900" : "bg-zinc-200 text-zinc-700"
            )}>
              {activeCount}
            </span>
          )}
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showFilters && "rotate-180")} />
        </button>
      </div>

      {/* Advanced filters */}
      {showFilters && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 animate-fade-up shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="label">Marca</label>
              <select value={marca} onChange={(e) => setMarca(e.target.value)} className="input">
                <option value="">Todas</option>
                {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Combustível</label>
              <select value={combustivel} onChange={(e) => setCombustivel(e.target.value)} className="input">
                <option value="">Todos</option>
                {Object.entries(COMBUSTIVEL_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Câmbio</label>
              <select value={cambio} onChange={(e) => setCambio(e.target.value)} className="input">
                <option value="">Todos</option>
                {Object.entries(CAMBIO_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Preço mínimo</label>
              <input type="number" value={precoMin} onChange={(e) => setPrecoMin(e.target.value)}
                placeholder="R$ 0" className="input" />
            </div>
            <div>
              <label className="label">Preço máximo</label>
              <input type="number" value={precoMax} onChange={(e) => setPrecoMax(e.target.value)}
                placeholder="R$ 999.999" className="input" />
            </div>
            <div>
              <label className="label">Ano mínimo</label>
              <input type="number" value={anoMin} onChange={(e) => setAnoMin(e.target.value)}
                placeholder="2000" className="input" />
            </div>
            <div>
              <label className="label">Ano máximo</label>
              <input type="number" value={anoMax} onChange={(e) => setAnoMax(e.target.value)}
                placeholder={String(new Date().getFullYear())} className="input" />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={() => applyFilters()} className="btn-primary flex-1 h-11 rounded-xl">
                Aplicar
              </button>
              {activeCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="h-11 px-3 border border-zinc-300 rounded-xl text-zinc-400
                             hover:text-red-500 hover:border-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Loader2, Car } from "lucide-react";
import { formatarPreco, formatarQuilometragem, cn } from "@/lib/utils";
import type { Veiculo } from "@/types";

interface SearchSuggestionsProps {
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  autoFocus?: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function SearchSuggestions({
  placeholder = "Buscar por marca, modelo ou nome...",
  className,
  size = "md",
}: SearchSuggestionsProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 280);

  const search = useCallback(async (q: string) => {
    if (!q.trim() || q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/veiculos?busca=${encodeURIComponent(q)}&vendido=false`
      );
      const data = await res.json();
      setResults(Array.isArray(data) ? data.slice(0, 6) : []);
      setOpen(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery, search]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlighted >= 0 && results[highlighted]) {
        goTo(results[highlighted].id);
      } else {
        goToCatalog();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const goTo = (id: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/catalogo/${id}`);
  };

  const goToCatalog = () => {
    setOpen(false);
    if (query.trim()) {
      router.push(`/catalogo?busca=${encodeURIComponent(query.trim())}`);
    }
  };

  const clear = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  const sizeClasses = {
    sm: "h-10 text-sm pl-9 pr-10",
    md: "h-12 text-sm pl-11 pr-12",
    lg: "h-14 text-base pl-12 pr-14",
  };

  const iconSize = { sm: "w-4 h-4 left-2.5", md: "w-4 h-4 left-3.5", lg: "w-5 h-5 left-4" };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Input */}
      <div className="relative">
        {loading ? (
          <Loader2
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-zinc-400 animate-spin pointer-events-none",
              iconSize[size]
            )}
          />
        ) : (
          <Search
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none",
              iconSize[size]
            )}
          />
        )}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-2xl border border-zinc-200 bg-white text-zinc-900",
            "placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900",
            "focus:border-transparent transition-all duration-200 shadow-sm",
            sizeClasses[size]
          )}
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400
                       hover:text-zinc-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200
                        rounded-2xl shadow-xl shadow-zinc-900/10 z-50 overflow-hidden animate-fade-up">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Car className="w-8 h-8 text-zinc-300 mb-2" />
              <p className="text-zinc-500 text-sm font-medium">Nenhum carro encontrado</p>
              <p className="text-zinc-400 text-xs mt-1">
                Tente &quot;{query}&quot; no catálogo completo
              </p>
            </div>
          ) : (
            <>
              <ul>
                {results.map((v, i) => (
                  <li key={v.id}>
                    <button
                      onMouseEnter={() => setHighlighted(i)}
                      onClick={() => goTo(v.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                        highlighted === i ? "bg-zinc-50" : "hover:bg-zinc-50"
                      )}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-11 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                        {v.imagemPrincipal ? (
                          <Image
                            src={v.imagemPrincipal}
                            alt={v.nome}
                            width={64}
                            height={44}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car className="w-5 h-5 text-zinc-300" />
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-900 text-sm font-semibold truncate">{v.nome}</p>
                        <p className="text-zinc-400 text-xs mt-0.5">
                          {v.marca} · {v.ano} · {formatarQuilometragem(v.quilometragem)}
                        </p>
                      </div>
                      {/* Price */}
                      <div className="text-right shrink-0">
                        <p className="text-zinc-900 text-sm font-bold">{formatarPreco(v.preco)}</p>
                        {v.destaque && (
                          <span className="text-[10px] text-amber-600 font-semibold">Destaque</span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="border-t border-zinc-100 px-4 py-2.5">
                <button
                  onClick={goToCatalog}
                  className="flex items-center justify-between w-full text-sm text-zinc-500
                             hover:text-zinc-900 transition-colors group"
                >
                  <span>
                    Ver todos os resultados para{" "}
                    <strong className="text-zinc-900">&quot;{query}&quot;</strong>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

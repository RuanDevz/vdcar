"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/financiamento", label: "Financiamento" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm"
          : "bg-white/80 backdrop-blur-md border-b border-zinc-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Search overlay */}
        {showSearch && (
          <div className="absolute inset-x-0 top-0 h-full bg-white flex items-center px-5 sm:px-8 gap-3 z-10 animate-fade-in">
            <SearchSuggestions
              placeholder="Buscar carro por marca, modelo ou nome..."
              className="flex-1"
              size="md"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="text-zinc-500 hover:text-zinc-900 transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center
                            group-hover:bg-zinc-700 transition-colors">
              <span className="text-white font-black text-xs tracking-tighter">VD</span>
            </div>
            <span className="text-lg font-black text-zinc-900 tracking-tight">
              VD<span className="text-zinc-400 font-light">car</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all",
                    active
                      ? "text-zinc-900 bg-zinc-100"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  )}
                >
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2
                                     w-1 h-1 bg-zinc-900 rounded-full" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100
                         rounded-xl transition-all"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>
            <a
              href="tel:+558333224782"
              className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (83) 3322-4782
            </a>
            <Link href="/catalogo" className="btn-primary py-2 px-4 text-sm">
              Ver carros
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-zinc-400 hover:text-zinc-900 rounded-xl transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-zinc-900 rounded-xl transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border border-zinc-200 bg-white rounded-2xl mb-3 p-2 animate-fade-up shadow-lg">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-zinc-100 mt-2 pt-2 flex gap-2 px-1 pb-1">
                <a href="tel:+558333224782"
                  className="flex items-center gap-1.5 text-zinc-500 text-xs px-3 py-2">
                  <Phone className="w-3.5 h-3.5" />
                  (83) 3322-4782
                </a>
                <Link
                  href="/catalogo"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary text-sm flex-1 justify-center"
                >
                  Ver carros
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

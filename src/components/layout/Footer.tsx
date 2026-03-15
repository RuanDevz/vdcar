import Link from "next/link";
import { MapPin, Phone, MessageCircle, Instagram, Facebook } from "lucide-react";
import { WHATSAPP_NUMBER, TELEFONE, ENDERECO, INSTAGRAM_URL, PARCEIROS } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200">
      {/* Partners strip */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-5">
            Parceiros financeiros
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PARCEIROS.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2.5 px-4 py-2.5 border border-zinc-200
                           rounded-xl bg-zinc-50 hover:border-zinc-300 hover:bg-white
                           transition-all"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-[10px] shrink-0"
                  style={{ backgroundColor: p.cor }}
                >
                  {p.sigla.slice(0, 2)}
                </div>
                <span className="text-zinc-700 text-xs font-semibold whitespace-pre-line leading-tight">
                  {p.nome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center
                              group-hover:bg-zinc-700 transition-colors">
                <span className="text-white font-black text-xs">VD</span>
              </div>
              <span className="text-lg font-black text-zinc-900">
                VD<span className="text-zinc-400 font-light">car</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Seu parceiro de confiança na busca pelo veículo ideal. Qualidade,
              transparência e os melhores preços em Campina Grande e região.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-zinc-200 hover:border-zinc-300
                           rounded-xl flex items-center justify-center transition-all hover:scale-105"
                aria-label="Instagram VDcar"
              >
                <Instagram className="w-4 h-4 text-zinc-600" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-zinc-200 hover:border-zinc-300
                           rounded-xl flex items-center justify-center transition-all hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-zinc-600" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-5">
              Navegação
            </p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Início" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/financiamento", label: "Financiamento" },
                { href: "/sobre", label: "Sobre nós" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors underline-anim"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-5">
              Contato
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                <span className="text-zinc-500 text-sm leading-relaxed">{ENDERECO}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <a href="tel:+558333224782"
                  className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors">
                  {TELEFONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-zinc-400 shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  (83) 99880-7953
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 mt-10 pt-6 flex flex-col md:flex-row
                        items-center justify-between gap-3">
          <p className="text-zinc-400 text-xs">
            © {year} VDcar. Todos os direitos reservados.
          </p>
          <p className="text-zinc-300 text-xs">
            Rua José Lins do Rêgo, 12, Palmeira — Campina Grande / PB
          </p>
        </div>
      </div>
    </footer>
  );
}

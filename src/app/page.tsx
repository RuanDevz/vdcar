import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Shield, Star, Phone, MessageCircle,
  MapPin, ChevronRight, TrendingUp, Check, Instagram,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { prisma } from "@/lib/db";
import { WHATSAPP_NUMBER, TELEFONE, ENDERECO, INSTAGRAM_URL, PARCEIROS } from "@/lib/utils";

const HERO_CAR =
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=85&auto=format&fit=crop";

async function getDestaques() {
  try {
    return await prisma.veiculo.findMany({
      where: { destaque: true, vendido: false },
      orderBy: { criadoEm: "desc" },
      take: 4,
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const destaques = await getDestaques();

  return (
    <>
      <Header />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
        {/* Background subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#09090b 1px,transparent 1px),linear-gradient(90deg,#09090b 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full py-16 md:py-0 min-h-[calc(100vh-64px)] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">

            {/* Left — Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 border border-zinc-200 bg-zinc-50
                              text-zinc-500 px-3.5 py-1.5 rounded-full text-xs font-medium mb-7
                              animate-fade-up">
                <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                Campina Grande — Paraíba
              </div>

              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-900
                           leading-[0.92] tracking-tight mb-6 animate-fade-up"
                style={{ animationDelay: "80ms", animationFillMode: "both" }}
              >
                Seu próximo<br />
                carro está<br />
                <span className="text-zinc-400 font-light italic">aqui.</span>
              </h1>

              <p
                className="text-zinc-500 text-lg leading-relaxed mb-8 max-w-lg animate-fade-up"
                style={{ animationDelay: "160ms", animationFillMode: "both" }}
              >
                Veículos selecionados com procedência garantida, transparência
                total e as melhores condições de financiamento de Campina Grande.
              </p>

              {/* Search bar */}
              <div
                className="mb-8 animate-fade-up"
                style={{ animationDelay: "200ms", animationFillMode: "both" }}
              >
                <SearchSuggestions
                  placeholder="Buscar por marca, modelo ou nome..."
                  size="lg"
                />
              </div>

              <div
                className="flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: "240ms", animationFillMode: "both" }}
              >
                <Link href="/catalogo" className="btn-primary btn-lg">
                  Ver catálogo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-whatsapp btn-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div
                className="flex flex-wrap items-center gap-7 mt-10 pt-8 border-t border-zinc-100 animate-fade-up"
                style={{ animationDelay: "320ms", animationFillMode: "both" }}
              >
                {[
                  { value: "100+", label: "Vendas realizadas" },
                  { value: "5.0★", label: "Avaliação Google" },
                  { value: "10+", label: "Anos no mercado" },
                ].map(({ value, label }, i) => (
                  <div key={label} className="flex items-center gap-5">
                    {i > 0 && <div className="w-px h-7 bg-zinc-200" />}
                    <div>
                      <p className="text-xl font-black text-zinc-900">{value}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Car Photo */}
            <div
              className="order-1 lg:order-2 flex items-center justify-center
                         animate-fade-up"
              style={{ animationDelay: "120ms", animationFillMode: "both" }}
            >
              <div className="relative w-full max-w-xl">
                {/* Decorative ring */}
                <div className="absolute inset-4 rounded-3xl bg-zinc-100 -rotate-3" />
                <div className="absolute inset-4 rounded-3xl bg-zinc-50 rotate-1" />

                {/* Car image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-zinc-900/15
                                border border-zinc-200 aspect-[4/3]">
                  <Image
                    src={HERO_CAR}
                    alt="Carro em destaque — VDcar"
                    fill
                    className="object-cover animate-float"
                    priority
                    sizes="(max-width: 768px) 90vw, 50vw"
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 flex items-center gap-3
                                    border border-white/60 shadow-lg">
                      <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-white font-black text-xs">VD</span>
                      </div>
                      <div>
                        <p className="text-zinc-900 font-bold text-sm">VDcar</p>
                        <p className="text-zinc-500 text-xs">Qualidade garantida em cada veículo</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES STRIP
      ══════════════════════════════════════ */}
      <section className="py-16 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: "Procedência garantida",
                desc: "Todos os veículos são inspecionados antes de entrar no estoque.",
              },
              {
                icon: TrendingUp,
                title: "Financiamento facilitado",
                desc: "Parceria com os principais bancos. Simulação instantânea e aprovação rápida.",
              },
              {
                icon: Star,
                title: "Atendimento 5 estrelas",
                desc: "Do primeiro contato à entrega das chaves — suporte completo para você.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-zinc-200 rounded-2xl p-6
                                          hover:border-zinc-300 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-zinc-700" />
                </div>
                <h3 className="text-zinc-900 font-bold mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED VEHICLES
      ══════════════════════════════════════ */}
      {destaques.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.15em] mb-2">
                  Seleção especial
                </p>
                <h2 className="section-title">Destaques</h2>
              </div>
              <Link
                href="/catalogo"
                className="hidden md:flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900
                           text-sm font-medium transition-colors underline-anim"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {destaques.map((v, i) => (
                <div
                  key={v.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                >
                  <VehicleCard veiculo={v as Parameters<typeof VehicleCard>[0]["veiculo"]} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/catalogo" className="btn-outline btn-lg">
                Ver catálogo completo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          PARTNERS
      ══════════════════════════════════════ */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.15em] mb-3">
              Nossas parcerias
            </p>
            <h2 className="text-2xl font-black text-zinc-900">
              Parceiros financeiros
            </h2>
            <p className="text-zinc-500 text-sm mt-2">
              Trabalhamos com os melhores bancos e empresas para garantir as
              melhores condições para você.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PARCEIROS.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-zinc-200 rounded-2xl p-6 text-center
                           hover:border-zinc-300 hover:shadow-md transition-all group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3
                              text-white font-black text-lg shadow-md
                              group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: p.cor }}
                >
                  {p.sigla.slice(0, 2)}
                </div>
                <p className="text-zinc-900 font-bold text-sm whitespace-pre-line leading-snug">
                  {p.nome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                Sobre a VDcar
              </p>
              <h2 className="section-title mb-6">
                Referência em veículos<br />em Campina Grande
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-5 text-sm">
                Localizada em Palmeira, nascemos com o propósito de oferecer os melhores
                veículos com total transparência. Nossa equipe está sempre pronta para
                ajudá-lo a encontrar o carro ideal.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Veículos inspecionados e documentados",
                  "Financiamento com as melhores taxas",
                  "Atendimento personalizado do começo ao fim",
                  "Garantia pós-venda",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-600">
                    <div className="w-5 h-5 bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/sobre" className="btn-primary btn-lg">
                Conheça nossa história
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "30+", label: "Carros no estoque" },
                { value: "500+", label: "Clientes atendidos" },
                { value: "5.0★", label: "Avaliação Google" },
                { value: "10+", label: "Anos no mercado" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-center
                             hover:border-zinc-300 hover:-translate-y-0.5 hover:shadow-md
                             transition-all duration-200"
                >
                  <p className="text-3xl font-black text-zinc-900 mb-1">{value}</p>
                  <p className="text-zinc-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Fale conosco</h2>
            <p className="section-subtitle">Estamos prontos para atendê-lo</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp",
                sub: "(83) 99880-7953",
                href: `https://wa.me/${WHATSAPP_NUMBER}`,
                green: true,
              },
              {
                icon: Phone,
                title: "Telefone",
                sub: TELEFONE,
                href: "tel:+558333224782",
              },
              {
                icon: MapPin,
                title: "Endereço",
                sub: ENDERECO,
                href: "#",
              },
              {
                icon: Instagram,
                title: "Instagram",
                sub: "@vdcar",
                href: INSTAGRAM_URL,
              },
            ].map(({ icon: Icon, title, sub, href, green }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="bg-white border border-zinc-200 rounded-2xl p-5 text-center
                           hover:border-zinc-300 hover:shadow-md hover:-translate-y-0.5
                           transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3
                                 transition-colors ${green
                                   ? "bg-[#25D366]/10 group-hover:bg-[#25D366]/20"
                                   : "bg-zinc-100 group-hover:bg-zinc-200"}`}>
                  <Icon className={`w-5 h-5 ${green ? "text-[#25D366]" : "text-zinc-600"}`} />
                </div>
                <p className="text-zinc-900 font-semibold text-sm mb-0.5">{title}</p>
                <p className="text-zinc-400 text-xs">{sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA FINAL — black strip
      ══════════════════════════════════════ */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">
            Pronto para seu próximo carro?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Explore o catálogo ou simule um financiamento agora mesmo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold
                         px-7 py-3.5 rounded-xl hover:bg-zinc-100 transition-all hover:scale-[1.02]
                         active:scale-[0.98] text-base"
            >
              Ver Catálogo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp btn-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

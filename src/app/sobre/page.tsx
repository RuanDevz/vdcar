import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Shield, Users, Star, Car, ArrowRight, MapPin, Check } from "lucide-react";
import { ENDERECO, WHATSAPP_NUMBER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre a VDcar",
  description: "Conheça a história e os valores da VDcar em Campina Grande.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-24 bg-white">

        {/* Hero */}
        <section className="bg-zinc-900 py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
              Sobre nós
            </p>
            <h1 className="text-5xl font-black text-white tracking-tight mb-5">
              VD<span className="text-zinc-400 font-light">car</span>
            </h1>
            <p className="text-zinc-300 text-xl leading-relaxed max-w-2xl">
              Empresa familiar apaixonada por automóveis, com o compromisso de
              oferecer a melhor experiência na compra do seu próximo veículo.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                  Nossa história
                </p>
                <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-6">
                  Mais de 10 anos no mercado
                </h2>
                <div className="space-y-4 text-zinc-500 leading-relaxed text-sm">
                  <p>
                    A VDcar nasceu do sonho de criar uma revenda diferente — onde o
                    cliente é o verdadeiro protagonista. Localizada em Palmeira,
                    Campina Grande, construímos nossa reputação sobre os pilares da
                    transparência, honestidade e excelência no atendimento.
                  </p>
                  <p>
                    Nos tornamos referência na venda de veículos seminovos e usados
                    na região, sempre prezando pela qualidade dos carros e pelo
                    relacionamento de longo prazo com nossos clientes.
                  </p>
                </div>

                <ul className="space-y-2.5 mt-7 mb-8">
                  {[
                    "Todos os veículos inspecionados",
                    "Documentação 100% regularizada",
                    "Financiamento com aprovação rápida",
                    "Suporte completo pós-venda",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-zinc-600">
                      <div className="w-5 h-5 bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/catalogo" className="btn-primary btn-lg">
                  Ver estoque
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Car, value: "30+", label: "Veículos no estoque" },
                  { icon: Users, value: "500+", label: "Clientes satisfeitos" },
                  { icon: Star, value: "5.0★", label: "Avaliação média" },
                  { icon: Shield, value: "10+", label: "Anos no mercado" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label}
                    className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-center
                               hover:border-zinc-300 hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="w-10 h-10 bg-white border border-zinc-200 rounded-xl
                                    flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-zinc-700" />
                    </div>
                    <p className="text-3xl font-black text-zinc-900">{value}</p>
                    <p className="text-zinc-400 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-zinc-50 border-t border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-zinc-900">Nossos valores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { num: "01", title: "Transparência", desc: "Todas as informações sobre o histórico e condições dos veículos, sem surpresas." },
                { num: "02", title: "Qualidade", desc: "Selecionamos cuidadosamente cada veículo para garantir o melhor para você." },
                { num: "03", title: "Compromisso", desc: "Nosso relacionamento não termina na venda. Estamos sempre disponíveis." },
              ].map(({ num, title, desc }) => (
                <div key={title}
                  className="bg-white border border-zinc-200 rounded-2xl p-6 hover:border-zinc-300 transition-colors">
                  <p className="text-zinc-200 font-black text-4xl mb-4 tabular-nums">{num}</p>
                  <h3 className="text-zinc-900 font-bold text-lg mb-2">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
            <div className="w-12 h-12 bg-zinc-100 border border-zinc-200 rounded-2xl
                            flex items-center justify-center mx-auto mb-5">
              <MapPin className="w-6 h-6 text-zinc-700" />
            </div>
            <h2 className="text-3xl font-black text-zinc-900 mb-3">Onde estamos</h2>
            <p className="text-zinc-600 text-lg mb-1">{ENDERECO}</p>
            <p className="text-zinc-400 text-sm mb-8">Campina Grande — Paraíba</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de agendar uma visita à VDcar.")}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp btn-lg"
            >
              Agendar visita pelo WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

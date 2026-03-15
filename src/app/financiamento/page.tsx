import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { FinancingSimulator } from "@/components/financing/FinancingSimulator";
import { Shield, Clock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Simulador de Financiamento",
  description: "Simule o financiamento do seu próximo veículo na VDcar.",
};

export default function FinanciamentoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-24 bg-white">
        <div className="bg-zinc-50 border-b border-zinc-200 py-10">
          <div className="max-w-2xl mx-auto px-5 sm:px-8">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.15em] mb-3">
              Simulador
            </p>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight mb-3">
              Financiamento
            </h1>
            <p className="text-zinc-500 text-sm">
              Calcule as condições do seu financiamento. Gratuito e sem compromisso.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
          <FinancingSimulator />

          <div className="grid grid-cols-1 gap-3 mt-8">
            {[
              {
                icon: Shield,
                title: "Análise facilitada",
                desc: "Parceria com Banco BV, Omesa, Banco Pan e mais para conseguir as melhores condições.",
              },
              {
                icon: Clock,
                title: "Aprovação rápida",
                desc: "Agilizamos todo o processo para você sair com seu carro no menor tempo.",
              },
              {
                icon: CheckCircle,
                title: "Sem burocracia",
                desc: "Cuidamos de toda a documentação. Só se preocupe em curtir seu novo carro.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4
                           hover:border-zinc-300 hover:shadow-sm transition-all">
                <div className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-zinc-700" />
                </div>
                <div>
                  <h3 className="text-zinc-900 font-bold text-sm mb-1">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

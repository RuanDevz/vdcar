import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar, Gauge, Fuel, Settings2, Palette, DoorOpen,
  ArrowLeft, MessageCircle, TrendingUp, Star,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { FinancingSimulator } from "@/components/financing/FinancingSimulator";
import { prisma } from "@/lib/db";
import {
  formatarPreco, formatarQuilometragem,
  COMBUSTIVEL_LABELS, CAMBIO_LABELS, WHATSAPP_NUMBER,
} from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const v = await prisma.veiculo.findUnique({ where: { id } });
  if (!v) return { title: "Veículo não encontrado" };
  return {
    title: v.nome,
    description: `${v.nome} ${v.ano} — ${formatarPreco(v.preco)}.`,
  };
}

export default async function VeiculoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const veiculo = await prisma.veiculo.findUnique({ where: { id } });
  if (!veiculo) notFound();

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no *${veiculo.nome}* (${veiculo.ano}) anunciado por ${formatarPreco(veiculo.preco)} no site da VDcar. Poderia me dar mais informações?`
  );

  const specs = [
    { icon: Calendar, label: "Ano", value: String(veiculo.ano) },
    { icon: Gauge, label: "Quilometragem", value: formatarQuilometragem(veiculo.quilometragem) },
    { icon: Fuel, label: "Combustível", value: COMBUSTIVEL_LABELS[veiculo.combustivel as keyof typeof COMBUSTIVEL_LABELS] },
    { icon: Settings2, label: "Câmbio", value: CAMBIO_LABELS[veiculo.cambio as keyof typeof CAMBIO_LABELS] },
    { icon: Palette, label: "Cor", value: veiculo.cor },
    { icon: DoorOpen, label: "Portas", value: `${veiculo.portas} portas` },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 pt-8 mb-8">
            <Link href="/catalogo"
              className="hover:text-zinc-900 flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Catálogo
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-600 truncate">{veiculo.nome}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <VehicleGallery
              imagemPrincipal={veiculo.imagemPrincipal}
              imagens={veiculo.imagens}
              nome={veiculo.nome}
            />

            {/* Details */}
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-[0.12em]">
                  {veiculo.marca}
                </span>
                {veiculo.destaque && (
                  <span className="badge-dark flex items-center gap-1 text-[10px]">
                    <Star className="w-2.5 h-2.5 fill-current" /> Destaque
                  </span>
                )}
                {veiculo.vendido && <span className="badge-red text-[10px]">Vendido</span>}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight mb-2">
                {veiculo.nome}
              </h1>
              <p className="text-zinc-400 text-sm mb-6">
                {veiculo.modelo} · {veiculo.ano}
              </p>

              <div className="text-4xl font-black text-zinc-900 mb-6">
                {formatarPreco(veiculo.preco)}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label}
                    className="bg-zinc-50 border border-zinc-200 rounded-xl p-3
                               hover:border-zinc-300 transition-colors">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                        {label}
                      </span>
                    </div>
                    <p className="text-zinc-900 text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              {veiculo.descricao && (
                <div className="mb-6 border-t border-zinc-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400 mb-3">
                    Descrição
                  </p>
                  <p className="text-zinc-600 leading-relaxed text-sm">
                    {veiculo.descricao}
                  </p>
                </div>
              )}

              {/* CTA */}
              {!veiculo.vendido && (
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-whatsapp btn-lg flex-1 justify-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Tenho interesse
                  </a>
                  <a href="#financiamento" className="btn-outline btn-lg flex-1 justify-center">
                    <TrendingUp className="w-5 h-5" />
                    Simular financiamento
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Financing */}
          {!veiculo.vendido && (
            <div id="financiamento" className="mt-20 border-t border-zinc-100 pt-16">
              <div className="mb-7">
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.12em] mb-2">
                  Parcele seu veículo
                </p>
                <h2 className="text-2xl font-black text-zinc-900">
                  Simulação de Financiamento
                </h2>
              </div>
              <div className="max-w-2xl">
                <FinancingSimulator
                  valorInicial={veiculo.preco}
                  nomeVeiculo={veiculo.nome}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

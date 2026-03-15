import Image from "next/image";
import Link from "next/link";
import { Calendar, Gauge, Fuel, Settings2, MessageCircle, Star, ArrowUpRight } from "lucide-react";
import type { Veiculo } from "@/types";
import {
  formatarPreco, formatarQuilometragem,
  COMBUSTIVEL_LABELS, CAMBIO_LABELS, WHATSAPP_NUMBER,
} from "@/lib/utils";

interface VehicleCardProps {
  veiculo: Veiculo;
}

export function VehicleCard({ veiculo }: VehicleCardProps) {
  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no ${veiculo.nome} (${veiculo.ano}) por ${formatarPreco(veiculo.preco)}. Vi no site da VDcar.`
  );

  return (
    <article className="card-hover group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
        {veiculo.imagemPrincipal ? (
          <Image
            src={veiculo.imagemPrincipal}
            alt={veiculo.nome}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl opacity-30">🚗</div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {veiculo.destaque && (
            <span className="badge-dark flex items-center gap-1 text-[10px]">
              <Star className="w-2.5 h-2.5 fill-current" /> Destaque
            </span>
          )}
          {veiculo.vendido && (
            <span className="badge-red text-[10px]">Vendido</span>
          )}
        </div>

        {/* Quick link */}
        <Link
          href={`/catalogo/${veiculo.id}`}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm
                     border border-white/60 rounded-full flex items-center justify-center
                     opacity-0 group-hover:opacity-100 hover:bg-white
                     transition-all duration-200 shadow-sm"
          tabIndex={-1}
        >
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">
            {veiculo.marca}
          </p>
          <h3 className="text-zinc-900 font-bold text-base leading-snug line-clamp-1
                         group-hover:text-zinc-700 transition-colors">
            {veiculo.nome}
          </h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
          {[
            { Icon: Calendar, val: String(veiculo.ano) },
            { Icon: Gauge, val: formatarQuilometragem(veiculo.quilometragem) },
            { Icon: Fuel, val: COMBUSTIVEL_LABELS[veiculo.combustivel] },
            { Icon: Settings2, val: CAMBIO_LABELS[veiculo.cambio] },
          ].map(({ Icon, val }) => (
            <div key={val} className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Icon className="w-3 h-3 text-zinc-400 shrink-0" />
              {val}
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-zinc-100">
          <p className="text-zinc-900 font-black text-xl mb-3">
            {formatarPreco(veiculo.preco)}
          </p>
          <div className="flex gap-2">
            <Link
              href={`/catalogo/${veiculo.id}`}
              className="btn-outline flex-1 text-xs py-2.5 rounded-xl"
            >
              Detalhes
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp flex-1 text-xs py-2.5 rounded-xl"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

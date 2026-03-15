import Link from "next/link";
import { PlusCircle, Pencil, Eye, Star } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatarPreco, formatarQuilometragem, COMBUSTIVEL_LABELS } from "@/lib/utils";
import { DeleteButton } from "./DeleteButton";

async function getVeiculos() {
  return prisma.veiculo.findMany({ orderBy: { criadoEm: "desc" } });
}

export default async function AdminCarrosPage() {
  const veiculos = await getVeiculos();

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Veículos</h1>
          <p className="text-ink-muted text-sm mt-1">
            {veiculos.length} cadastrado{veiculos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/carros/novo" className="btn-primary">
          <PlusCircle className="w-4 h-4" />
          Novo Carro
        </Link>
      </div>

      <div className="card border-surface-5/40 overflow-hidden">
        {veiculos.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-ink-muted text-sm mb-4">Nenhum veículo cadastrado.</p>
            <Link href="/admin/carros/novo" className="btn-primary">
              Cadastrar primeiro carro
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-4/60">
                  {["Veículo", "Ano / KM", "Combustível", "Preço", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-[10px] font-bold
                                           uppercase tracking-[0.12em] text-ink-faint">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-4/40">
                {veiculos.map((v) => (
                  <tr key={v.id} className="hover:bg-surface-3/20 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-white text-sm font-medium flex items-center gap-2">
                        {v.nome}
                        {v.destaque && <Star className="w-3.5 h-3.5 text-white fill-white" />}
                      </p>
                      <p className="text-ink-faint text-xs mt-0.5">{v.marca} · {v.modelo}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-ink-secondary text-sm">{v.ano}</p>
                      <p className="text-ink-faint text-xs">{formatarQuilometragem(v.quilometragem)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-ink-secondary text-sm">
                        {COMBUSTIVEL_LABELS[v.combustivel as keyof typeof COMBUSTIVEL_LABELS]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white font-bold text-sm">{formatarPreco(v.preco)}</span>
                    </td>
                    <td className="px-5 py-4">
                      {v.vendido ? (
                        <span className="badge-red">Vendido</span>
                      ) : v.destaque ? (
                        <span className="badge-white">Destaque</span>
                      ) : (
                        <span className="badge-green">Disponível</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/catalogo/${v.id}`} target="_blank"
                          className="p-2 text-ink-faint hover:text-white hover:bg-surface-4 rounded-lg transition-colors"
                          title="Ver no site">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/carros/${v.id}/editar`}
                          className="p-2 text-ink-faint hover:text-white hover:bg-surface-4 rounded-lg transition-colors"
                          title="Editar">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={v.id} nome={v.nome} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

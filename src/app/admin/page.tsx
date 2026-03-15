import Link from "next/link";
import { Car, Star, CheckCircle, Clock, PlusCircle, ArrowRight, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { formatarPreco, formatarData } from "@/lib/utils";

async function getDashboardData() {
  const [total, destaques, vendidos, disponíveis, recentes] = await Promise.all([
    prisma.veiculo.count(),
    prisma.veiculo.count({ where: { destaque: true } }),
    prisma.veiculo.count({ where: { vendido: true } }),
    prisma.veiculo.count({ where: { vendido: false } }),
    prisma.veiculo.findMany({ orderBy: { criadoEm: "desc" }, take: 6 }),
  ]);
  return { total, destaques, vendidos, disponíveis, recentes };
}

export default async function AdminDashboard() {
  const session = await getSession();
  const { total, destaques, vendidos, disponíveis, recentes } = await getDashboardData();

  const stats = [
    { label: "Total", value: total, icon: Car, sub: "veículos cadastrados" },
    { label: "Disponíveis", value: disponíveis, icon: Clock, sub: "prontos para venda" },
    { label: "Destaque", value: destaques, icon: Star, sub: "em destaque no site" },
    { label: "Vendidos", value: vendidos, icon: CheckCircle, sub: "negócios fechados" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard</h1>
          <p className="text-ink-muted text-sm mt-1">
            Olá, <span className="text-ink-secondary">{session?.nome}</span>
          </p>
        </div>
        <Link href="/admin/carros/novo" className="btn-primary">
          <PlusCircle className="w-4 h-4" />
          Novo Carro
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="card p-5 hover:border-surface-5 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <p className="text-ink-faint text-xs font-medium uppercase tracking-wider">{label}</p>
              <div className="w-7 h-7 bg-surface-3 rounded-lg flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-ink-secondary" />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
            <p className="text-ink-faint text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-4/60">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-ink-secondary" />
            <h2 className="text-white font-bold text-sm">Veículos recentes</h2>
          </div>
          <Link
            href="/admin/carros"
            className="text-ink-muted hover:text-white text-xs flex items-center gap-1 transition-colors"
          >
            Ver todos <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentes.length === 0 ? (
          <div className="p-12 text-center">
            <Car className="w-10 h-10 text-ink-faint mx-auto mb-3" />
            <p className="text-ink-muted text-sm">Nenhum veículo cadastrado.</p>
            <Link href="/admin/carros/novo" className="btn-primary mt-4 inline-flex text-sm">
              Cadastrar primeiro carro
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-surface-4/40">
            {recentes.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between px-5 py-3.5
                           hover:bg-surface-3/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 bg-surface-3 rounded-lg flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4 text-ink-faint" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{v.nome}</p>
                    <p className="text-ink-faint text-xs">
                      {v.marca} • {v.ano} • {formatarData(v.criadoEm)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-white font-bold text-sm">{formatarPreco(v.preco)}</span>
                  {v.vendido ? (
                    <span className="badge-red">Vendido</span>
                  ) : v.destaque ? (
                    <span className="badge-white">Destaque</span>
                  ) : (
                    <span className="badge-green">Disponível</span>
                  )}
                  <Link
                    href={`/admin/carros/${v.id}/editar`}
                    className="btn-ghost text-xs py-1.5 px-3"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

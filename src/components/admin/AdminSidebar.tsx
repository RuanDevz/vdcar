"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PlusCircle, List, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/carros", label: "Todos os Carros", icon: List },
  { href: "/admin/carros/novo", label: "Novo Carro", icon: PlusCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Sessão encerrada.");
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-60 bg-surface-0 border-r border-surface-4/40 flex flex-col min-h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-surface-4/40">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center
                          group-hover:scale-105 transition-transform">
            <span className="text-black font-black text-xs">VD</span>
          </div>
          <div>
            <p className="text-white font-black text-sm leading-tight">
              VD<span className="text-ink-muted font-light">car</span>
            </p>
            <p className="text-ink-faint text-[10px] uppercase tracking-wider">Admin</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-4">
        <p className="text-ink-faint text-[10px] font-bold uppercase tracking-[0.15em] px-3 mb-2">
          Menu
        </p>
        <ul className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-white text-black"
                      : "text-ink-muted hover:text-white hover:bg-surface-3"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-surface-4/40 mt-4 pt-4">
          <p className="text-ink-faint text-[10px] font-bold uppercase tracking-[0.15em] px-3 mb-2">
            Site
          </p>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                       text-ink-muted hover:text-white hover:bg-surface-3 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Ver site público
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-2.5 pb-4 border-t border-surface-4/40 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                     text-ink-muted hover:text-red-400 hover:bg-red-900/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}

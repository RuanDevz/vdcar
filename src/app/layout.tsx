import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VDcar — Veículos de Qualidade em Campina Grande",
    template: "%s | VDcar",
  },
  description:
    "A VDcar oferece os melhores veículos seminovos e usados em Campina Grande. Encontre seu próximo carro com segurança e transparência.",
  keywords: ["carros", "veículos", "seminovos", "usados", "Campina Grande", "VDcar"],
  authors: [{ name: "VDcar" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "VDcar",
    title: "VDcar — Veículos de Qualidade em Campina Grande",
    description: "A VDcar oferece os melhores veículos seminovos e usados em Campina Grande.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111111",
              color: "#ffffff",
              border: "1px solid #2a2a2a",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#ffffff", secondary: "#000000" },
            },
          }}
        />
      </body>
    </html>
  );
}

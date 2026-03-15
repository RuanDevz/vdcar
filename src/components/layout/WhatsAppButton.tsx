"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Olá! Vim pelo site da VDcar e gostaria de mais informações."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-0
                 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-full
                 shadow-[0_4px_24px_rgba(37,211,102,0.45)]
                 hover:shadow-[0_6px_36px_rgba(37,211,102,0.55)]
                 transition-all duration-300 hover:scale-105 overflow-hidden"
      aria-label="Falar pelo WhatsApp"
    >
      <span className="max-w-0 group-hover:max-w-[160px] overflow-hidden whitespace-nowrap
                       transition-all duration-300 ease-out text-sm font-semibold
                       pl-0 group-hover:pl-4">
        Falar no WhatsApp
      </span>
      <div className="w-14 h-14 flex items-center justify-center shrink-0">
        <MessageCircle className="w-6 h-6" />
      </div>
    </a>
  );
}

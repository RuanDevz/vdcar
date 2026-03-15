"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface VehicleGalleryProps {
  imagemPrincipal?: string | null;
  imagens: string[];
  nome: string;
}

export function VehicleGallery({ imagemPrincipal, imagens, nome }: VehicleGalleryProps) {
  const allImages = [
    ...(imagemPrincipal ? [imagemPrincipal] : []),
    ...imagens.filter((img) => img !== imagemPrincipal),
  ];

  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (allImages.length === 0) {
    return (
      <div className="aspect-video bg-surface-3 rounded-2xl flex items-center justify-center border border-surface-4/60">
        <div className="text-center text-ink-faint">
          <div className="text-5xl mb-3">🚗</div>
          <p className="text-sm">Sem fotos disponíveis</p>
        </div>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c - 1 + allImages.length) % allImages.length);
  const next = () => setCurrent((c) => (c + 1) % allImages.length);

  return (
    <>
      <div className="space-y-3">
        {/* Main */}
        <div
          className="relative aspect-video bg-surface-3 rounded-2xl overflow-hidden group cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={allImages[current]}
            alt={`${nome} — foto ${current + 1}`}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors
                          flex items-center justify-center">
            <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60
                           hover:bg-black/80 rounded-full flex items-center justify-center
                           text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60
                           hover:bg-black/80 rounded-full flex items-center justify-center
                           text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs
                              px-2.5 py-1 rounded-full backdrop-blur-sm">
                {current + 1}/{allImages.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  i === current
                    ? "border-white opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={img}
                  alt={`${nome} — miniatura ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-surface-3 hover:bg-surface-4
                       rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-3
                           hover:bg-surface-4 rounded-full flex items-center justify-center text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-3
                           hover:bg-surface-4 rounded-full flex items-center justify-center text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[current]}
              alt={`${nome} — foto ${current + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}

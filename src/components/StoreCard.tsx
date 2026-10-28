import React, { useState } from 'react';
import { MapPin, Phone, Clock, ArrowRight, Share2, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Store } from '../types';

interface StoreCardProps {
  store: Store;
  onSelect: (store: Store) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, onSelect }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `${store.name} - ${store.sells} | Barangay ${store.barangay}, Marawi City. Tel: ${store.contactNumber || 'N/A'}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'pagkain': return 'Pagkain at Pastilan';
      case 'damit': return 'Abaya at Damit';
      case 'motor': return 'Pyesa at Motor';
      case 'groseriya': return 'Sari-Sari at Groseriya';
      case 'serbisyo': return 'Serbisyo';
      default: return 'Negosyo';
    }
  };

  return (
    <article 
      onClick={() => onSelect(store)}
      className="group relative bg-white rounded-2xl border border-emerald-900/10 shadow-sm hover:shadow-xl hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Islamic Arch Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-amber-400 group-hover:h-2 transition-all duration-300" />

      <div className="p-5 flex-1 flex flex-col">
        {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between text-xs text-emerald-800/80 mb-2 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="uppercase tracking-wider font-semibold text-emerald-900">
              {getCategoryLabel(store.category)}
            </span>
            <span aria-hidden="true" className="text-emerald-300">·</span>
            <span>Brgy. {store.barangay}</span>
          </div>

          {store.isHalalCertified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Halal
            </span>
          )}
        </div>

        {/* Store Name */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors tracking-tight line-clamp-1 mb-2">
          {store.name}
        </h3>

        {/* What They Sell (Paninda) Highlight */}
        <div className="mb-4 bg-emerald-50/60 rounded-xl p-3 border border-emerald-100/80 group-hover:bg-emerald-50 transition-colors">
          <div className="text-[11px] uppercase tracking-wider font-bold text-emerald-900/80 mb-0.5">
            Mga Paninda / Serbisyo:
          </div>
          <p className="text-sm font-semibold text-emerald-950 leading-snug line-clamp-2">
            {store.sells}
          </p>
        </div>

        {/* Location & Landmark */}
        <div className="space-y-1.5 text-xs text-slate-600 mt-auto pt-2 border-t border-slate-100">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
            <span className="line-clamp-1 text-slate-700">
              {store.landmark ? `${store.landmark}, ${store.barangay}` : `Barangay ${store.barangay}, Marawi City`}
            </span>
          </div>

          {store.openingHours && (
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{store.openingHours}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {store.contactNumber ? (
            <a
              href={`tel:${store.contactNumber}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs"
              title="Tawagan ang tindahan"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{store.contactNumber}</span>
            </a>
          ) : (
            <span className="text-xs text-slate-400 italic">Walang naka-lista na numero</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
            title="Kopyahin o i-share ang impormasyon"
            aria-label="Ibahagi"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => onSelect(store)}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-all pl-1 py-1"
          >
            <span>Detalye</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

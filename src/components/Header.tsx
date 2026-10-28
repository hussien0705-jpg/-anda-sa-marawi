import React from 'react';
import { Plus, Store, MapPin, ShieldCheck, Compass } from 'lucide-react';

interface HeaderProps {
  totalStores: number;
  totalBarangays: number;
  halalCount: number;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalStores,
  totalBarangays,
  halalCount,
  onOpenAddModal,
}) => {
  return (
    <header className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white border-b-4 border-amber-400/80 shadow-xl overflow-hidden">
      {/* Decorative Islamic Geometric subtle overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-islamic-pattern" />

      {/* Top Quranic Bismillah Ribbon */}
      <div className="bg-emerald-950/90 py-1.5 px-4 border-b border-emerald-800/60 text-center relative z-10">
        <p className="font-arabic text-amber-200/90 text-sm md:text-base tracking-widest font-normal">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-900/30 flex items-center justify-center">
                <div className="w-full h-full bg-emerald-900 rounded-[14px] flex items-center justify-center">
                  <Compass className="w-6 h-6 text-amber-300 animate-pulse" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  Lanao del Sur · Lungsod ng Marawi
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-xs font-sans">
                  Anda sa Marawi?
                </h1>
              </div>
            </div>

            <p className="text-sm sm:text-base text-emerald-100 max-w-2xl font-medium leading-relaxed">
              Direktoryo ng mga tindahan, negosyo, at paninda sa Marawi City. Maghanap ng pastilan, abaya, pyesa ng motor, at iba pang serbisyong Halal.
            </p>

            {/* Quick Unboxed Stats (Anti-Slop compliant) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-200/90 pt-1 font-medium">
              <span className="flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-amber-300" />
                <strong className="text-white font-bold">{totalStores}</strong> Tindahan
              </span>
              <span aria-hidden="true" className="text-emerald-500">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <strong className="text-white font-bold">{totalBarangays}</strong> Barangay
              </span>
              <span aria-hidden="true" className="text-emerald-500">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <strong className="text-white font-bold">{halalCount}</strong> Halal / Muslim-Friendly
              </span>
            </div>
          </div>

          {/* Add Store Primary CTA */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onOpenAddModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:from-amber-500 active:to-amber-600 text-emerald-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-950/40 hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300/40 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-950/15 flex items-center justify-center">
                <Plus className="w-4 h-4 text-emerald-950 stroke-[3]" />
              </div>
              <span>Magdagdag ng Tindahan</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

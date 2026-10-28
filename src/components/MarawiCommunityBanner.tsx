import React from 'react';
import { Heart, Sparkles, MapPin, Clock, Plus } from 'lucide-react';

interface MarawiCommunityBannerProps {
  onOpenAddModal: () => void;
}

export const MarawiCommunityBanner: React.FC<MarawiCommunityBannerProps> = ({ onOpenAddModal }) => {
  return (
    <section className="mt-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/60 shadow-xl relative overflow-hidden">
      {/* Decorative background star/crescent vibe */}
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 border border-emerald-600/50 rounded-full text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Suportahan ang Lokal na Negosyo ng Marawi</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Mayroon ka bang paboritong tindahan o negosyo sa Marawi?
          </h3>

          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Tulungan natin ang mga kapwa nating Meranaw at mga bisita sa Marawi City na madaling mahanap ang mga masasarap na pastilan, de-kalidad na abaya, piyesa ng sasakyan, at mga serbisyong Halal.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-emerald-200 pt-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              Libreng pagtatala ng tindahan
            </span>
            <span aria-hidden="true" className="text-emerald-500">·</span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              100% Maranao Community Initiative
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenAddModal}
            className="px-6 py-3.5 bg-white hover:bg-emerald-50 active:bg-emerald-100 text-emerald-950 font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-800 stroke-[3]" />
            <span>Itala ang Tindahan Mo</span>
          </button>
        </div>
      </div>
    </section>
  );
};

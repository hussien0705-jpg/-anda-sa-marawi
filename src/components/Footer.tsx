import React from 'react';
import { Compass, RotateCcw, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onResetToDefaults: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetToDefaults }) => {
  return (
    <footer className="mt-16 bg-emerald-950 text-emerald-100 border-t-2 border-emerald-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-emerald-900 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center">
                <Compass className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-lg font-extrabold text-white">Anda sa Marawi?</span>
            </div>
            <p className="text-xs text-emerald-300 max-w-md">
              Direktoryo ng mga tindahan, negosyo, at paninda sa Islamic City ng Marawi, Lanao del Sur.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm('Nais mo bang ibalik ang orihinal na sample data ng mga tindahan?')) {
                  onResetToDefaults();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white bg-emerald-900/60 hover:bg-emerald-900 px-3 py-2 rounded-xl border border-emerald-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ibalik ang Default na Data
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400">
          <p className="flex items-center gap-1 font-arabic text-sm text-amber-200">
            السلام عليكم ورحمة الله وبركاته
          </p>
          <p className="text-center sm:text-right">
            Ginawa para sa komunidad ng Marawi at Lanao del Sur · Green & White Halal Directory
          </p>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, ShieldCheck, Check, Share2, ExternalLink, Trash2, Tag, Info } from 'lucide-react';
import { Store } from '../types';

interface StoreDetailModalProps {
  store: Store | null;
  onClose: () => void;
  onDeleteStore?: (id: string) => void;
}

export const StoreDetailModal: React.FC<StoreDetailModalProps> = ({
  store,
  onClose,
  onDeleteStore,
}) => {
  const [copied, setCopied] = useState(false);

  if (!store) return null;

  const handleShare = () => {
    const text = `${store.name}\nPaninda: ${store.sells}\nLokasyon: ${store.barangay}, Marawi City (${store.landmark || 'Walang landmark'})\nTelepono: ${store.contactNumber || 'Wala'}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${store.name} ${store.barangay} Marawi City Lanao del Sur`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-emerald-600/30 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        {/* Top Header Card */}
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-950 text-white p-6 relative">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                  Brgy. {store.barangay}
                </span>
                {store.isHalalCertified && (
                  <>
                    <span className="text-emerald-300">·</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-100 bg-emerald-600/60 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      100% Halal
                    </span>
                  </>
                )}
              </div>
              <h2 id="detail-title" className="text-2xl font-extrabold tracking-tight text-white">
                {store.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="text-emerald-200 hover:text-white bg-emerald-900/50 hover:bg-emerald-900 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Isara"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Main Highlights */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-700" />
              Mga Paninda at Serbisyo
            </h4>
            <p className="text-base font-semibold text-emerald-950 leading-relaxed">
              {store.sells}
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-3.5 text-sm">
            {/* Barangay & Landmark */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider block">
                  Eksaktong Lokasyon & Tanda
                </span>
                <p className="font-medium text-slate-800">
                  Barangay {store.barangay}, Lungsod ng Marawi
                </p>
                {store.landmark && (
                  <p className="text-xs text-slate-600 mt-0.5">
                    Landmark: <span className="font-semibold">{store.landmark}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider block">
                  Kontak / Numero
                </span>
                {store.contactNumber ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-slate-800">{store.contactNumber}</span>
                    <a
                      href={`tel:${store.contactNumber}`}
                      className="text-xs bg-emerald-700 text-white font-medium px-2 py-0.5 rounded hover:bg-emerald-800 transition-colors"
                    >
                      Tawagan Ngayon
                    </a>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic mt-0.5">
                    Walang nakasaad na numero ng telepono
                  </p>
                )}
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider block">
                  Oras ng Operasyon
                </span>
                <p className="font-medium text-slate-800">
                  {store.openingHours || 'Karaniwang 8:00 AM - 6:00 PM'}
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Paalala: Maaaring pansamantalang magsara tuwing oras ng pagsamba sa Salatul Jumu'ah (Biyernes).
                </p>
              </div>
            </div>

            {/* Notes */}
            {store.notes && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider block">
                    Espesyal na Impormasyon
                  </span>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-200">
                    {store.notes}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Nakopya na!' : 'I-share / Kopyahin'}
              </button>

              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
              >
                <ExternalLink className="w-4 h-4 text-emerald-700" />
                Hanapin sa Google Maps
              </a>
            </div>

            {store.isCustom && onDeleteStore && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Sigurado ka bang nais mong tanggalin ang tindahang "${store.name}" sa listahan?`)) {
                    onDeleteStore(store.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Tanggalin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

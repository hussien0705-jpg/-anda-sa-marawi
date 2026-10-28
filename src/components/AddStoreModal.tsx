import React, { useState } from 'react';
import { X, Store as StoreIcon, MapPin, Tag, Phone, Clock, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { Store, Category } from '../types';
import { MARAWI_BARANGAYS } from '../data/barangays';

interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStore: (store: Omit<Store, 'id' | 'createdAt' | 'isCustom'>) => void;
}

export const AddStoreModal: React.FC<AddStoreModalProps> = ({ isOpen, onClose, onAddStore }) => {
  const [name, setName] = useState('');
  const [sells, setSells] = useState('');
  const [barangay, setBarangay] = useState('Banggolo');
  const [customBarangay, setCustomBarangay] = useState('');
  const [category, setCategory] = useState<Category>('pagkain');
  const [landmark, setLandmark] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [isHalalCertified, setIsHalalCertified] = useState(true);
  const [isMuslimOwned, setIsMuslimOwned] = useState(true);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Kinakailangan ang pangalan ng tindahan.';
    }
    if (!sells.trim()) {
      newErrors.sells = 'Pakilagay kung ano ang paninda o serbisyo.';
    }
    const finalBarangay = barangay === 'Iba pa' ? customBarangay.trim() : barangay;
    if (!finalBarangay) {
      newErrors.barangay = 'Pumili o maglagay ng barangay sa Marawi.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddStore({
      name: name.trim(),
      sells: sells.trim(),
      barangay: finalBarangay,
      category,
      landmark: landmark.trim() || undefined,
      contactNumber: contactNumber.trim() || undefined,
      openingHours: openingHours.trim() || '8:00 AM - 6:00 PM',
      isHalalCertified,
      isMuslimOwned,
      notes: notes.trim() || undefined,
    });

    // Reset form
    setName('');
    setSells('');
    setBarangay('Banggolo');
    setCustomBarangay('');
    setCategory('pagkain');
    setLandmark('');
    setContactNumber('');
    setOpeningHours('');
    setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border-2 border-emerald-600/30 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header with Islamic Green Style */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white px-6 py-5 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/60 border border-emerald-400/40 flex items-center justify-center shadow-inner">
                <StoreIcon className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 id="modal-title" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Magdagdag ng Bagong Tindahan
                </h3>
                <p className="text-xs text-emerald-200/90 font-medium">
                  Itala ang negosyo sa direktoryo ng Marawi City
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-emerald-200 hover:text-white bg-emerald-900/40 hover:bg-emerald-900/80 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Isara"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-center">
            <span className="font-arabic text-amber-200 text-sm tracking-widest opacity-80">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Store Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Pangalan ng Tindahan / Negosyo <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="Halimbawa: Pastilan sa Kanto o Ameerah Hijab"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-100'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* What they sell */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Ano ang mga Paninda o Serbisyo? <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={sells}
              onChange={(e) => {
                setSells(e.target.value);
                if (errors.sells) setErrors((prev) => ({ ...prev, sells: '' }));
              }}
              placeholder="Halimbawa: Pastil, Palapa, Abaya, Motor parts, etc."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.sells
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-100'
              }`}
            />
            {errors.sells && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.sells}
              </p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              Ilista ang pangunahing produkto upang madaling mahanap ng mga mamimili.
            </p>
          </div>

          {/* Barangay & Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Barangay */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Barangay sa Marawi <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <select
                  value={barangay}
                  onChange={(e) => {
                    setBarangay(e.target.value);
                    if (errors.barangay) setErrors((prev) => ({ ...prev, barangay: '' }));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  {MARAWI_BARANGAYS.map((brgy) => (
                    <option key={brgy} value={brgy}>
                      {brgy}
                    </option>
                  ))}
                  <option value="Iba pa">Iba pa (Mag-type ng sariling barangay)</option>
                </select>
              </div>

              {barangay === 'Iba pa' && (
                <input
                  type="text"
                  value={customBarangay}
                  onChange={(e) => setCustomBarangay(e.target.value)}
                  placeholder="I-type ang pangalan ng barangay..."
                  className="mt-2 w-full px-3 py-2 rounded-lg border border-emerald-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kategorya
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="pagkain">Pagkain at Pastilan</option>
                <option value="damit">Abaya, Hijab at Damit</option>
                <option value="motor">Pyesa at Motor</option>
                <option value="groseriya">Sari-Sari at Groseriya</option>
                <option value="serbisyo">Serbisyo at Pag-aayos</option>
                <option value="iba_pa">Iba pang Negosyo</option>
              </select>
            </div>
          </div>

          {/* Landmark / Location Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Tanda o Landmark (Lokasyon)
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Halimbawa: Katabi ng tulay, tapat ng Grand Mosque, Saduc Highway"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Contact & Hours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Numero ng Telepono / GCash
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Hal. 0917-000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Oras ng Operasyon
              </label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="Hal. 7:00 AM - 8:00 PM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Halal & Muslim-Owned Badges */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
              Mga Katangiang Halal at Muslim-Friendly
            </span>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-emerald-950">
                <input
                  type="checkbox"
                  checked={isHalalCertified}
                  onChange={(e) => setIsHalalCertified(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm border-emerald-400 focus:ring-emerald-500"
                />
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Halal Certified / 100% Halal Paninda
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-emerald-950">
                <input
                  type="checkbox"
                  checked={isMuslimOwned}
                  onChange={(e) => setIsMuslimOwned(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm border-emerald-400 focus:ring-emerald-500"
                />
                <span>Pag-aari ng Muslim (Muslim-Owned)</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Maikling Paglalarawan o Espesyal na Tala
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Halimbawa: May delivery, tumatanggap ng bulk order, o espesyal na timpla ng palapa."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Kanselahin
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-900/20 transition-all flex items-center gap-2 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <Check className="w-4 h-4 text-emerald-200" />
              I-save ang Tindahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from 'react';
import { Search, X, SlidersHorizontal, MapPin, CheckCircle2, RotateCcw } from 'lucide-react';
import { Category, SortOption } from '../types';
import { MARAWI_BARANGAYS, CATEGORIES_CONFIG } from '../data/barangays';

interface SearchBarAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBarangay: string;
  onBarangayChange: (brgy: string) => void;
  selectedCategory: Category;
  onCategoryChange: (cat: Category) => void;
  isHalalOnly: boolean;
  onToggleHalalOnly: (val: boolean) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  categoryCounts: Record<Category, number>;
}

export const SearchBarAndFilters: React.FC<SearchBarAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedBarangay,
  onBarangayChange,
  selectedCategory,
  onCategoryChange,
  isHalalOnly,
  onToggleHalalOnly,
  sortOption,
  onSortChange,
  onResetFilters,
  categoryCounts,
}) => {
  const isFiltered = searchQuery !== '' || selectedBarangay !== 'lahat' || selectedCategory !== 'lahat' || isHalalOnly;

  const popularKeywords = ['Pastil', 'Abaya', 'Motor parts', 'Banggolo', 'Saduc', 'Panggao Saduc', 'Palapa'];

  return (
    <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-lg p-5 sm:p-6 mb-8 transition-all">
      {/* Top Search Bar */}
      <div className="relative mb-4">
        <label htmlFor="search-input" className="sr-only">
          Maghanap ng tindahan o paninda
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-4.5 pointer-events-none text-emerald-700">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Maghanap ng tindahan, paninda (hal. Pastil, Abaya, Pyesa), o barangay..."
            className="w-full pl-12 pr-11 py-3.5 sm:py-4 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border-2 border-slate-200 focus:border-emerald-600 rounded-2xl text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium shadow-inner transition-all focus:outline-none focus:ring-4 focus:ring-emerald-100"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              aria-label="Burahin ang paghahanap"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Search Keywords (Tagalog One-Click Hints) */}
      <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
        <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
          Mabilisang Hanap:
        </span>
        {popularKeywords.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => onSearchChange(kw)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              searchQuery.toLowerCase() === kw.toLowerCase()
                ? 'bg-emerald-800 text-white font-semibold'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            {kw}
          </button>
        ))}
      </div>

      {/* Secondary Controls Bar: Barangay, Sort & Halal Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 items-center">
        {/* Barangay Filter */}
        <div className="relative">
          <label htmlFor="barangay-select" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-700" />
            Piliin ang Barangay:
          </label>
          <select
            id="barangay-select"
            value={selectedBarangay}
            onChange={(e) => onBarangayChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 focus:border-emerald-600 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer"
          >
            <option value="lahat">Lahat ng Barangay sa Marawi</option>
            {MARAWI_BARANGAYS.map((brgy) => (
              <option key={brgy} value={brgy}>
                Brgy. {brgy}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="sort-select" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-emerald-700" />
            Pagsunud-sunod:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 focus:border-emerald-600 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer"
          >
            <option value="bago">Kamakailan / Pinakabago</option>
            <option value="pangalan-az">Pangalan ng Tindahan (A - Z)</option>
            <option value="barangay">Ayon sa Barangay</option>
          </select>
        </div>

        {/* Halal Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-4 sm:pt-4">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-2 rounded-xl border border-emerald-200 transition-colors">
            <input
              type="checkbox"
              checked={isHalalOnly}
              onChange={(e) => onToggleHalalOnly(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500"
            />
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              Halal Lamang
            </span>
          </label>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2.5 py-2 rounded-xl transition-colors"
              title="Ibalik sa orihinal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              I-reset
            </button>
          )}
        </div>
      </div>

      {/* Category Segmented Controls (Buttons / Tabs) */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
          Kategorya ng Tindahan:
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {CATEGORIES_CONFIG.map((cat) => {
            const count = categoryCounts[cat.id] ?? 0;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md font-bold ${
                    isActive ? 'bg-emerald-950/40 text-amber-300' : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

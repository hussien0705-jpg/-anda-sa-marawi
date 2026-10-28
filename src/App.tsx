/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Store, Category, SortOption } from './types';
import { INITIAL_STORES } from './data/initialStores';
import { Header } from './components/Header';
import { SearchBarAndFilters } from './components/SearchBarAndFilters';
import { StoreCard } from './components/StoreCard';
import { AddStoreModal } from './components/AddStoreModal';
import { StoreDetailModal } from './components/StoreDetailModal';
import { MarawiCommunityBanner } from './components/MarawiCommunityBanner';
import { Footer } from './components/Footer';
import { Store as StoreIcon, AlertCircle, Plus, CheckCircle, Search } from 'lucide-react';

const STORAGE_KEY = 'anda_sa_marawi_stores_v2';

export default function App() {
  // Load stores from localStorage or use initial default data
  const [stores, setStores] = useState<Store[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load stores from localStorage', e);
    }
    return INITIAL_STORES;
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('lahat');
  const [selectedCategory, setSelectedCategory] = useState<Category>('lahat');
  const [isHalalOnly, setIsHalalOnly] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('bago');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStoreForDetail, setSelectedStoreForDetail] = useState<Store | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync stores to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [stores]);

  // Add store handler
  const handleAddStore = (newStoreData: Omit<Store, 'id' | 'createdAt' | 'isCustom'>) => {
    const newStore: Store = {
      ...newStoreData,
      id: `store-custom-${Date.now()}`,
      createdAt: Date.now(),
      isCustom: true,
    };
    setStores((prev) => [newStore, ...prev]);
    showToast(`Matagumpay na naidagdag ang "${newStore.name}"!`);
  };

  // Delete store handler
  const handleDeleteStore = (id: string) => {
    setStores((prev) => prev.filter((s) => s.id !== id));
    showToast('Natanggal na ang tindahan sa listahan.');
  };

  // Reset to default sample stores
  const handleResetToDefaults = () => {
    setStores(INITIAL_STORES);
    localStorage.removeItem(STORAGE_KEY);
    setSearchQuery('');
    setSelectedBarangay('lahat');
    setSelectedCategory('lahat');
    setIsHalalOnly(false);
    showToast('Naibalik na ang orihinal na listahan ng mga tindahan.');
  };

  // Filtered & Sorted stores
  const filteredStores = useMemo(() => {
    return stores
      .filter((store) => {
        // Search query filter (matches name, sells, barangay, or landmark)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = store.name.toLowerCase().includes(q);
          const matchSells = store.sells.toLowerCase().includes(q);
          const matchBarangay = store.barangay.toLowerCase().includes(q);
          const matchLandmark = store.landmark?.toLowerCase().includes(q) || false;
          if (!matchName && !matchSells && !matchBarangay && !matchLandmark) {
            return false;
          }
        }

        // Barangay filter
        if (selectedBarangay !== 'lahat') {
          if (store.barangay.toLowerCase() !== selectedBarangay.toLowerCase()) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'lahat') {
          if (store.category !== selectedCategory) {
            return false;
          }
        }

        // Halal filter
        if (isHalalOnly) {
          if (!store.isHalalCertified && !store.isMuslimOwned) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'bago') {
          return b.createdAt - a.createdAt;
        }
        if (sortOption === 'pangalan-az') {
          return a.name.localeCompare(b.name, 'tl');
        }
        if (sortOption === 'barangay') {
          return a.barangay.localeCompare(b.barangay, 'tl');
        }
        return 0;
      });
  }, [stores, searchQuery, selectedBarangay, selectedCategory, isHalalOnly, sortOption]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      lahat: stores.length,
      pagkain: 0,
      damit: 0,
      motor: 0,
      groseriya: 0,
      serbisyo: 0,
      iba_pa: 0,
    };
    stores.forEach((store) => {
      if (counts[store.category] !== undefined) {
        counts[store.category]++;
      } else {
        counts.iba_pa++;
      }
    });
    return counts;
  }, [stores]);

  // Unique barangays covered
  const totalBarangays = useMemo(() => {
    const set = new Set(stores.map((s) => s.barangay));
    return set.size;
  }, [stores]);

  const halalCount = useMemo(() => {
    return stores.filter((s) => s.isHalalCertified || s.isMuslimOwned).length;
  }, [stores]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBarangay('lahat');
    setSelectedCategory('lahat');
    setIsHalalOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans selection:bg-emerald-700 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-2xl border-2 border-emerald-400 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-amber-300 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <Header
        totalStores={stores.length}
        totalBarangays={totalBarangays}
        halalCount={halalCount}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar & Filters on Top */}
        <SearchBarAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedBarangay={selectedBarangay}
          onBarangayChange={setSelectedBarangay}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          isHalalOnly={isHalalOnly}
          onToggleHalalOnly={setIsHalalOnly}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onResetFilters={handleResetFilters}
          categoryCounts={categoryCounts}
        />

        {/* Section Header & Active Results count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 tracking-tight flex items-center gap-2">
              <StoreIcon className="w-6 h-6 text-emerald-700" />
              <span>Listahan ng mga Tindahan sa Marawi</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {filteredStores.length === stores.length
                ? `Ipinapakita ang lahat ng ${stores.length} tindahan`
                : `May ${filteredStores.length} sa kabuuang ${stores.length} tindahan ang tumutugma sa pagsala`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Magdagdag ng Tindahan</span>
            </button>
          </div>
        </div>

        {/* Stores Grid or Empty State */}
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onSelect={(s) => setSelectedStoreForDetail(s)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-emerald-300 p-10 sm:p-14 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-4 border border-emerald-200">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Walang nahanap na tindahan
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Walang tumutugma sa iyong paghahanap na "{searchQuery || selectedBarangay}". Subukang baguhin ang salita o i-reset ang filter.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                I-clear ang Paghahanap
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(true);
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Idagdag ang Tindahang Ito
              </button>
            </div>
          </div>
        )}

        {/* Community Banner */}
        <MarawiCommunityBanner onOpenAddModal={() => setIsAddModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onResetToDefaults={handleResetToDefaults} />

      {/* Add Store Modal */}
      <AddStoreModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStore={handleAddStore}
      />

      {/* Store Detail Modal */}
      <StoreDetailModal
        store={selectedStoreForDetail}
        onClose={() => setSelectedStoreForDetail(null)}
        onDeleteStore={handleDeleteStore}
      />
    </div>
  );
}

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import FoodCard from './FoodCard';
import { CATEGORIES } from '../data/menuData';

function MenuGrid({ items, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // filter items based on both active category and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const searchMatch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-4 lg:px-8 py-6">

      {/* ── Search bar ── */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        <input
          type="text"
          placeholder="Search dishes…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl
                     pl-9 pr-8 py-2.5 text-sm text-white placeholder:text-white/30
                     focus:outline-none focus:border-orange-500/60 transition-colors"
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Category tabs ── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-thin">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.93 }}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                        ${activeCategory === cat
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                          : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white border border-white/10'}`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* ── Result count ── */}
      <p className="text-white/30 text-xs mb-4">
        Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        {activeCategory !== 'All' && ` in ${activeCategory}`}
        {searchQuery && ` for "${searchQuery}"`}
      </p>

      {/* ── Grid ── */}
      <AnimatePresence mode="popLayout">
        {filteredItems.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-3 py-24 text-white/30"
          >
            <span className="text-5xl">🍽️</span>
            <p className="font-medium">No dishes found</p>
            <p className="text-sm">Try a different search or category</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MenuGrid;

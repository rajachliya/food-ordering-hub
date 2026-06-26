import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Plus, Check } from 'lucide-react';

// badge colour map — easy to extend
const BADGE_CONFIG = {
  Bestseller: { bg: 'bg-orange-500', label: '🔥 Bestseller' },
  Premium:    { bg: 'bg-yellow-500 text-black', label: '⭐ Premium' },
  Veggie:     { bg: 'bg-emerald-500', label: '🌿 Veggie' },
};

function FoodCard({ item, onAddToCart }) {
  // track whether the "Add" button just got clicked so we can show a brief ✓
  const [justAdded, setJustAdded] = useState(false);
  const [imgReady, setImgReady] = useState(false);

  function handleAdd() {
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  const badge = item.badge ? BADGE_CONFIG[item.badge] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="rounded-2xl overflow-hidden flex flex-col
                 bg-white/5 border border-white/10
                 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10
                 transition-colors duration-200 group"
    >
      {/* ── Image ── */}
      <div className="relative h-44 overflow-hidden bg-white/5">
        {/* skeleton while image loads */}
        {!imgReady && <div className="absolute inset-0 animate-pulse bg-white/5" />}
        <img
          src={item.image}
          alt={item.name}
          onLoad={() => setImgReady(true)}
          className={`w-full h-full object-cover transition-all duration-500
                      group-hover:scale-105 ${imgReady ? 'opacity-100' : 'opacity-0'}`}
        />

        {badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold
                            px-2.5 py-1 rounded-full text-white ${badge.bg}`}>
            {badge.label}
          </span>
        )}

        <div className="absolute top-3 right-3 flex items-center gap-1
                        bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-medium">{item.rating}</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-sm leading-snug">{item.name}</h3>
          <span className="text-orange-400 font-bold text-sm whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-white/45 text-xs leading-relaxed flex-1">{item.description}</p>

        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-1 text-white/35 text-xs">
            <Clock size={11} />
            {item.prepTime}
          </span>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
                        transition-colors duration-200
                        ${justAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-orange-500 hover:bg-orange-400 text-white'}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="flex items-center gap-1"
                >
                  <Check size={12} /> Added!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="flex items-center gap-1"
                >
                  <Plus size={12} /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default FoodCard;

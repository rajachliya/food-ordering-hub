import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';
import { useCart } from './hooks/useCart';
import { MENU_ITEMS } from './data/menuData';

function App() {
  const {
    cartItems,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  // controls the mobile cart drawer
  const [cartOpen, setCartOpen] = useState(false);
  // brief scale-up pulse on the cart badge whenever an item is added
  const [badgePulse, setBadgePulse] = useState(false);

  function handleAddToCart(item) {
    addItem(item);
    setBadgePulse(true);
    setTimeout(() => setBadgePulse(false), 350);
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#1A1A2E]">

      {/* ────── Navbar ────── */}
      <header className="flex-shrink-0 flex items-center justify-between
                         px-4 lg:px-8 py-3 border-b border-white/10">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <UtensilsCrossed size={16} className="text-white" />
          </div>
          <div className="leading-none">
            <p className="text-white font-bold text-lg tracking-tight">Feastly</p>
            <p className="text-white/30 text-[10px]">Delivered fresh to your door</p>
          </div>
        </div>

        {/* Mobile cart button */}
        <button
          onClick={() => setCartOpen(true)}
          className="lg:hidden relative p-2 rounded-xl bg-white/5
                     hover:bg-white/10 transition-colors"
        >
          <ShoppingCart size={20} className="text-white" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: badgePulse ? 1.45 : 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 12 }}
                className="absolute -top-1 -right-1 bg-orange-500 text-white
                           text-[10px] font-bold w-5 h-5 rounded-full
                           flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Desktop cart summary */}
        <p className="hidden lg:block text-white/40 text-sm">
          {totalItems === 0
            ? 'Cart is empty'
            : `${totalItems} item${totalItems > 1 ? 's' : ''} · $${totalPrice.toFixed(2)}`}
        </p>
      </header>

      {/* ────── Body ────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Menu grid (scrollable) */}
        <MenuGrid items={MENU_ITEMS} onAddToCart={handleAddToCart} />

        {/* Cart sidebar — always visible on desktop, drawer on mobile */}
        <div className="hidden lg:block flex-shrink-0">
          <CartSidebar
            cartItems={cartItems}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onUpdateQty={updateQty}
            onRemove={removeItem}
            onClear={clearCart}
            isOpen={true}
            onClose={() => {}}
          />
        </div>

        <div className="lg:hidden">
          <CartSidebar
            cartItems={cartItems}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onUpdateQty={updateQty}
            onRemove={removeItem}
            onClear={clearCart}
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

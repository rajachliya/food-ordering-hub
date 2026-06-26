import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, Loader2 } from 'lucide-react';

function CartSidebar({ cartItems, totalItems, totalPrice, onUpdateQty, onRemove, onClear, isOpen, onClose }) {
  // checkout goes through 3 dummy states: idle → loading → success
  const [orderState, setOrderState] = useState('idle');

  const DELIVERY_FEE = 2.49;
  const deliveryCharge = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const grandTotal = totalPrice + deliveryCharge;

  function handlePlaceOrder() {
    if (cartItems.length === 0) return;
    setOrderState('loading');
    setTimeout(() => {
      setOrderState('success');
      // clear cart after showing success screen
      setTimeout(() => {
        onClear();
        setOrderState('idle');
      }, 2500);
    }, 1500);
  }

  return (
    <>
      {/* mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* sidebar panel */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="fixed right-0 top-0 h-full w-[88vw] max-w-sm z-50 flex flex-col
                   bg-[#16213E] border-l border-white/10
                   lg:relative lg:translate-x-0 lg:w-80 xl:w-96 lg:h-screen"
      >
        {/* ── Order success overlay ── */}
        <AnimatePresence>
          {orderState === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center
                         gap-4 bg-[#16213E] px-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 0.1 }}
              >
                <CheckCircle2 size={68} className="text-emerald-400" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white font-bold text-xl mb-1">Order placed! 🎉</p>
                <p className="text-white/50 text-sm">
                  Your food is being prepared. Estimated delivery: ~30 min
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={17} className="text-orange-400" />
            <span className="text-white font-semibold">Cart</span>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-orange-500 text-white text-xs font-bold
                             w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-white/30 hover:text-red-400 transition-colors"
              >
                Clear all
              </button>
            )}
            {/* only show close button on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-white/40 hover:text-white transition-colors"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-3">
          <AnimatePresence initial={false}>
            {cartItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full gap-3
                           text-white/25 py-20"
              >
                <ShoppingBag size={52} strokeWidth={1} />
                <p className="font-medium">Nothing here yet</p>
                <p className="text-xs text-center">Add something from the menu to get started</p>
              </motion.div>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, paddingTop: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex items-center gap-3 py-3 border-b border-white/8 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.name}</p>
                    <p className="text-orange-400 text-xs font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* qty controls */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20
                                 flex items-center justify-center transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-white text-sm font-semibold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-400
                                 flex items-center justify-center transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-0.5 text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer / checkout ── */}
        <AnimatePresence>
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="border-t border-white/10 px-5 py-4 flex-shrink-0 space-y-3"
            >
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/45">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/45">
                  <span>Delivery</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base
                               pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-orange-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handlePlaceOrder}
                disabled={orderState !== 'idle'}
                className="w-full flex items-center justify-center gap-2
                           bg-orange-500 hover:bg-orange-400 disabled:opacity-60
                           text-white font-semibold text-sm py-3 rounded-xl
                           transition-colors duration-200"
              >
                {orderState === 'loading' ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Placing order…
                  </>
                ) : (
                  `Place Order · $${grandTotal.toFixed(2)}`
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
}

export default CartSidebar;

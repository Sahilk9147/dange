import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function VideoModal({ modal, onClose }) {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl border border-white/5"
            style={{ width: 'min(720px, 95vw)' }}
          >
            {/* Video / Letter area */}
            <div className="aspect-video bg-black flex items-center justify-center relative">
              {modal.src ? (
                <video
                  controls autoPlay
                  className="w-full h-full object-contain"
                  src={modal.src}
                >
                  Your browser does not support video.
                </video>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center px-8">
                  <span className="text-7xl">💌</span>
                  <p className="text-gray-300 text-base leading-8 whitespace-pre-line">
                    {modal.desc}
                  </p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{modal.title}</h3>
              {modal.src && (
                <p className="text-gray-400 text-sm leading-relaxed">{modal.desc}</p>
              )}
              <button
                onClick={onClose}
                className="mt-5 bg-[#e50914] hover:bg-[#c40812] text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm flex items-center gap-2"
              >
                <X size={16} /> Close
              </button>
            </div>
          </motion.div>

          {/* X button top-right */}
          <button onClick={onClose}
            className="absolute top-6 right-8 bg-white/10 hover:bg-white/25 text-white rounded-full p-2 transition-colors">
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

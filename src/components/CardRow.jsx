import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CardRow({ title, cards, onCardClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="px-12 py-7">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold text-gray-200 mb-4 tracking-wide"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            onClick={() => onCardClick(card)}
            className="relative flex-shrink-0 w-52 h-32 rounded-lg overflow-hidden cursor-pointer group shadow-lg"
          >
            <img src={card.photo} alt={card.label} className="w-full h-full object-cover" />
            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            >
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-black text-xl font-bold shadow-lg hover:bg-white transition-colors">
                ▶
              </div>
              <span className="text-white text-xs font-semibold text-center px-2">{card.label}</span>
            </motion.div>
            {/* Bottom glow on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ boxShadow: '0 0 0 2px #e50914 inset' }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

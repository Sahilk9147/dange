import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const msgs = [
  { e: '💍', t: '"Firstly I love u so much and day by day my love is turning into a habit, you are my habit bby which i will never leave"' },
  { e: '🌸', t: '"You are such a kind and lovely person"' },
  { e: '🧸', t: '"You always do everything according to me and always pamper me"' },
  { e: '👑', t: '"You always prioritise me over you"' },
  { e: '🫂', t: '"I love how u treat me whenever im feeling low"' },
  { e: '✨', t: '"And my fav i love the way u laugh ✨😭😭😭"' },
];

export default function Messages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className="px-12 py-7">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        className="text-xl font-bold text-gray-200 mb-5">
        💬 Messages For You <span className="text-[#f5c518]">— From My Heart</span>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {msgs.map((m, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, background: '#1e1e1e' }}
            className="bg-[#141414] border-l-4 border-[#e50914] rounded-xl p-6 transition-all"
          >
            <div className="text-3xl mb-3">{m.e}</div>
            <p className="text-gray-400 text-sm leading-relaxed">{m.t}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

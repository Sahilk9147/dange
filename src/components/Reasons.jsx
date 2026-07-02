import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const reasons = [
  { n: '01', t: 'I love the way u correct my english. 🫶🫶' },
  { n: '02', t: 'The way you take care of me like my mom 😭😭😭🫶' },
  { n: '03', t: 'The way you hold my hand while crossing the road ♥️♥️' },
  { n: '04', t: 'The way u deal with me, cause u know i have more mood swings🫶🫶' },
  { n: '05', t: 'Love the way u ask me everytime how am i doing, im ohkk or not' },
  { n: '06', t: 'Love the way when u feed me first bite😘🫶' },
];

export default function Reasons() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className="px-12 py-7">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        className="text-xl font-bold text-gray-200 mb-5">
        💛 Reasons I Love You <span className="text-[#f5c518]">— Season 1</span>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {reasons.map((r, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, borderColor: '#e50914', boxShadow: '0 8px 30px rgba(229,9,20,0.2)' }}
            className="bg-gradient-to-br from-[#1c1c1c] to-[#2a1a1a] border border-[#e50914]/20 rounded-xl p-5 transition-all cursor-default"
          >
            <div className="font-bebas text-4xl text-[#e50914]/60">{r.n}</div>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">{r.t}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const movieTitles = [
  'The Day We Met 💫','My Favourite Scene 🎬','Golden Hour With You 🌅',
  'Love Story, Vol. 1 📖','Just the Two of Us 🌹','A Thousand Reasons 💛',
  'You Are My Home 🏡','The Best Day Ever ☀️','Crazy in Love 💞',
  'Written in the Stars ⭐','Every Little Thing 🌸','Forever Yours 💍',
  'The One That Got My Heart 💘','Sunset Boulevard ❤️','Something Beautiful 🎀',
  'Notebook Moments 📓','La Vie en Rose 🌹','Our Secret World 🔮',
  'Butterflies 🦋','Head Over Heels 👟','Always & Forever 🕊️',
  'You Had Me at Hello 💬','More Than Words 🎵','Meant to Be 🌙',
  'The Best Chapter Yet 📚','Wild Hearts 🌊','Happy Ever After 🎉',
];

const TOTAL = 27;
const photos = Array.from({ length: TOTAL }, (_, i) => `/photos/photo${i + 1}.jpg`);

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [lb, setLb] = useState(null); // lightbox index

  const nav = (dir) => setLb(prev => ((prev + dir + TOTAL) % TOTAL));

  return (
    <div ref={ref} className="px-12 py-7">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        className="text-xl font-bold text-gray-200 mb-4"
      >
        🖼️ Our Gallery <span className="text-[#f5c518]">— Every Moment Counts</span>
      </motion.div>

      {/* Scrollable row */}
      <div className="flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
        {photos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            whileHover={{ scale: 1.07, zIndex: 10 }}
            onClick={() => setLb(i)}
            className="relative flex-shrink-0 w-48 h-64 rounded-xl overflow-hidden cursor-pointer group shadow-lg"
          >
            <img src={src} alt={movieTitles[i]} className="w-full h-full object-cover" loading="lazy" />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-end p-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
            >
              <span className="text-white text-xs font-bold leading-tight drop-shadow">{movieTitles[i]}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLb(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
          >
            <motion.img
              key={lb}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              src={photos[lb]}
              alt=""
              onClick={e => e.stopPropagation()}
              className="max-w-[88vw] max-h-[88vh] rounded-2xl shadow-2xl object-contain"
            />
            <button onClick={() => setLb(null)}
              className="absolute top-6 right-8 bg-white/10 hover:bg-white/25 text-white rounded-full p-2 transition-colors">
              <X size={22} />
            </button>
            <button onClick={e => { e.stopPropagation(); nav(-1); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors">
              <ChevronLeft size={26} />
            </button>
            <button onClick={e => { e.stopPropagation(); nav(1); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors">
              <ChevronRight size={26} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#f5c518] font-bold text-sm text-center px-4">
              {movieTitles[lb]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';

const profiles = [
  { id: 1, name: 'Her 👑',   photo: '/photos/photo1.jpg'  },
  { id: 2, name: 'Him 🧑',   photo: '/photos/photo5.jpg'  },
  { id: 3, name: 'Us 💑',    photo: '/photos/photo10.jpg' },
  { id: 4, name: 'Guest 🌟', photo: '/photos/photo15.jpg' },
];

export default function ProfileScreen({ onSelect }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-10"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
        className="font-bebas text-5xl tracking-widest text-[#e50914] drop-shadow-[0_0_24px_rgba(229,9,20,0.6)]"
      >
        ❤️ SHAWTYFLIX
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-light text-gray-300 tracking-wide"
      >
        Who's watching?
      </motion.h2>

      {/* Profiles */}
      <div className="flex gap-8 flex-wrap justify-center">
        {profiles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.12, y: -6 }}
            onClick={() => onSelect(p)}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={p.photo}
                alt={p.name}
                className="w-32 h-32 rounded-lg object-cover border-[3px] border-transparent group-hover:border-white transition-all duration-300 shadow-xl"
                onError={e => { e.target.style.display='none'; }}
              />
              <motion.div
                className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-[#808080] font-semibold text-sm tracking-wide group-hover:text-white transition-colors">
              {p.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

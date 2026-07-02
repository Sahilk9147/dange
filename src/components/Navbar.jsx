import { motion } from 'framer-motion';

export default function Navbar({ profile }) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 w-full z-40 px-12 py-4 flex items-center justify-between"
      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)' }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="font-bebas text-3xl tracking-widest text-[#e50914] drop-shadow-[0_0_16px_rgba(229,9,20,0.5)] select-none"
      >
        ❤️ SHAWTYFLIX
      </motion.div>

      <div className="flex items-center gap-6 text-sm text-gray-300">
        <span className="hover:text-white cursor-pointer transition-colors">Home</span>
        <span className="hover:text-white cursor-pointer transition-colors">Our Story</span>
        {profile && (
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            src={profile.photo}
            alt={profile.name}
            className="w-8 h-8 rounded-md object-cover cursor-pointer border-2 border-transparent hover:border-white transition-all"
          />
        )}
      </div>
    </motion.nav>
  );
}

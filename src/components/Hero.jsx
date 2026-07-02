import { motion } from 'framer-motion';

export default function Hero({ onPlay, onLetter }) {
  return (
    <div className="relative h-screen flex items-end pb-20 overflow-hidden">
      {/* Background Video */}
      <video
        src="/hero_bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, #0a0a0a 8%, rgba(10,10,10,0.45) 60%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 px-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs tracking-[4px] text-[#f5c518] uppercase mb-3 drop-shadow-md"
        >
          ✨ ShawtyFlix Original — A Story Worth Watching Forever
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 80 }}
          className="font-bebas leading-none mb-4"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            background: 'linear-gradient(135deg, #fff 40%, #f5c518)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}
        >
          Happy Birthday,<br />My Love 🎂
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-200 text-lg leading-relaxed mb-7 max-w-lg drop-shadow-lg"
        >
          Today is all about you — the most beautiful, wonderful, magical person in my world.
          Every day with you feels like my favourite movie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlay}
            className="flex items-center gap-2 bg-white text-black font-bold px-7 py-3 rounded-md text-base hover:bg-gray-200 transition-colors shadow-lg"
          >
            ▶ Play Our Story
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLetter}
            className="flex items-center gap-2 font-bold px-7 py-3 rounded-md text-base transition-colors shadow-lg"
            style={{ background: 'rgba(109,109,110,0.75)', backdropFilter: 'blur(8px)' }}
          >
            💌 Love Letter
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

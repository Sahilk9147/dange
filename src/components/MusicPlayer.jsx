import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt autoplay when component mounts
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch((e) => {
        console.log("Autoplay prevented:", e);
        // Browsers block autoplay until user interacts. 
        // We handle this gracefully.
        setPlaying(false);
      });
    }
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(e => console.log("Play error:", e));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/bin_tere.mp3"
        loop
      />

      {/* Floating toggle button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 160 }}
        className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2"
      >
        {/* Song label */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm whitespace-nowrap"
            >
              🎵 Bin Tere — I Hate Luv Storys
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          onClick={toggle}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #e50914, #a50009)' }}
        >
          {/* Pulse rings when playing */}
          {playing && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full bg-[#e50914]"
                animate={{ scale: [1, 1.65, 1.65], opacity: [0.55, 0, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-[#e50914]"
                animate={{ scale: [1, 1.35, 1.35], opacity: [0.4, 0, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              />
            </>
          )}
          <motion.div
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
          >
            {playing
              ? <Music size={22} className="text-white" />
              : <VolumeX size={22} className="text-white" />
            }
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
}

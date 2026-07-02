import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Letter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="mx-12 my-8 relative overflow-hidden rounded-2xl border border-[#e50914]/25 p-12 text-center"
      style={{ background: 'linear-gradient(135deg, rgba(229,9,20,0.07), rgba(245,197,24,0.04))' }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-[10rem] opacity-[0.04] pointer-events-none select-none">💖</div>
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="font-bebas text-4xl text-[#f5c518] mb-6"
      >
        💌 A Letter To You
      </motion.h2>
      <p className="text-gray-300 text-base leading-9 max-w-2xl mx-auto">
        To my favourite person in the whole universe — Happy Birthday! 🎉<br /><br />
        I don't know how I got this lucky, but somehow the universe brought you into my life,
        and that is the best thing that has ever happened to me. You are not just my girlfriend —
        you are my best friend, my safe place, my reason to smile every morning.<br /><br />
        On your special day, I want you to know that every moment with you is one I treasure.
        You deserve all the love, all the laughter, and all the happiness in the world.<br /><br />
        <strong className="text-[#f5c518]">Happy Birthday, my love. Here's to us. 🥂❤️</strong>
      </p>
    </motion.div>
  );
}

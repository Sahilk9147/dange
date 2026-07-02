import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProfileScreen from './components/ProfileScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CardRow from './components/CardRow';
import Gallery from './components/Gallery';
import VideoModal from './components/VideoModal';
import MusicPlayer from './components/MusicPlayer';
import Reasons from './components/Reasons';
import Messages from './components/Messages';
import Letter from './components/Letter';

// ── Card data ──
const MEMORY_CARDS = [
  { photo: '/photos/photo3.jpg',  label: 'Us Together 🌅',    videoKey: 'v1' },
  { photo: '/photos/photo6.jpg',  label: 'Birthday Magic 🎂',  videoKey: 'v2' },
  { photo: '/photos/photo9.jpg',  label: 'Our Adventures 🌿',  videoKey: 'v3' },
  { photo: '/photos/photo12.jpg', label: 'Sweet Memories 🌌',  videoKey: 'v4' },
  { photo: '/photos/photo16.jpg', label: 'My Heart ❤️',         videoKey: 'v5' },
  { photo: '/photos/photo20.jpg', label: 'Golden Moments ✨',  videoKey: 'v6' },
  { photo: '/photos/photo24.jpg', label: 'Always You 💖',       videoKey: 'v7' },
];

const FAVORITE_CARDS = [
  { photo: '/photos/photo7.jpg',  label: 'Birthday Glow ✨',   videoKey: 'v2' },
  { photo: '/photos/photo11.jpg', label: 'Hand in Hand 🌸',    videoKey: 'v3' },
  { photo: '/photos/photo14.jpg', label: 'Under the Stars 🌠', videoKey: 'v4' },
  { photo: '/photos/photo18.jpg', label: 'I Love You More ❤️', videoKey: 'v5' },
  { photo: '/photos/photo22.jpg', label: 'Our World 🌍',        videoKey: 'v6' },
];

const VIDEO_DATA = {
  v1: { title: 'Us Together 🌅',      desc: 'One of my favourite memories — golden hour and your smile.',        src: 'video1.mp4' },
  v2: { title: 'Birthday Magic 🎂',    desc: 'Happy Birthday superstar! This one is all for you!',                src: 'video2.mp4' },
  v3: { title: 'Our Adventures 🌿',    desc: 'Every trip, every walk, every silly moment — I treasure them all.', src: 'video3.mp4' },
  v4: { title: 'Stargazing 🌌',        desc: 'Lying under the stars with you is my favourite place to be.',       src: 'video4.mp4' },
  v5: { title: 'My Heart ❤️',           desc: 'This is what my heart looks like every time I see you.',            src: 'video5.mp4' },
  v6: { title: 'Golden Moments ✨',    desc: 'Every single moment with you shines like gold.',                    src: 'video6.mp4' },
  v7: { title: 'Always You 💖',        desc: 'It was always going to be you. Always.',                            src: 'video7.mp4' },
  letter: {
    title: '💌 Love Letter',
    desc: `Happy Birthday, my love! 🎉\n\nI don't know how I got this lucky. You are my best friend, my safe place, my reason to smile every morning.\n\nEvery moment with you is one I treasure. You deserve all the love and happiness in the world.\n\nHappy Birthday, my love. Here's to us. 🥂❤️`,
    src: null,
  },
};

// ── Floating hearts canvas ──
function HeartsCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('hearts-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const EMOJIS = ['❤️','💖','💕','🌹','✨','💛','💗'];
    const pts = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight + window.innerHeight,
      size: Math.random() * 15 + 9,
      speed: Math.random() * 0.5 + 0.18,
      drift: (Math.random() - 0.5) * 0.5,
      op: Math.random() * 0.28 + 0.07,
      e: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    let raf;
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        ctx.save(); ctx.globalAlpha = p.op; ctx.font = p.size + 'px serif';
        ctx.fillText(p.e, p.x, p.y); ctx.restore();
        p.y -= p.speed; p.x += p.drift;
        if (p.y < -30) { p.y = canvas.height + 30; p.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(anim);
    };
    anim();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas id="hearts-canvas" className="fixed inset-0 pointer-events-none z-0" />;
}

export default function App() {
  const [profile, setProfile] = useState(null);
  const [modal, setModal]     = useState(null);
  const [toast, setToast]     = useState(false);

  const handleSelect = (p) => {
    setProfile(p);
    setTimeout(() => { setToast(true); setTimeout(() => setToast(false), 4500); }, 700);
  };

  const openVideo = (key) => setModal(VIDEO_DATA[key]);
  const openCard  = (card) => setModal(VIDEO_DATA[card.videoKey]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <HeartsCanvas />

      {/* Profile screen */}
      <AnimatePresence>{!profile && <ProfileScreen onSelect={handleSelect} />}</AnimatePresence>

      {/* Main site */}
      <AnimatePresence>
        {profile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Navbar profile={profile} />
            <Hero onPlay={() => openVideo('v1')} onLetter={() => openVideo('letter')} />
            <CardRow title='📸 Our Memories <span style="color:#f5c518">— The Best Episodes</span>' cards={MEMORY_CARDS} onCardClick={openCard} />
            <Gallery />
            <Reasons />
            <Letter />
            <Messages />
            <CardRow title='🌟 Fan Favorites <span style="color:#f5c518">— Watch Again</span>' cards={FAVORITE_CARDS} onCardClick={openCard} />
            <footer className="text-center py-10 text-gray-600 text-sm">
              Made with <span className="text-[#e50914]">♥</span> just for you — © ShawtyFlix 2026
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal */}
      <VideoModal modal={modal} onClose={() => setModal(null)} />

      {/* Music player */}
      {profile && <MusicPlayer />}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ bottom: -60, opacity: 0 }}
            animate={{ bottom: 32, opacity: 1 }}
            exit={{ bottom: -60, opacity: 0 }}
            className="fixed left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-[#e50914] to-[#c40812] text-white font-bold px-8 py-4 rounded-full shadow-2xl text-sm whitespace-nowrap"
          >
            🎉 Happy Birthday! This was made with all my love for you ❤️
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

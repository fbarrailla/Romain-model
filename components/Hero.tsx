'use client'

import { motion } from 'framer-motion'

const CHARS = 'ROMAIN'.split('')

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.4,
    },
  },
}

const charVariants = {
  hidden: { opacity: 0, y: 80, skewY: 3 },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay },
})

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden">
      {/* Ambient gradient */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 70%, rgba(201,169,110,0.04) 0%, transparent 60%)',
        }}
      /> */}

      {/* Left vertical label */}
      <motion.div
        {...fadeIn(2)}
        className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 writing-vertical select-none"
      >
        <span className="font-dm text-[8px] tracking-[0.5em] text-gold uppercase">
          Model · Book · 2025
        </span>
      </motion.div>

      {/* Right vertical page number */}
      <motion.div
        {...fadeIn(2.2)}
        className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 writing-vertical select-none"
      >
        <span className="font-cormorant text-[10px] text-rule tracking-[0.4em]">01</span>
      </motion.div>

      {/* Main copy */}
      <div className="relative z-10 px-10 md:px-20 pb-16 md:pb-20">
        {/* Location chip */}
        <motion.div {...slideUp(0.15)} className="flex items-center gap-3 mb-10">
          <span className="block w-7 h-px bg-gold" />
          <span className="font-dm text-[9px] tracking-[0.45em] text-gold uppercase">
            Ho Chi Minh City · Vietnam
          </span>
        </motion.div>

        {/* Giant name */}
        <div className="overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex font-cormorant font-light leading-[0.85] tracking-tight select-none"
            style={{ fontSize: 'clamp(4rem, 16vw, 15rem)' }}
          >
            {CHARS.map((c, i) => (
              <motion.span key={i} variants={charVariants} className="text-cream">
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Sub-row */}
        <div className="flex items-end justify-between mt-5">
          <motion.p
            {...slideUp(1.1)}
            className="font-cormorant italic font-light text-cream-dim"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)', letterSpacing: '0.12em' }}
          >
            Fashion Model
          </motion.p>

          {/* Scroll cue */}
          <motion.div {...fadeIn(2.4)} className="flex flex-col items-center gap-2">
            <span className="font-dm text-[8px] tracking-[0.5em] text-cream-dim uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-cream-dim to-transparent origin-top"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-rule origin-left"
      />
    </section>
  )
}

'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

interface PhotoItem {
  id: number
  caption: string
  tag: 'editorial' | 'runway' | 'commercial'
  aspect: string
  colClass: string
  src?: string
}

const PHOTOS: PhotoItem[] = [
  { id: 1,  caption: 'Prestige Vietnam, 2024',    tag: 'editorial',   aspect: 'aspect-[3/4]',  colClass: 'md:col-span-2', src: '/picture-01.jpeg' },
  { id: 2,  caption: 'Season Lookbook',            tag: 'commercial',  aspect: 'aspect-[3/4]',  colClass: '' },
  { id: 3,  caption: 'HCMC Fashion Week SS25',     tag: 'runway',      aspect: 'aspect-[4/5]',  colClass: '' },
  { id: 4,  caption: 'L\'Officiel Asia',           tag: 'editorial',   aspect: 'aspect-[3/4]',  colClass: '' },
  { id: 5,  caption: 'Campaign — Mekong Studio',  tag: 'commercial',  aspect: 'aspect-[16/9]', colClass: 'md:col-span-3' },
  { id: 6,  caption: 'Personal Work',              tag: 'editorial',   aspect: 'aspect-square', colClass: '' },
  { id: 7,  caption: 'Brand Campaign 2023',        tag: 'commercial',  aspect: 'aspect-[3/4]',  colClass: '' },
  { id: 8,  caption: 'Runway — Saigon SS24',       tag: 'runway',      aspect: 'aspect-[3/4]',  colClass: '' },
]

const FILTERS = ['All', 'Editorial', 'Runway', 'Commercial'] as const
type Filter = (typeof FILTERS)[number]

function PhotoCard({ item, index }: { item: PhotoItem; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${item.colClass} group cursor-pointer`}
    >
      <div className={`${item.src ? '' : 'photo-slot'} ${item.aspect} w-full relative overflow-hidden`}>
        {item.src && (
          <Image
            src={item.src}
            alt={item.caption}
            fill
            className="object-cover object-top"
          />
        )}

        {/* Film-number badge */}
        <span className="absolute top-3 right-3 z-10 font-cormorant text-[10px] text-cream/40 tracking-[0.2em]">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Hover veil */}
        <div className="absolute inset-0 z-10 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
      </div>

      <figcaption className="mt-2 flex items-center justify-between">
        <span className="font-dm text-[9px] tracking-[0.28em] text-cream-dim uppercase">
          {item.caption}
        </span>
        <span className="font-dm text-[8px] tracking-[0.25em] text-rule uppercase">
          {item.tag}
        </span>
      </figcaption>
    </motion.figure>
  )
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const visible = PHOTOS.filter(
    (p) => activeFilter === 'All' || p.tag === activeFilter.toLowerCase()
  )

  return (
    <section id="book" className="py-24 px-8 md:px-14">
      {/* Header */}
      <div ref={headerRef} className="flex items-end justify-between mb-14">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dm text-[9px] tracking-[0.5em] text-gold uppercase mb-3"
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light leading-none text-cream"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            The Book
          </motion.h2>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-cormorant text-rule select-none"
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
        >
          02
        </motion.span>
      </div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center gap-6 mb-10 border-b border-rule pb-5"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`font-dm text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 ${
              activeFilter === f ? 'text-gold' : 'text-rule hover:text-cream-dim'
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {visible.map((item, i) => (
          <PhotoCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

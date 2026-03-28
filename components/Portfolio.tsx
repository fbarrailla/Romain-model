'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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
  { id:  1, caption: 'Vogue Vietnam, 2024',        tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-01.jpg' },
  { id:  2, caption: 'HCMC Fashion Week SS25',     tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-02.jpg' },
  { id:  3, caption: 'Season Lookbook',            tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-03.jpg' },
  { id:  4, caption: 'L\'Officiel Asia',           tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-04.jpg' },
  { id:  5, caption: 'Campaign — Mekong Studio',   tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-05.jpg' },
  { id:  6, caption: 'Runway — Saigon SS24',       tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-06.jpg' },
  { id:  7, caption: 'Brand Campaign 2023',        tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-07.jpg' },
  { id:  8, caption: 'Personal Work',              tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-08.jpg' },
  { id:  9, caption: 'Elle Vietnam, SS24',         tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-09.jpg' },
  { id: 10, caption: 'Runway — Hanoi AW24',        tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-10.jpg' },
  { id: 11, caption: 'Luxury Campaign 2024',       tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-11.jpg' },
  { id: 12, caption: 'Bazar Vietnam',              tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-12.jpg' },
  { id: 13, caption: 'Runway — Da Nang SS25',      tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-13.jpg' },
  { id: 14, caption: 'Lookbook AW23',              tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-14.jpg' },
  { id: 15, caption: 'Numéro Vietnam',             tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-15.jpg' },
  { id: 16, caption: 'Campaign — Studio 9',        tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-16.jpg' },
  { id: 17, caption: 'Runway — Saigon AW23',       tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-17.jpg' },
  { id: 18, caption: 'Fashion Film, 2024',         tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-18.jpg' },
  { id: 19, caption: 'Prestige Vietnam',           tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-19.jpg' },
  { id: 20, caption: 'Runway — HCMC AW24',         tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-20.jpg' },
  { id: 21, caption: 'Beauty Campaign 2023',       tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-21.jpg' },
  { id: 22, caption: 'Vogue Vietnam, AW24',        tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-22.jpg' },
  { id: 23, caption: 'Runway — Hanoi SS25',        tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-23.jpg' },
  { id: 24, caption: 'Campaign — Blue Label',      tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-24.jpg' },
  { id: 25, caption: 'L\'Officiel Asia, SS24',     tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-25.jpg' },
  { id: 26, caption: 'Runway — Da Nang AW23',      tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-26.jpg' },
  { id: 27, caption: 'Lookbook SS25',              tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-27.jpg' },
  { id: 28, caption: 'Elle Vietnam, AW24',         tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-28.jpg' },
  { id: 29, caption: 'Runway — Saigon SS25',       tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-29.jpg' },
  { id: 30, caption: 'Campaign — Indigo House',    tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-30.jpg' },
  { id: 31, caption: 'Numéro Vietnam, 2023',       tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-31.jpg' },
  { id: 32, caption: 'Runway — Hanoi AW23',        tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-32.jpg' },
  { id: 33, caption: 'Campaign — Pearl Studio',    tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-33.jpg' },
  { id: 34, caption: 'Bazar Vietnam, AW24',        tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-34.jpg' },
  { id: 35, caption: 'Runway — HCMC SS23',         tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-35.jpg' },
  { id: 36, caption: 'Fashion Film, 2023',         tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-36.jpg' },
  { id: 37, caption: 'Prestige Vietnam, 2024',     tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-37.jpg' },
  { id: 38, caption: 'Season Lookbook',            tag: 'commercial', aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-38.jpg' },
  { id: 39, caption: 'HCMC Fashion Week SS25',     tag: 'runway',     aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-39.jpg' },
  { id: 40, caption: 'L\'Officiel Asia',           tag: 'editorial',  aspect: 'aspect-[2/3]',  colClass: '',              src: '/photo-40.jpg' },
]

const FILTERS = ['All', 'Editorial', 'Runway', 'Commercial'] as const
type Filter = (typeof FILTERS)[number]

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  items: PhotoItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-7 z-10 font-dm text-[9px] tracking-[0.4em] text-cream/40 hover:text-cream uppercase transition-colors duration-200"
      >
        Close
      </button>

      {/* Counter */}
      <span className="absolute top-6 left-7 font-cormorant text-[11px] tracking-[0.3em] text-cream/30 select-none">
        {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </span>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-5 md:left-10 z-10 p-4 font-cormorant text-2xl text-cream/30 hover:text-cream transition-colors duration-200 select-none"
        aria-label="Previous"
      >
        ←
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-5 md:right-10 z-10 p-4 font-cormorant text-2xl text-cream/30 hover:text-cream transition-colors duration-200 select-none"
        aria-label="Next"
      >
        →
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
        >
          {item.src && (
            <div className="relative" style={{ height: '80vh', maxWidth: '90vw', aspectRatio: '2/3' }}>
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          )}

          {/* Caption */}
          <div className="mt-5 flex items-center gap-6">
            <span className="font-dm text-[9px] tracking-[0.35em] text-cream-dim uppercase">
              {item.caption}
            </span>
            <span className="font-dm text-[8px] tracking-[0.25em] text-rule uppercase">
              {item.tag}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// ─── PhotoCard ────────────────────────────────────────────────────────────────

function PhotoCard({
  item,
  index,
  onClick,
}: {
  item: PhotoItem
  index: number
  onClick: () => void
}) {
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
      onClick={onClick}
    >
      <div className={`${item.aspect} w-full relative overflow-hidden`}>
        {item.src && (
          <Image
            src={item.src}
            alt={item.caption}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
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

// ─── Portfolio ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const visible = PHOTOS.filter(
    (p) => activeFilter === 'All' || p.tag === activeFilter.toLowerCase()
  )

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)),
    [visible.length]
  )
  const nextPhoto = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length]
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
            onClick={() => { setActiveFilter(f); setLightboxIndex(null) }}
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
          <PhotoCard key={item.id} item={item} index={i} onClick={() => setLightboxIndex(i)} />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={visible}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

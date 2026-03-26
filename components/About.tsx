'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const TAGS = ['Editorial', 'Runway', 'Commercial', 'Lookbook', 'Campaign']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="about" ref={ref} className="py-24 px-8 md:px-14 border-t border-rule">
      {/* Header */}
      <div className="flex items-end justify-between mb-14">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dm text-[9px] tracking-[0.5em] text-gold uppercase mb-3"
          >
            Biography
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light leading-none text-cream"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            About Romain
          </motion.h2>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-cormorant text-rule select-none"
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
        >
          04
        </motion.span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[3/4] w-1/2 overflow-hidden">
            <Image
              src="/picture-01.jpeg"
              alt="Romain — Fashion Model, Ho Chi Minh City"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>

        {/* Bio copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="py-4 md:py-12"
        >
          {/* Pull quote */}
          <blockquote className="mb-8 border-l border-gold pl-5">
            <p
              className="font-cormorant italic font-light text-cream leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)' }}
            >
              "A face shaped by two continents,
              <br />
              a presence shaped by one city."
            </p>
          </blockquote>

          <div className="space-y-4 font-dm text-sm leading-loose text-cream-dim">
            <p>
              Romain is a fashion model based in Ho Chi Minh City, Vietnam. Born in France and
              deeply rooted in Southeast Asia, he brings a rare cultural ease to his work — a
              fluency that bridges European editorial sensibility with the vibrant energy of
              contemporary Vietnamese fashion.
            </p>
            <p>
              With experience spanning editorial shoots, runway presentations, and large-scale
              commercial campaigns, Romain has collaborated with luxury houses and independent
              designers across Vietnam, Asia, and Europe. His look — striking, versatile, and
              quietly arresting — has appeared in regional and international publications.
            </p>
            <p>
              Currently represented by leading agencies in Ho Chi Minh City, he is available
              for bookings worldwide.
            </p>
          </div>

          {/* Divider */}
          <div className="my-9 flex items-center gap-4">
            <div className="h-px flex-1 bg-rule" />
            <span className="font-dm text-[8px] tracking-[0.45em] text-gold uppercase">
              Available Worldwide
            </span>
            <div className="h-px flex-1 bg-rule" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="font-dm text-[8px] tracking-[0.3em] uppercase border border-rule text-rule px-3 py-1.5 hover:border-gold hover:text-gold transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

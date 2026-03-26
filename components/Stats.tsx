'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MEASUREMENTS = [
  { label: 'Height', value: '185', unit: 'cm', alt: '6\'1"' },
  { label: 'Chest',  value: '95',  unit: 'cm', alt: '37.5"' },
  { label: 'Waist',  value: '76',  unit: 'cm', alt: '30"' },
  { label: 'Hips',   value: '92',  unit: 'cm', alt: '36"' },
  { label: 'Shoes',  value: '43',  unit: 'EU', alt: 'US 10' },
]

const DETAILS = [
  { label: 'Eyes',      value: 'Brown' },
  { label: 'Hair',      value: 'Dark Brown' },
  { label: 'Languages', value: 'French · English · Vietnamese' },
  { label: 'Based in',  value: 'Ho Chi Minh City' },
  { label: 'Available', value: 'Worldwide' },
]

function Row({
  label,
  children,
  delay,
  fromLeft,
}: {
  label: string
  children: React.ReactNode
  delay: number
  fromLeft: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-baseline justify-between py-4 border-b border-rule group"
    >
      <span className="font-dm text-[9px] tracking-[0.35em] uppercase text-cream-dim group-hover:text-gold transition-colors duration-300">
        {label}
      </span>
      {children}
    </motion.div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <section id="stats" ref={ref} className="py-24 px-8 md:px-14 border-t border-rule">
      {/* Header */}
      <div className="flex items-end justify-between mb-14">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dm text-[9px] tracking-[0.5em] text-gold uppercase mb-3"
          >
            Measurements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light leading-none text-cream"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Stats & Details
          </motion.h2>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-cormorant text-rule select-none"
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
        >
          03
        </motion.span>
      </div>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
        {/* Measurements column */}
        <div>
          {inView &&
            MEASUREMENTS.map((m, i) => (
              <Row key={m.label} label={m.label} delay={0.15 + i * 0.07} fromLeft>
                <div className="flex items-baseline gap-2">
                  <span className="font-cormorant font-light text-cream" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                    {m.value}
                  </span>
                  <span className="font-dm text-[9px] tracking-[0.2em] uppercase text-gold">{m.unit}</span>
                  <span className="font-dm text-[9px] text-rule">/ {m.alt}</span>
                </div>
              </Row>
            ))}
        </div>

        {/* Details column */}
        <div>
          {inView &&
            DETAILS.map((d, i) => (
              <Row key={d.label} label={d.label} delay={0.15 + i * 0.07} fromLeft={false}>
                <span
                  className="font-cormorant font-light text-cream text-right"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
                >
                  {d.value}
                </span>
              </Row>
            ))}
        </div>
      </div>
    </section>
  )
}

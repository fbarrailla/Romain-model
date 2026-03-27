'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

const CONTACT_INFO = [
  { label: 'Agency',    value: 'Your Agency Name',        href: undefined },
  { label: 'Email',     value: 'booking@romainmodel.com', href: 'mailto:booking@romainmodel.com' },
  { label: 'Instagram', value: '@romainmodel',            href: '#' },
  { label: 'Location',  value: 'Hồ Chí Minh, Việt Nam',  href: undefined },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      await emailjs.send(
        'service_nop1bn9',
        'template_tr5eo3d',
        { name: form.name, email: form.email, message: form.message },
        '-BGhKDSFxI8D8E1hT'
      )
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const field = (id: keyof typeof form, label: string, type = 'text', rows?: number) => (
    <div>
      <label
        htmlFor={id}
        className="font-dm text-[9px] tracking-[0.4em] text-gold uppercase block mb-2"
      >
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={form[id]}
          onChange={(e) => setForm((s) => ({ ...s, [id]: e.target.value }))}
          placeholder={label === 'Message' ? 'Tell me about your project…' : ''}
          className="w-full bg-transparent border-b border-rule focus:border-gold outline-none py-3 font-cormorant text-lg text-cream placeholder:text-rule transition-colors resize-none"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={form[id]}
          onChange={(e) => setForm((s) => ({ ...s, [id]: e.target.value }))}
          className="w-full bg-transparent border-b border-rule focus:border-gold outline-none py-3 font-cormorant text-lg text-cream placeholder:text-rule transition-colors"
        />
      )}
    </div>
  )

  return (
    <section id="contact" ref={ref} className="py-24 px-8 md:px-14 border-t border-rule">
      {/* Header */}
      <div className="flex items-end justify-between mb-14">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dm text-[9px] tracking-[0.5em] text-gold uppercase mb-3"
          >
            Bookings
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light leading-none text-cream"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Get in Touch
          </motion.h2>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-cormorant text-rule select-none"
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
        >
          05
        </motion.span>
      </div>

      <div className="grid md:grid-cols-2 gap-14 md:gap-20">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {CONTACT_INFO.map(({ label, value, href }) => (
            <div key={label}>
              <p className="font-dm text-[9px] tracking-[0.4em] text-gold uppercase mb-1.5">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="font-cormorant text-xl text-cream hover:text-gold transition-colors duration-300"
                >
                  {value}
                </a>
              ) : (
                <p className="font-cormorant text-xl text-cream">{value}</p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {sent ? (
            <div className="flex flex-col justify-center h-full gap-4 py-12">
              <span className="font-cormorant text-4xl text-gold">Thank you.</span>
              <p className="font-dm text-sm text-cream-dim leading-relaxed">
                Your message has been received. We will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {field('name', 'Name')}
              {field('email', 'Email', 'email')}
              {field('message', 'Message', 'text', 4)}
              {error && (
                <p className="font-dm text-[10px] tracking-widest text-red-400 uppercase">{error}</p>
              )}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center gap-5 font-dm text-[10px] tracking-[0.4em] uppercase text-cream hover:text-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{sending ? 'Sending…' : 'Send Enquiry'}</span>
                  <span className="block w-8 h-px bg-current group-hover:w-16 transition-all duration-500" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-rule flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-cormorant text-sm text-rule">
          © 2025 Romain. All rights reserved.
        </span>
        <span className="font-cormorant italic text-sm text-rule">
          Ho Chi Minh City, Vietnam
        </span>
      </div>
    </section>
  )
}

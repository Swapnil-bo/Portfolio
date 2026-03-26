import { motion } from 'framer-motion'

function SectionDivider() {
  return (
    <div className="flex justify-center py-8">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 200, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          height: 1,
          background: 'var(--neon-green)',
          opacity: 0.2,
          boxShadow: '0 0 8px rgba(0,255,136,0.15)',
        }}
      />
    </div>
  )
}

export default SectionDivider

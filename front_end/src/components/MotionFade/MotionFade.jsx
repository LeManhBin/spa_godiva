import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import PropTypes from 'prop-types';

export function MotionFade({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible').then((r) => r)
    }
  }, [isInView, mainControls])

  return (
    <div ref={ref} className='w-full'>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial={'hidden'}
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

MotionFade.propTypes = {
    children: PropTypes.any
}
  
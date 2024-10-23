import React, { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  playOnce?: boolean;
  translateY?: number;
}

const FadeInUpwardAnimation: React.FC<FadeInUpProps> = ({ children, delay = 0, playOnce = false, translateY = 50 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: playOnce, margin: '-50px' });

  const variants: Variants = {
    hidden: { opacity: 0, y: translateY },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  };

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className='w-fit'
    >
      {children}
    </motion.div>
  );
};

export default FadeInUpwardAnimation;

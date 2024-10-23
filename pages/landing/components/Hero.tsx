// import { MouseScroll } from '@/assets/images';
import ScrollTo from '@/utils/scrollTo';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const bannerRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 0.9]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!bannerRef.current) return;
      if (document.visibilityState === 'visible') {
        bannerRef.current.play();
      } else {
        bannerRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  return (
    <section className='relative h-svh w-full'>
      <div className='fixed inset-0 bg-black'>
        <video
          playsInline
          autoPlay
          muted
          loop
          className='h-full w-full object-cover'
          poster='/hero.jpg'
          ref={bannerRef}
        >
          <source src='/hero.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        <motion.div className='absolute inset-0 w-full bg-black' style={{ opacity }} />
        <button
          className='border-2 border-white rounded-full w-[46px] h-[46px] absolute animate-bounce bottom-10 left-1/2 -ml-2 z-10 group'
          onClick={() => ScrollTo('artworks')}
        >
          <svg
            className='absolute top-2 left-1/2 -ml-3 text-white h-6 w-6 transition-all duration-300 ease-in-out group-hover:text-black'
            xmlns='http://www.w3.org/2000/svg'
            width='200'
            height='200'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
          >
            <path d='M4.97 13.22a.75.75 0 011.06 0L11 18.19V3.75a.75.75 0 011.5 0v14.44l4.97-4.97a.749.749 0 011.275.326.749.749 0 01-.215.734l-6.25 6.25a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06z'></path>
          </svg>
          <span className='absolute w-0 h-0 top-1/2 l-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full transition-all duration-300 ease-in-out group-hover:w-[46px] group-hover:h-[46px] z-[-1]' />
        </button>
      </div>
    </section>
  );
};

export default Hero;

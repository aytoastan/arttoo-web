/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import throttle from 'lodash.throttle';
// import platform from 'platform';

// const Steps = [
//   {
//     title: 'Explore',
//     progress: { min: 0, max: 0.33 },
//     description:
//       "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's.",
//   },
//   {
//     title: 'Invest',
//     progress: { min: 0.33, max: 0.66 },
//     description:
//       'Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.',
//   },
//   {
//     title: 'Earn',
//     progress: { min: 0.66, max: 1 },
//     description:
//       'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more.',
//   },
// ];

// // const videoSrc = 'section3-highres.mp4';
// const videoSrcMob = 'section3-highres-8s_15.webm';
// const videoSrc = 'section3-highres-8s_15.mp4';
// // const videoSrc = 'https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4';
// // const videoSrc = 'steps-43.mp4';

// const Learn: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isIOS, setIsIOS] = useState(false);

//   const handleScroll = useCallback(
//     throttle(() => {
//       const video = videoRef.current;
//       const container = containerRef.current;

//       if (!video || !container) return;

//       const { top, height } = container.getBoundingClientRect();
//       const percentScrolled = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));

//       if (video.duration) {
//         video.currentTime = video.duration * percentScrolled;
//       }

//       const newStep = Steps.findIndex(
//         (step) => percentScrolled >= step.progress.min && percentScrolled < step.progress.max
//       );

//       if (newStep !== -1 && newStep !== currentStep) {
//         setCurrentStep(newStep);
//       }
//     }, 100),
//     [currentStep]
//   );

//   useEffect(() => {
//     const handleScrollListener = () => {
//       requestAnimationFrame(handleScroll);
//     };

//     window.addEventListener('scroll', handleScrollListener);
//     return () => window.removeEventListener('scroll', handleScrollListener);
//   }, [handleScroll]);

//   useEffect(() => {
//     setIsIOS(platform.os?.family?.toString().toLowerCase() === 'ios' ? true : false); // Detect if the OS is iOS
//   }, [platform]);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       video.pause();
//     }
//   }, [isIOS]);

//   return (
//     <section ref={containerRef} className='relative h-[300vh]'>
//       <div className='sticky top-0 h-screen flex items-center justify-center'>
//         <div className='h-[80svh] w-[90vw] sm:w-[85vw] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start justify-between lg:items-center'>
//           <div className='bg-white w-full lg:w-1/2 aspect-square order-2 lg:order-1'>
//             <video
//               ref={videoRef}
//               className='w-full h-full object-contain relative z-10'
//               autoPlay
//               playsInline
//               muted
//               preload='auto'
//             >
//               <source src={videoSrcMob} type="video/webm; codecs='vp8, vorbis'" />
//               <source src={videoSrc} type='video/mp4' />
//               <p>Your browser does not support the HTML5 Video element.</p>
//             </video>
//           </div>
//           <div className='flex flex-col w-full lg:w-1/2 lg:pl-8 order-1 lg:order-2 pt-10 lg:pt-0'>
//             <AnimatePresence mode='wait'>
//               <motion.div
//                 key={currentStep}
//                 initial={{ opacity: 0, y: 360 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -50 }}
//                 transition={{ duration: 0.25, ease: 'easeInOut' }}
//                 className='flex gap-4 items-start justify-start pt-16'
//               >
//                 <span className='text-black/30 text-[40px] italic leading-[52.4px] lg:mt-4'>{`0${
//                   currentStep + 1
//                 }`}</span>
//                 <div className='flex flex-col gap-2'>
//                   <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium'>
//                     {Steps[currentStep].title}
//                   </h4>
//                   <p className='text-[16px] leading-[20.4px] md:text-[20px] md:leading-[26.2px]'>
//                     {Steps[currentStep].description}
//                   </p>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Learn;

'use client';
import FadeInUpwardAnimation from '@/components/FadeInUpwardAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import platform from 'platform';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Steps = [
  {
    title: 'Explore',
    progress: { min: 0, max: 0.53 },
    description:
      "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's. ",
  },
  {
    title: 'Invest',
    progress: { min: 0.53, max: 0.87 },

    description:
      'Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.',
  },
  {
    title: 'Earn',
    progress: { min: 0.87, max: 0.988 },
    description:
      'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more..',
  },
];

const Learn = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [windowWidth, setwindowWidth] = useState<number>(0);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [progression, setProgression] = useState<number>(0);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(platform.os?.family?.toString().toLowerCase() === 'ios' ? true : false); // Detect if the OS is iOS
  }, [platform]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  }, [isIOS]);

  useEffect(() => {
    setIsAndroid(/Android/i.test(navigator.userAgent));
    window.addEventListener('resize', (e) => {
      setwindowWidth((p) => window.innerWidth);
    });
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setVideoLoaded(true);
        video.currentTime = 10; // Set to first frame
      };
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {};
  }, []);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
      console.log({ set: 3 });
      video.currentTime = 3; // Set to first frame
    };
    let lastUpdateTime = 0;
    const updateInterval = isAndroid ? 100 : 0; // Throttle updates on Android

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 10%', // Start when the top of the container hits 50% of the viewport
      end: 'bottom bottom', // End when the bottom of the container hits 50% of the viewport
      pin: leftRef.current,
      onUpdate: (e) => {
        const currentTime = performance.now();
        if (currentTime - lastUpdateTime < updateInterval) return;

        if (video && video.duration) {
          const totalTime = video.duration;
          const progress = e.progress;
          setProgression((p) => progress);
          requestAnimationFrame(() => {
            video.currentTime = totalTime * progress;
          });
          if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
            video.requestVideoFrameCallback(() => {
              video.currentTime = totalTime * progress;
            });
          } else {
            video.currentTime = totalTime * progress;
          }
        }
        lastUpdateTime = currentTime;
      },
    });
  }, []);

  return (
    <section ref={containerRef} className='w-[90vw] mx-auto sm:w-[85vw]'>
      <div className='flex flex-col md:flex-row'>
        <div className='h-[50rem] md:w-1/2 flex justify-end items-end md:justify-center md:items-center' ref={leftRef}>
          <video autoPlay ref={videoRef} muted className='w-full' preload='auto'>
            <source
              type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
              src='https://arttoo-web-sigma.vercel.app/section3-highres-8s_15.mp4'
            ></source>
            Your browser does not support the video tag.
          </video>
        </div>
        <div className=' md:w-1/2 flex flex-col gap-8 justify-center md:z-1 '>
          {Steps.map((item, index) => {
            return (
              <div key={index} className={`max-w-[800px]  h-screen flex justify-center items-start`}>
                {item.title && (
                  <div className='flex gap-4 items-start justify-center'>
                    <span className='text-black/30 text-[40px] italic leading-[52.4px] md:mt-4'>{`0${index + 1}`}</span>
                    <div className='flex flex-col gap-2'>
                      <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium'>
                        {item.title}
                      </h4>
                      <p className='text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px]'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Learn;

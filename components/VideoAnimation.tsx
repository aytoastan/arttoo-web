import { useScroll, useSpring } from "framer-motion";
import React, { useEffect, useRef } from "react";

const VideoAnimation = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  // Smooth the scrollYProgress value
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 100,
    mass: 1,
  });

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Update video currentTime based on scroll progress
      const unsubscribe = scrollProgress.onChange((value) => {
        const duration = video.duration || 0.1; // Prevent division by zero
        video.currentTime = value * duration;
      });

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    }
  }, [scrollProgress]);
  return (
    <div ref={scrollRef} className="h-[300vh]">
      <video
        ref={videoRef}
        src="/steps.mp4"
        muted
        className="max-w-[720px] z-50 fixed top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default VideoAnimation;

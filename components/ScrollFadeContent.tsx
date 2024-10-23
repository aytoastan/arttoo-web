"use client";

import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

export interface ContentItem {
  title: string;
  description: string;
}

interface ScrollFadeContentProps {
  items: ContentItem[];
  progress: MotionValue<number>;
}

const ScrollFadeContent: React.FC<ScrollFadeContentProps> = ({
  items,
  progress,
}) => {
  return (
    <div className="min-h-screen py-20 right-0">
      {items.map((item, index) => (
        <ContentSection
          key={item.title}
          item={item}
          index={index}
          progress={progress}
          itemCount={items.length} // pass total items count
        />
      ))}
    </div>
  );
};

export interface ContentSectionProps {
  item: ContentItem;
  index: number;
  progress: MotionValue<number>;
  itemCount: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  item,
  index,
  progress,
  itemCount,
}) => {
  // Set the range for each item and ensure each content animates smoothly
  const rangeStart = index / itemCount;
  const rangeEnd = (index + 1) / itemCount;

  // Apply smooth transition using `useTransform` and `useSpring`
  const sectionProgress = useTransform(
    progress,
    [rangeStart, rangeEnd],
    [0, 1]
  );
  const smoothProgress = useSpring(sectionProgress, {
    damping: 50,
    stiffness: 600,
  });

  const y = useTransform(smoothProgress, [0, 0.5, 1], ["100%", "0%", "-100%"]);
  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 0.95, 1],
    [0, 1, 1, 1, 1, 0]
  );

  return (
    <motion.div
      className="h-[80vh] w-full flex items-center justify-center sticky top-0 z-20"
      style={{ opacity }}
    >
      <motion.div className="" style={{ y }}>
        <div id="cards" key={index} className="flex gap-4 max-w-[800px]">
          <span className="text-black/30 text-[40px] italic leading-[52.4px] mt-4">{`0${
            index + 1
          }`}</span>
          <div className="flex flex-col gap-2">
            <h3 className="text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium">
              {item.title}
            </h3>
            <p className=" text-[16px] leading-[20.4px] sm:text-[20px] sm:leading-[26.2px]">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollFadeContent;

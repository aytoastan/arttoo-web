"use client";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const VideoPlayAnimation = ({
  currentIndex,
}: {
  currentIndex: MotionValue<number>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 1000 });

  const images = useMemo(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 9; i <= 239; i++) {
      const img = new Image();
      img.src = `/steps/step-${i}.png`;
      img.onload = () => {
        if (i === 0) {
          setCanvasSize({ width: img.width, height: img.height });
        }
      };
      loadedImages.push(img);
    }

    return loadedImages;
  }, []);

  const render = useCallback(
    (index: number) => {
      const ctx = canvasRef.current?.getContext("2d", { alpha: false });
      if (ctx && images[index - 1]) {
        const img = images[index - 1];

        // Calculate scaling factor
        const scale = Math.min(
          canvasSize.width / img.width,
          canvasSize.height / img.height
        );

        // Calculate new dimensions
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        // Calculate position to center the image
        const x = (canvasSize.width - newWidth) / 2;
        const y = (canvasSize.height - newHeight) / 2;

        // Clear canvas and draw scaled image
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
        ctx.drawImage(img, x, y, newWidth, newHeight);
      }
    },
    [images, canvasSize]
  );

  // const currentIndex = useTransform(progress, [0, 1], [1, 231]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Number(latest.toFixed()));
  });

  useEffect(() => {
    render(1);
  }, [render]);

  return (
    <div className="max-w-[640px] max-h-[640px] h-full w-full aspect-square flex items-center justify-center mt-40 md:mt-20">
      <canvas
        width={canvasSize.width}
        height={canvasSize.height}
        ref={canvasRef}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export default VideoPlayAnimation;

// import React from "react";

// const VideoPlayAnimation = () => {
//   return <div>VideoPlayAnimation</div>;
// };

// export default VideoPlayAnimation;

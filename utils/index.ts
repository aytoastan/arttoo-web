import { useEffect } from "react";
import { useState } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
    const updateSize = () => { setSize([window.innerWidth, window.innerHeight]); }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
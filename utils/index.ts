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

// 正则表达式解释：
// ^$ 匹配空字符串
// |    或者
// ^[1-9]\d*$ 匹配正整数
// ^0$ 匹配单个0
// ^[1-9]\d*\.\d*$ 匹配小数（小数点前必须有数字且不能以0开头，小数点后可以有或没有数字）
// ^0\.\d*$ 匹配以0开头的小数
const numberRegex = /^$|^[1-9]\d*$|^0$|^[1-9]\d*\.\d*$|^0\.\d*$/

// 使用示例：
export const isValidNumber = (value: string): boolean => {
  return numberRegex.test(value)
}
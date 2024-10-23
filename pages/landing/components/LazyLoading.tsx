import React, { useState, useRef, useEffect } from 'react';

interface LazyLoadComponentProps {
  children: React.ReactNode;
}

const LazyLoadComponent: React.FC<LazyLoadComponentProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return <div ref={componentRef}>{isVisible ? children : null}</div>;
};

export default LazyLoadComponent;

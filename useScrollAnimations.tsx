import React, { useEffect, useRef, useState } from 'react';

export function useScrollProgress() {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    progress: 0,
  });

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentY = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(currentY / docHeight, 0), 1);
      setScrollState({ scrollY: currentY, progress });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return scrollState;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.14,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return 'translate3d(0, 42px, 0) scale(0.97)';
      case 'down':
        return 'translate3d(0, -42px, 0) scale(0.97)';
      case 'left':
        return 'translate3d(-44px, 0, 0) scale(0.98)';
      case 'right':
        return 'translate3d(44px, 0, 0) scale(0.98)';
      case 'scale':
        return 'translate3d(0, 18px, 0) scale(0.88)';
      default:
        return 'translate3d(0, 36px, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 850ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 850ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

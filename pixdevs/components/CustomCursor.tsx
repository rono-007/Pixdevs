import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorPos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) {
        setIsVisible(true);
        followerPos.current = { x: e.clientX, y: e.clientY };
      }

      // Instant update for the central dot
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('group') // Often used for interactive cards
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    // Animation loop for the smooth follower
    let rafId: number;
    const animate = () => {
      // Linear interpolation (lerp) for smooth movement
      const ease = 0.15;
      followerPos.current.x += (cursorPos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (cursorPos.current.y - followerPos.current.y) * ease;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Only show on non-touch devices (CSS will handle hiding default cursor)
  return (
    <>
      {/* Main Center Dot (Bullet) */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -mt-1 -ml-1 mix-blend-difference hidden md:block transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
      
      {/* Trailing Ring */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] -mt-4 -ml-4 mix-blend-difference hidden md:block transition-all duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${isHovering ? 'scale-[2.5] bg-white border-transparent opacity-30' : 'scale-100 opacity-100'}`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
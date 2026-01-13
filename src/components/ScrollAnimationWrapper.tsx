import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type AnimationType = 
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in"
  | "slide-up"
  | "glitch";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animationClasses: Record<AnimationType, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-10",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-10",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-10",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-10",
    animate: "opacity-100 translate-x-0",
  },
  "scale-up": {
    initial: "opacity-0 scale-90",
    animate: "opacity-100 scale-100",
  },
  "blur-in": {
    initial: "opacity-0 blur-sm",
    animate: "opacity-100 blur-0",
  },
  "slide-up": {
    initial: "opacity-0 translate-y-20",
    animate: "opacity-100 translate-y-0",
  },
  "glitch": {
    initial: "opacity-0",
    animate: "opacity-100 animate-glitch-in",
  },
};

const ScrollAnimationWrapper = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.1,
}: ScrollAnimationWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  const { initial, animate } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ${isVisible ? animate : initial} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;

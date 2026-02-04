import { useState, useRef, useCallback, useEffect } from "react";

interface UseCarouselOptions {
  totalItems: number;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  swipeThreshold?: number;
}

export function useCarousel({
  totalItems,
  breakpoints = { sm: 1, md: 2, lg: 3 },
  swipeThreshold = 50,
}: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(breakpoints.lg || 3);
  
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(breakpoints.sm || 1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(breakpoints.md || 2);
      } else {
        setItemsPerView(breakpoints.lg || 3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [breakpoints]);

  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  }, [maxIndex]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;

    if (diff > swipeThreshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else if (diff < -swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  }, [currentIndex, maxIndex, swipeThreshold]);

  return {
    currentIndex,
    itemsPerView,
    maxIndex,
    handlePrev,
    handleNext,
    goToIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    canGoPrev: currentIndex > 0,
    canGoNext: currentIndex < maxIndex,
  };
}

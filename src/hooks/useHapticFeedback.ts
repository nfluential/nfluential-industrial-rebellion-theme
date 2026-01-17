import { useCallback } from 'react';

export const useHapticFeedback = () => {
  const trigger = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30],
      };
      navigator.vibrate(patterns[type]);
    }
  }, []);

  const onClick = useCallback((callback?: () => void, type: 'light' | 'medium' | 'heavy' = 'light') => {
    return () => {
      trigger(type);
      callback?.();
    };
  }, [trigger]);

  return { trigger, onClick };
};

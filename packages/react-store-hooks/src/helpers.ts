import { useEffect, useLayoutEffect, useRef } from 'react';

export const useIsomorphicEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const useIsMounted = () => {
  const isMounted = useRef<boolean>(true);

  useIsomorphicEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
};

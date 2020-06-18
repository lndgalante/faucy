import { useEffect } from 'react';

export const useAnimateLogoAtStart = (logoAnimation) => {
  useEffect(() => {
    const id = setTimeout(() => {
      if (logoAnimation) logoAnimation.goToAndPlay(0);
    }, 1000);

    return () => clearTimeout(id);
  }, [logoAnimation]);
};

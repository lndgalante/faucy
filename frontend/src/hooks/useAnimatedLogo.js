import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

// Animations
import whiteLogo from '../assets/lottie/logo-white.json';
import blackLogo from '../assets/lottie/logo-black.json';

export const useAnimatedLogo = (colorMode) => {
  // react hooks - state
  const [logoAnimation, setLogoAnimation] = useState(null);

  // react hooks - refs
  const boxContainerRef = useRef(null);
  const animationContainerRef = useRef(null);

  useEffect(() => {
    if (!animationContainerRef || !animationContainerRef.current) return;

    const animation = lottie.loadAnimation({
      loop: false,
      autoplay: false,
      renderer: 'svg',
      container: animationContainerRef.current,
      animationData: colorMode === 'light' ? whiteLogo : blackLogo,
    });
    setLogoAnimation(animation);

    const playForward = () => animation.goToAndPlay(0);
    const buttonContainerElement = boxContainerRef.current;
    buttonContainerElement.addEventListener('mouseenter', playForward);

    return () => {
      animation.destroy();
      buttonContainerElement.removeEventListener('mouseenter', playForward);
    };
  }, [colorMode, animationContainerRef, boxContainerRef]);

  return { boxContainerRef, animationContainerRef, logoAnimation };
};

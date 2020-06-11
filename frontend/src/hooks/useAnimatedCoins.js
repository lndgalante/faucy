import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

// Animations
import blackCoins from '../assets/lottie/coins-black.json';
import whiteCoins from '../assets/lottie/coins-white.json';

export const useAnimatedCoins = (colorMode) => {
  const buttonContainerRef = useRef(null);
  const animationContainerRef = useRef(null);

  useEffect(() => {
    if (!animationContainerRef || !animationContainerRef.current) return;

    const animation = lottie.loadAnimation({
      loop: false,
      autoplay: false,
      renderer: 'svg',
      container: animationContainerRef.current,
      animationData: colorMode === 'light' ? blackCoins : whiteCoins,
    });

    const playForward = () => animation.playSegments([0, 15], true);
    const playBackard = () => animation.playSegments([15, 28], true);

    const buttonContainerElement = buttonContainerRef.current;
    buttonContainerElement.addEventListener('mouseenter', playForward);
    buttonContainerElement.addEventListener('mouseleave', playBackard);

    const color = colorMode === 'light' ? 'rgb(26, 32, 44)' : 'rgba(255, 255, 255, 0.92)';
    const coin = document.querySelector('.lottie-container svg');
    if (coin) {
      const svgPaths = [...coin.querySelectorAll('path')];
      svgPaths.forEach((path) => {
        if (path.hasAttribute('stroke')) path.setAttribute('stroke', color);
        if (path.hasAttribute('fill')) path.setAttribute('fill', color);
      });
    }

    return () => {
      animation.destroy();
      buttonContainerElement.removeEventListener('mouseenter', playForward);
      buttonContainerElement.removeEventListener('mouseleave', playBackard);
    };
  }, [colorMode, animationContainerRef, buttonContainerRef]);

  return { buttonContainerRef, animationContainerRef };
};

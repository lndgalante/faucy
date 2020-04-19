import useSound from 'use-sound';

// Assets
import errorSound from '../assets/sounds/error.wav';
import successSound from '../assets/sounds/success.wav';

const useSounds = () => {
  const [playErrorSound] = useSound(errorSound);
  const [playSuccessSound] = useSound(successSound);

  return { playErrorSound, playSuccessSound };
};

export { useSounds };

import { useLocalStorage as useBeautifulLocalStorage } from 'beautiful-react-hooks';

// Utils
import { isDOMavailable } from '../utils/dom';

const useLocalStorage = (key, defaultValue) => {
  if (!isDOMavailable) return [];
  return useBeautifulLocalStorage(key, defaultValue);
};

export { useLocalStorage };

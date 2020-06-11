import { useLocalStorage as useBeautifulLocalStorage } from 'beautiful-react-hooks';

// Utils
import { isDOMavailable } from '../utils/dom';

export const useLocalStorage = (key, defaultValue) => {
  if (!isDOMavailable) return [];
  return useBeautifulLocalStorage(key, defaultValue); // eslint-disable-line react-hooks/rules-of-hooks
};

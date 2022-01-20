import { useEffect, useRef } from 'react';

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/ but now using setTimeout
const useTimeout = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const handler = (...args) => savedCallback.current(...args);

    if (delay !== null) {
      const id = setTimeout(handler, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;

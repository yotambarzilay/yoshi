import { useRef } from 'react';

const useOnce = (fn: () => void) => {
  const called = useRef<boolean>(false);

  if (!called.current) {
    fn();
    called.current = true;
  }
};

export default useOnce;

import { useEffect, useRef, useCallback } from "react";

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  const callback = useCallback(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, [func]);

  useEffect(callback, deps);
};

export default useDidMountEffect;

export function createHooks(callback) {
  let states = []
  let currentIndex = 0
  const useState = (initState) => {
    const indexForThisState = currentIndex;
    currentIndex++;
    if (states[indexForThisState] === undefined) {
      states[indexForThisState] = initState;
    }
    return [states[indexForThisState], (newState) => {
      if (states[indexForThisState] === newState) {
        return;
      }
      states[indexForThisState] = newState;
      callback();
    }];
  };

  let memo
  let deps = []
  const useMemo = (fn, refs) => {
    if (memo === undefined || refs.some((ref, index) => ref !== deps[index])) {
      memo = fn();
      deps = refs;
    }
    return memo;
  };

  const resetContext = () => {
    currentIndex = 0
  }

  return { useState, useMemo, resetContext };
}

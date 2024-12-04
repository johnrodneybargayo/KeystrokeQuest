import { useState, useEffect, useCallback } from "react";

export function useTimer(initialDuration: number) {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialDuration);
  }, [initialDuration]);

  return { timeLeft, startTimer, resetTimer };
}

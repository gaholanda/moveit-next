interface CountdownContextData{
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountdown: () => void,
  resetContdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode;
}

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

  const initialTime = 0.1 * 60;
  const { startNewChallenge } = useContext(ChallengesContext)
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = () => {
    setIsActive(true);
  }

  const resetContdown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(initialTime);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else
    if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetContdown
    }}>
      { children }
    </CountdownContext.Provider>
  )
}
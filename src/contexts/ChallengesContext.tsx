interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  level: number,
  userXp: number,
  xpToNextLevel: number,
  challengesCompleted: number,
  activeChallenge: Challenge,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void
}


import React, { createContext, useState, useEffect, ReactNode } from 'react';
import challenges from '../../challenges.json';

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  const levelUp = () => setLevel(level + 1);

  useEffect(() => {
    Notification.requestPermission();
  },[])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio!', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalXp = userXp + amount;

    if (finalXp >= xpToNextLevel) {
      finalXp = finalXp - xpToNextLevel;
      levelUp();
    }

    setUserXp(finalXp);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);

  }

  return (
    <ChallengesContext.Provider value={{
      level,
      userXp,
      xpToNextLevel,
      challengesCompleted,
      activeChallenge,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge
    }}>
      { children }
    </ChallengesContext.Provider>
  );
}
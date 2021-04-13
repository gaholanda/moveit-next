interface ChallengesProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  level: number,
  userXp: number,
  challengesCompleted: number,
  levelUp: () => void,
  startNewChallenge: () => void
}


import React, { createContext, useState, ReactNode } from 'react';

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const levelUp = () => setLevel(level + 1);

  function startNewChallenge() {
    console.log('New challenge!');
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      userXp,
      challengesCompleted,
      levelUp,
      startNewChallenge
    }}>
      { children }
    </ChallengesContext.Provider>
  );
}
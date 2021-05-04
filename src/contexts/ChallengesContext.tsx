interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  userXp: number;
  challengesCompleted: number;
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
  completeChallenge: () => void,
  closeLevelUpModal: () => void
}


import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [userXp, setUserXp] = useState(rest.userXp ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isOpenLevelUpModal, setIsOpenLevelUpModal] = useState(false);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('userXp', String(userXp));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, userXp, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsOpenLevelUpModal(true);
  };

  function closeLevelUpModal() {
    setIsOpenLevelUpModal(false);
  }

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
      completeChallenge,
      closeLevelUpModal
    }}>
      { children }
      { isOpenLevelUpModal && <LevelUpModal level={level} closeLevelUpModal={closeLevelUpModal} />}
    </ChallengesContext.Provider>
  );
}
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { userXp, xpToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(userXp * 100) / xpToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} className={styles.userXp} />
        <span className={styles.currentXp} style={{ left: `${percentToNextLevel}%` }}>{ userXp } xp</span>
      </div>
      <span>{ xpToNextLevel }</span>
    </header>
  )
}

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  userXp: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider {...props}>
      <div className={styles.container}>
        <Head>
          <title>Moveit</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { level, userXp, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      userXp: Number(userXp),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

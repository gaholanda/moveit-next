import styles from '../styles/components/LevelUpModal.module.css';

interface LevelUpModalProps {
  level: number,
  closeLevelUpModal: () => void
}

export function LevelUpModal({ level, closeLevelUpModal }: LevelUpModalProps) {

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{ level }</header>
        <strong>Parabéns!</strong>
        <p>Você alcançou um novo level!</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>
      </div>
    </div>
  )
}
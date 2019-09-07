import React from 'react';
import styles from './ScoreBoardTitle.module.scss';

const ScoreBoardTitle = (props) => {
  const { name, home, away } = props
  const gameResult = () => {
    if (home - away > 0) return 0
    else if (home - away < 0) return 1
    return 2
  }

  return (
    <div className={`${styles.titleBoard} ${gameResult() === 0 && styles.home} ${gameResult() === 1 && styles.away}`}>
      <h3>{name}</h3>
    </div>
  )
}

export default ScoreBoardTitle;
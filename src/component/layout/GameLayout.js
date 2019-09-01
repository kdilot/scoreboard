import React, { useEffect } from 'react';
import { ScoreLayout, PointLayout } from 'component';
import styles from './GameLayout.module.scss';

const GameLayout = (props) => {
  const { name, flag, playing, handleScore } = props

  useEffect(() => {
    if (playing && (flag || !flag)) {
      setTimeout(() => {
        handleScore(name)
      }, 650)
    }
  }, [handleScore, name, playing, flag])

  return (
    <div className={styles.gameLayout}>
      <div><ScoreLayout {...props} /></div>
      <div><PointLayout {...props} /></div>
    </div>
  )
}

export default GameLayout;
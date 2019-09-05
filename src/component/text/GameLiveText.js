import React from 'react';
import styles from './GameLiveText.module.scss';

const GameLiveText = (props) => {
  const { playing } = props
  return (
    <div className={styles.gameLive}>
      <h2 className={!playing ? styles.gameEnd : styles.gamePlay}>
        <div>{!playing ? 'end' : 'live'}</div>
      </h2>
    </div>
  )
}

export default GameLiveText;
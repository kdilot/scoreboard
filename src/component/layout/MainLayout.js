import React from 'react';
import { GameLayout } from 'component';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './MainLayout.module.scss';

const MainLayout = (props) => {
  const { scoreboard, handleScore } = props
  return (
    <Scrollbars style={{ width: '100%', height: '100vh' }}>
      <div className={styles.layout}>
        {scoreboard.map((m, i) =>
          <div key={i}>
            <GameLayout {...m} handleScore={handleScore} />
          </div>
        )}
      </div>
    </Scrollbars>
  )
}

export default MainLayout;
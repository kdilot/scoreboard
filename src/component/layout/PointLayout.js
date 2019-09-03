import React, { useState, useEffect, useRef } from 'react';
import { Highlight } from 'hooks';
import { GameLiveText, RoundNameText } from 'component';
import styles from './PointLayout.module.scss';
import animation from '../animation.module.scss';

const PointLayout = (props) => {
  const { maxSet, setName, score, playing } = props
  const arr = Array(maxSet).fill([0, 0])
  const [prevData, setPrevData] = useState([0, 0])
  const [data, setData] = useState([0, 0])

  const Previous = (value) => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current ? ref.current : score
  }

  let prevScore = Previous(score)

  const condition = (len, position) => {
    if (prevScore.length - 1 === len) {
      return Highlight({ event: { data, prevData }, condition: (Math.abs(data[position] - prevData[position]) > 0) })
    }
  }

  useEffect(() => {
    const len = prevScore.length
    setPrevData(prevScore[len - 1])
  }, [prevScore, prevData])
  useEffect(() => {
    const len = score.length
    setData(score[len - 1])
  }, [score, data])

  return (
    <div className={styles.pointLayout}>
      <div className={styles.dashboard}>
        <GameLiveText playing={playing} />
        <div className={styles.pointList}>
          {maxSet > 0 && arr.map((m, i) => <RoundNameText key={i} index={i} setName={setName} />)}
        </div>
      </div>
      <div className={styles.dashboard}>
        <h2>Home</h2>
        <div className={styles.pointList}>
          {maxSet > 0 && arr.map((m, i) => <h2 key={i} className={condition(i, 0) ? animation.pointHome : ''} >{Array.isArray(score[i]) && score[i][0]}</h2>)}
        </div>
      </div>
      <div className={styles.dashboard}>
        <h2>Away</h2>
        <div className={styles.pointList}>
          {maxSet && arr.map((m, i) => <h2 key={i} className={condition(i, 1) ? animation.pointAway : ''} >{Array.isArray(score[i]) && score[i][1]}</h2>)}
        </div>
      </div>
    </div>
  )
}

export default PointLayout;
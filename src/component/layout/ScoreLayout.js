import React, { useState, useEffect, useRef } from 'react';
import { Highlight } from 'hooks';
import { ScoreBoardTitle } from 'component';
import styles from './ScoreLayout.module.scss';
import animation from '../animation.module.scss';

const ScoreLayout = (props) => {
  const { name, setPoint, maxSetPoint } = props
  const [home, setHome] = useState(0)
  const [away, setAway] = useState(0)

  const Previous = (value) => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current ? ref.current : setPoint
  }
  const prevSetPoint = Previous(setPoint)
  const condition = (point) => {
    if (maxSetPoint) {
      return (Math.abs(setPoint[point] - prevSetPoint[point] > 0))
    } else {
      return (Math.abs(setPoint.filter(f => f === point).length - prevSetPoint.filter(f => f === point).length) > 0)
    }
  }
  const homeEvent = Highlight({ event: { setPoint, prevSetPoint }, condition: condition(0) })
  const awayEvent = Highlight({ event: { setPoint, prevSetPoint }, condition: condition(1) })

  useEffect(() => {
    setHome(maxSetPoint ? (setPoint[0] ? setPoint[0] : 0) : setPoint.filter(f => f === 0).length)
    setAway(maxSetPoint ? (setPoint[1] ? setPoint[1] : 0) : setPoint.filter(f => f === 1).length)
  }, [setPoint, maxSetPoint])

  return (
    <div className={styles.scoreLayout}>
      <ScoreBoardTitle name={name} home={home} away={away} />
      <div className={styles.scoreBoard}>
        <h1>Home</h1>
        <h1 className={homeEvent ? animation.pointHome : ''}>{home}</h1>
        <h1 className={awayEvent ? animation.pointAway : ''}>{away}</h1>
        <h1>Away</h1>
      </div>
    </div>
  )
}

export default ScoreLayout;
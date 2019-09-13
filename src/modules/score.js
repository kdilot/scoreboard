import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export const PLAYGAME = 'product/PLAYGAME'

export const PLAYGAME_POINT = 'product/PLAYGAME_POINT'
export const PLAYGAME_TIME = 'product/PLAYGAME_TIME'

export const playGame = createAction(PLAYGAME)


const initialState = {
  scoreboard: [
    {
      name: 'badminton',
      setName: 'set',
      maxPoint: 21,
      maxSet: 3,
      maxSetPoint: 0,
      score: [[0, 0]],
      setPoint: [],
      playing: true,
      flag: true,
    },
    {
      name: 'basketball',
      setName: 'period',
      maxPoint: 3,
      maxSet: 4,
      maxSetPoint: 20,
      score: [[0, 0]],
      setPoint: [],
      playing: true,
      flag: true,
    },
    {
      name: 'volleyball',
      setName: 'set',
      maxPoint: 25,
      maxSet: 5,
      maxSetPoint: 0,
      score: [[0, 0]],
      setPoint: [],
      playing: true,
      flag: true,
    },
    {
      name: 'table tennis',
      setName: 'set',
      maxSet: 7,
      maxPoint: 11,
      maxSetPoint: 0,
      score: [[0, 0]],
      setPoint: [],
      playing: true,
      flag: true,
    },
    {
      name: 'soccer',
      setName: 'oi',
      maxSet: 2,
      maxPoint: 1,
      maxSetPoint: 6,
      score: [[0, 0]],
      setPoint: [],
      playing: true,
      flag: true,
    },
    {
      name: 'ice hockey',
      setName: 'period',
      maxSet: 3,
      maxPoint: 1,
      maxSetPoint: 7,
      score: [[0, 0]],
      setPoint: [],
      playing: true,
      flag: true,
    },
  ],
}

export default handleActions({
  [PLAYGAME_TIME]: (state, action) =>
    produce(state, draft => {
      const { name } = action.payload
      const data = draft.scoreboard.filter(f => f.name === name)[0]
      const { maxSet, maxSetPoint, maxPoint } = data
      const playingSet = data.score.length - 1
      const addPoint = [0, 0]
      const randomPosition = Math.round(Math.random())
      let randomMaxPoint = Math.round(Math.random() * (maxPoint > 1 ? (maxPoint - 1) * 10 : maxSetPoint * 2)) + (maxPoint > 1 ? maxSetPoint : 0)
      let randomPoint = Math.round(Math.random() * (maxPoint > 1 ? maxPoint - 1 : 9)) + (maxPoint > 1 ? 1 : 0)
      if (maxPoint === 1) {
        if (randomPoint > 1) {
          randomPoint = 0
        }
        if (randomMaxPoint > maxSetPoint) {
          randomMaxPoint = maxSetPoint
        }
      }

      if (data.playing) {
        if (data.setPoint.length === 0) {
          data.setPoint = [0, 0]
        }
        if (data.score[playingSet][randomPosition] < randomMaxPoint) {
          data.score[playingSet][randomPosition] += randomPoint
          data.setPoint[randomPosition] += randomPoint
          if (data.score[playingSet][randomPosition] >= randomMaxPoint) {
            if (data.score.length === maxSet) {
              data.playing = false
            } else {
              data.score.push(addPoint)
            }
          }
        } else {
          if (data.score.length === maxSet) {
            data.playing = false
          } else {
            data.score.push(addPoint)
          }
        }
        data.flag = !data.flag
      }

    }),
  [PLAYGAME_POINT]: (state, action) =>
    produce(state, draft => {
      const { name } = action.payload
      const data = draft.scoreboard.filter(f => f.name === name)[0]
      const { maxSet } = data
      const playingSet = data.score.length - 1
      const maxPoint = (data.score.length === data.maxSet) && data.maxPoint === 25 ? 15 : data.maxPoint
      const randomPosition = Math.round(Math.random())
      const addPoint = [0, 0]

      if (data.playing) {
        if (data.setPoint.filter(f => f === 1).length >= maxSet / 2 || data.setPoint.filter(f => f === 0).length >= maxSet / 2) {
          data.playing = false
        } else {
          if (data.score[playingSet][randomPosition] < maxPoint) {
            data.score[playingSet][randomPosition]++
            if (data.score[playingSet][randomPosition] === maxPoint && Math.abs(data.score[playingSet][0] - data.score[playingSet][1]) > 1) {
              data.setPoint.push(randomPosition)
              if (data.setPoint.filter(f => f === 1).length >= maxSet / 2 || data.setPoint.filter(f => f === 0).length >= maxSet / 2) {
                data.playing = false
              } else {
                data.score.push(addPoint)
              }
            }
          } else {
            data.score[playingSet][randomPosition]++
            if (Math.abs(data.score[playingSet][0] - data.score[playingSet][1]) > 1) {
              data.setPoint.push(randomPosition)
              if (data.setPoint.filter(f => f === 1).length >= maxSet / 2 || data.setPoint.filter(f => f === 0).length >= maxSet / 2) {
                data.playing = false
              } else {
                data.score.push(addPoint)
              }
            }
          }
        }
        data.flag = !data.flag
      }
    }),
}, initialState)

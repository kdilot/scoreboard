import { all, put, takeLatest, fork } from 'redux-saga/effects';
import { PLAYGAME, PLAYGAME_POINT, PLAYGAME_TIME } from 'modules/score';

export function* playGameWatch() {
  yield takeLatest(PLAYGAME, playGame)
}
export function* playGame(req) {
  const { name, data } = req.payload
  if (data.playing) {
    if (data.maxSetPoint) {
      yield put({ type: PLAYGAME_TIME, payload: { name } })
    } else {
      yield put({ type: PLAYGAME_POINT, payload: { name } })
    }
  }
}

export function* rootSaga() {
  yield all([
    fork(playGameWatch),
  ])
}
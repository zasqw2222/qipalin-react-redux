import { fork, all } from 'redux-saga/effects'
import {
  watchArticles,
  watchStickyArticles
} from './articlesSaga'
import { watchJokes } from './jokesSaga'
import { watchPictures } from './picturesSaga'
import { watchDetail } from './detailSaga'
import { watchComments } from './commentsSaga'
import { watchLogin } from './loginSaga'

export default function* rootSaga() {
  yield all([
    fork(watchArticles),
    fork(watchStickyArticles),
    fork(watchDetail),
    fork(watchJokes),
    fork(watchComments),
    fork(watchPictures),
    fork(watchLogin),
  ])
}

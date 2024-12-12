import { call, put } from 'redux-saga/effects';

import {
  getPlafondsAdvantagesFailure,
  getPlafondsAdvantagesSuccess,
  getTextsAdvantagesFailure,
  getTextsAdvantagesSuccess,
} from 'src/redux/slices/settings';
import { requestGetPlafondsAdvantages, requestGetTextsAdvantages } from '../requests/settings';

export function* handleGetPlafondsAdvantages(action: any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetPlafondsAdvantages);
    yield put(getPlafondsAdvantagesSuccess(response.data));
  } catch (error) {
    yield put(
      getPlafondsAdvantagesFailure({
        error,
      })
    );
  }
}

export function* handleGetTextsAdvantages(action: any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetTextsAdvantages);
    yield put(getTextsAdvantagesSuccess(response.data));
  } catch (error) {
    yield put(
      getTextsAdvantagesFailure({
        error,
      })
    );
  }
}

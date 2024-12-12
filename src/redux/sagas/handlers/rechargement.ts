import { call, put } from 'redux-saga/effects';
import {
  preReloadTicketRestoFailed,
  preReloadTicketRestoSuccess,
  ReloadEncouragementFailed,
  ReloadEncouragementSuccess,
  ReloadEventFailed,
  ReloadEventSuccess,
  ReloadTicketRestoFailed,
  ReloadTicketRestoSuccess,
} from 'src/redux/slices/rechargement';
import {
  requestEncouragementResto,
  requestEvent,
  requestPreReloadTicketResto,
  requestReloadTicketResto,
} from '../requests/rechargement';

export function* handlePreReloadTicketResto(action: any): Generator<any, any, any> {
  try {
    const { data, onNextStep } = action.payload;
    const response = yield call(requestPreReloadTicketResto, data);
    if (response.status === 200 || response.status === 201) {
      yield put(preReloadTicketRestoSuccess(response.data));
      onNextStep();
    }
  } catch (error) {
    yield put(preReloadTicketRestoFailed(error));
  }
}

export function* handleReloadTicketResto(action: any): Generator<any, any, any> {
  try {
    const { data, onNextStep } = action.payload;
    const response = yield call(requestReloadTicketResto, data);
    if (response.status === 200 || response.status === 201) {
      yield put(ReloadTicketRestoSuccess(response.data));
      onNextStep();
    }
  } catch (error) {
    yield put(ReloadTicketRestoFailed(error));
  }
}

export function* handleEncouragement(action: any): Generator<any, any, any> {
  try {
    const { data, onNextStep } = action.payload;
    let toNext = true;
    for (let i = 0; i < data.length; i++) {
      const response = yield call(requestEncouragementResto, data[i]);
      if (!(response.status === 200 || response.status === 201)) {
        toNext = false;
      }
    }
    if (toNext) {
      onNextStep();
      yield put(ReloadEncouragementSuccess(true));
    }
  } catch (error) {
    yield put(ReloadEncouragementFailed(error));
  }
}

export function* handleEvent(action: any): Generator<any, any, any> {
  try {
    const { data, onNextStep } = action.payload;
    const response = yield call(requestEvent, data);
    if (response.status === 200 || response.status === 201) {
      yield put(ReloadEventSuccess(response.data));
      onNextStep();
    }
  } catch (error) {
    yield put(ReloadEventFailed(error));
  }
}

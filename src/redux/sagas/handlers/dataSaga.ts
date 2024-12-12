import { call, put } from 'redux-saga/effects';
import { requestGetAlldata, requestUpdateData } from '../requests/dataSaga';
import {
  fetchDataFailure,
  fetchDataSuccess,
  updateDataFailure,
  updateDataSuccess,
} from 'src/redux/slices/dataSlice';

export function* handleGetAllData(action: any): Generator<any, any, any> {
  try {
    const { startDate, endDate } = action.payload;
    const response = yield call(requestGetAlldata, startDate, endDate);
    if (response.status === 200) {
      yield put(fetchDataSuccess(response.data));
    } else {
      yield put(fetchDataFailure(`API error: ${response.status} ${response.statusText}`));
    }
  } catch (error) {
    const errorMessage = error.response
      ? `API Error: ${error.response.status} ${error.response.statusText}`
      : 'Network Error or Timeout';
    yield put(fetchDataFailure(errorMessage));
  }
}

export function* handleUpdateData(action: any): Generator<any, any, any> {
  try {
    const { id, amountAccepted, status } = action.payload;
    const response = yield call(requestUpdateData, id, amountAccepted, status);
    if (response.status === 200) {
      yield put(updateDataSuccess({ id, amountAccepted, status }));
    } else {
      yield put(updateDataFailure(`API error: ${response.status} ${response.statusText}`));
    }
  } catch (error) {
    const errorMessage = error.response
      ? `API Error: ${error.response.status} ${error.response.statusText}`
      : 'Network Error or Timeout';
    yield put(updateDataFailure(errorMessage));
  }
}

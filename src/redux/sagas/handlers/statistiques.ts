import { call, put } from 'redux-saga/effects';

import {
  getStatisquesCompanyFailure,
  getStatisquesCompanySuccess,
  getStatsUsageAllEmployeesFailure,
  getStatsUsageAllEmployeesSuccess,
  getStatsUsageCategoryFailure,
  getStatsUsageCategorySuccess,
  hasError,
} from 'src/redux/slices/statsiqtique';
import {
  requestGetStatCategory,
  requestGetStatComany,
  requestGetStatEmployees,
} from '../requests/statistiques';

export function* handleGetStatComany(action: any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetStatComany);
    if (response.status === 200) {
      yield put(getStatisquesCompanySuccess(response.data));
    } else {
      const { error } = response.data;
      yield put(getStatisquesCompanyFailure(error));
    }
  } catch (error) {
    yield put(
      hasError({
        message: error.message,
        data: error.data,
        error: error.error,
      })
    );
  }
}

export function* handleGetStatEmployee(action: any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetStatEmployees);
    if (response.status === 200) {
      yield put(getStatsUsageAllEmployeesSuccess(response.data));
    } else {
      const { error } = response.data;
      yield put(getStatsUsageAllEmployeesFailure(error));
    }
  } catch (error) {
    yield put(
      hasError({
        message: error.message,
        data: error.data,
        error: error.error,
      })
    );
  }
}

export function* handleGetStatCatgeory(action: any): Generator<any, any, any> {
  try {
    const { id } = action.payload;
    const response = yield call(requestGetStatCategory, id);
    if (response.status === 200) {
      yield put(getStatsUsageCategorySuccess(response.data));
    } else {
      const { error } = response.data;
      yield put(getStatsUsageCategoryFailure(error));
    }
  } catch (error) {
    yield put(
      hasError({
        message: error.message,
        data: error.data,
        error: error.error,
      })
    );
  }
}

import { call, put } from 'redux-saga/effects';
import { requestGetAlldata, requestGetAlldatacsv, requestGetAlldatapdf, requestnotificationSend, requestSendNotification, requestUpdateData } from '../requests/dataSaga';
import {
  fetchDatacsvFailure,
  fetchDatacsvSuccess,
  fetchDataFailure,
  fetchDatapdfFailure,
  fetchDataSuccess,
  notificationSendFailure,
  notificationSendSuccess,
  showSnackbar,
  updateDataFailure,
  updateDataSuccess,
} from 'src/redux/slices/dataSlice';

let isError:boolean = false


export function* handleGetAllData(action: any): Generator<any, any, any> {
  try {
    const { startDate, endDate } = action.payload;
    const response = yield call(requestGetAlldata, startDate, endDate);
    yield put(fetchDataSuccess(response.data));
  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error?.error && error?.code) {
      errorMessage = `Error: ${error.error}\nCode: ${error.code}`;
    } else if (error instanceof Error) {
      errorMessage = `An error occurred: ${error.message}`;
    }

    // Dispatch the showSnackbar action with the error message
    yield put(showSnackbar(errorMessage)); 
  }
}



export function* handleUpdateData(action: any): Generator<any, any, any> {
  try {
    const { id, status } = action.payload;
    const response = yield call(requestUpdateData, id, status);
    if (response.status === 200) {
      yield put(updateDataSuccess({ id,status }));
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

export function* handleGetAllDatacsv(action: any): Generator<any, any, any> {
  try {
    const { startDate, endDate } = action.payload;
    const response = yield call(requestGetAlldatacsv, startDate, endDate);
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `data_${startDate}_${endDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      yield put(fetchDatacsvFailure(`API error: ${response.status} ${response.statusText}`));
    }
  } catch (error) {
    const errorMessage = error.response
      ? `API Error: ${error.response.status} ${error.response.statusText}`
      : 'Network Error or Timeout';
    yield put(fetchDatacsvFailure(errorMessage));
  }
}

export function* handlenotificationSend(action: any): Generator<any, any, any> {
  try {
    const { startDate, endDate } = action.payload;
    const response = yield call(requestSendNotification, startDate, endDate);
    if (response.status === 200) {
      yield put(notificationSendSuccess({startDate,endDate}));
    } else {
      yield put(notificationSendFailure(`API error: ${response.status} ${response.statusText}`));
    }
  } catch (error) {
    const errorMessage = error.response
      ? `API Error: ${error.response.status} ${error.response.statusText}`
      : 'Network Error or Timeout';
    yield put(notificationSendFailure(errorMessage));
    alert(errorMessage);
  }
}

export function* handleGetAllDatapdf(action: any): Generator<any, any, any> {
  try {
      const response = yield call(requestGetAlldatapdf); // Call the API for PDF data
      if (response.status === 200) {
          // Create a blob for PDF
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `data.pdf`); // Use a fixed filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } else {
          yield put(fetchDatapdfFailure(`API error: ${response.status} ${response.statusText}`));
      }
  } catch (error) {
      const errorMessage = error.response
          ? `API Error: ${error.response.status} ${error.response.statusText}`
          : 'Network Error or Timeout';
      yield put(fetchDatapdfFailure(errorMessage));
  }
}





import { call, put } from 'redux-saga/effects';
import { getAllTransationsFailure, getAllTransationsSuccess } from 'src/redux/slices/transations';
import { requestGetAllTransations } from '../requests/transations';
export function* handleGetAllTransations(action: any): Generator<any, any, any> {
  try {
    const firstParams = {
      sizePage: 10,
      page: 1,
    };

    const response = yield call(requestGetAllTransations, firstParams);
    let allTransations = [];

    if (response.status === 200) {
      if (response.data.total > 0) {
        const n = Math.ceil(response.data.total / 500);
        for (let pageNumber = 1; pageNumber <= n; pageNumber++) {
          const paramsPage = {
            sizePage: 500,
            page: pageNumber,
          };
          const responseEmployeePage = yield call(requestGetAllTransations, paramsPage);
          if (responseEmployeePage.status === 200) {
            if (responseEmployeePage.data.transactions.length > 0) {
              for (let i = 0; i < responseEmployeePage.data.transactionslength; i++) {
                allTransations.push(responseEmployeePage.data.transactions[i]);
              }
            }
          }
        }
        if (allTransations.length !== 0) {
          yield put(getAllTransationsSuccess(allTransations));
        } else {
          yield put(getAllTransationsSuccess(response.data));
        }
      } else {
        yield put(getAllTransationsSuccess([]));
      }
    }
  } catch (error) {
    yield put(getAllTransationsFailure(error));
  }
}

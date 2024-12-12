import { call, put } from 'redux-saga/effects';
import { getAllInvoicesFailure, getAllInvoicesSuccess } from 'src/redux/slices/invoice';
import { requestGetAllInvoices } from '../requests/invoice';
export function* handleGetAllInvoices(action: any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetAllInvoices);
    if (response.status === 200) {
      yield put(getAllInvoicesSuccess(response.data.invoices));
    }
  } catch (error) {
    yield put(getAllInvoicesFailure(error));
  }
}

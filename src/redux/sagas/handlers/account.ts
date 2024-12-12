import { call, put } from 'redux-saga/effects';
import {
  createAccountFailed,
  createAccountSuccess,
  deleteAccountFailed,
  deleteAccountSuccess,
  disableAccountFailed,
  disableAccountSuccess,
  enableAccountFailed,
  enableAccountSuccess,
  getAllAccountsFailure,
  getAllAccountsSuccess,
  updateAccountFailed,
  updateAccountSuccess,
} from 'src/redux/slices/accounts';
import {
  requestCreateAccount,
  requestDeleteAccount,
  requestDisableAccount,
  requestEnableAccount,
  requestGetAllAccounts,
  requestUpdateAccount,
} from '../requests/account';

export function* handleGetAllAccounts(action: any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetAllAccounts);
    if (response.status === 200) {
      yield put(getAllAccountsSuccess(response.data));
    }
  } catch (error) {
    yield put(getAllAccountsFailure(error));
  }
}

export function* handleCreateAccount(action: any): Generator<any, any, any> {
  const { data, toast, translate, reset, onClose } = action.payload;
  try {
    const response = yield call(requestCreateAccount, data);
    if (response.status === 200 || response.status === 201) {
      yield put(createAccountSuccess(response.data));
      toast(translate('create_success'), {
        variant: 'success',
      });
      reset();
      onClose();
    }
  } catch (error) {
    toast(translate('errors.' + error.code), {
      variant: 'error',
    });
    yield put(createAccountFailed(error));
  }
}

export function* handleUpdateAccount(action: any): Generator<any, any, any> {
  const { data, id, toast, translate, onClose, reset } = action.payload;
  try {
    const response = yield call(requestUpdateAccount, data, id);
    if (response.status === 200) {
      yield put(updateAccountSuccess(response.data));
      toast(translate('update_success'), {
        variant: 'success',
      });
      onClose();
      reset();
    }
  } catch (error) {
    yield put(updateAccountFailed(error));
    toast(translate('errors.' + error.error), {
      variant: 'error',
    });
  }
}
export function* handleDeleteAccount(action: any): Generator<any, any, any> {
  try {
    const { id, toast, translate, onClose } = action.payload;
    const response = yield call(requestDeleteAccount, id);
    if (response.status === 200) {
      yield put(deleteAccountSuccess(response.data));
      toast(translate('Success_message.successfully_deleted'), {
        variant: 'success',
      });
      onClose();
    }
  } catch (error) {
    yield put(deleteAccountFailed(error));
  }
}

export function* handleDisableAccount(action: any): Generator<any, any, any> {
  try {
    const { id, translate, toast, onClose } = action.payload;
    const response = yield call(requestDisableAccount, id);
    if (response.status === 200) {
      yield put(disableAccountSuccess(response.data));
      toast(translate('Success_message.successfully_disable'), {
        variant: 'success',
      });
      onClose();
    }
  } catch (error) {
    yield put(disableAccountFailed(error));
  }
}

export function* handleEnableAccount(action: any): Generator<any, any, any> {
  try {
    const { id, translate, toast, onClose } = action.payload;
    const response = yield call(requestEnableAccount, id);
    if (response.status === 200) {
      yield put(enableAccountSuccess(response.data));
      toast(translate('Success_message.successfully_enable'), {
        variant: 'success',
      });
      onClose();
    }
  } catch (error) {
    yield put(enableAccountFailed(error));
  }
}

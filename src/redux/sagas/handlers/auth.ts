import { call, put } from 'redux-saga/effects';
import {
  ForgotPasswordStepOneFailure,
  ForgotPasswordStepOneSuccess,
  ForgotPasswordStepTwoFailure,
  ForgotPasswordStepTwoSuccess,
  getInfoCompanyFailure,
  getInfoCompanySuccess,
  getUserByTokenBowiFailure,
  getUserByTokenBowiSuccess,
  getUserFailure,
  getUserSuccess,
  hasError,
  init,
  successMessage,
  updateFacialValueFailure,
  updateFacialValueSuccess,
  updatePorfilCompanyFailure,
  updatePorfilCompanySuccess,
  updatePorfilFailure,
  updatePorfilSuccess,
} from 'src/redux/slices/auth';
import { setSession } from 'src/utils/local-sesson';
import {
  requestEditProfil,
  requestEditProfilCompany,
  requestForgotPasswordStepOne,
  requestForgotPasswordStepTwo,
  requestGetInfoCompany,
  requestLogin,
  requestLoginByTokenBowi,
  requestResetPassword,
  requestUpdateFacialValue,
} from '../requests/auth';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';

export function* handleLogin(action: any): Generator<any, any, any> {
  try {
    const { email, password } = action.payload;
    const response = yield call(requestLogin, { email, password });
    if (response.status === 200) {
      yield put(getUserSuccess(response.data));
      setSession(response.data.token);
    } else {
      yield put(getUserFailure(null));
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

export function* handleResetPassword(action: any): Generator<any, any, any> {
  try {
    const { data, toast, translate } = action.payload;
    const resetPassword = {
      oldPassword: data.oldPassword,
      newPassword: data.password,
    };

    const response = yield call(requestResetPassword, resetPassword);

    if (response.status === 200) {
      yield put(successMessage(response));
      yield put(getUserSuccess(response.data));
      toast(translate('errors.success_change_password'), {
        variant: 'success',
      });
      yield put(init({ isAuthenticated: false, user: null }));
      window.location.href = PATH_AUTH.login;
      localStorage.removeItem('_token');
    }
  } catch (error) {
    const { toast, translate } = action.payload;
    toast(translate('errors.check_password'), {
      variant: 'error',
    });
    yield put(
      hasError({
        message: error.message,
        data: error.data,
        error: error.error,
      })
    );
  }
}
export function* handleUpdateProfil(action: any): Generator<any, any, any> {
  const { data, toast, translate, navigate } = action.payload;
  try {
    const response = yield call(requestEditProfil, data);
    if (response.status === 200) {
      yield put(updatePorfilSuccess(response.data));
      yield put(getUserSuccess(response.data));

      toast(translate('update_success'), {
        variant: 'success',
      });
      navigate(PATH_DASHBOARD.general.homeComany);
    }
  } catch (error) {
    toast(translate('errors.please_verify_your_entry'), {
      variant: 'error',
    });
    yield put(updatePorfilFailure(error));
  }
}
export function* handleUpdateProfilCompany(action: any): Generator<any, any, any> {
  const { data, toast, translate, navigate } = action.payload;
  try {
    data.tax = parseInt(data.tax);
    const response = yield call(requestEditProfilCompany, data);
    if (response.status === 200) {
      yield put(updatePorfilCompanySuccess(response.data.company));

      toast(translate('update_success'), {
        variant: 'success',
      });
      navigate(PATH_DASHBOARD.general.homeComany);
    }
  } catch (error) {
    toast(translate('errors.please_verify_your_entry'), {
      variant: 'error',
    });
    yield put(updatePorfilCompanyFailure(error));
  }
}
export function* handleUpdateFacialValue(action: any): Generator<any, any, any> {
  const { data, toast, translate, onClose } = action.payload;
  try {
    data.tax = parseInt(data.tax);
    const response = yield call(requestUpdateFacialValue, data);
    if (response.status === 200) {
      yield put(updateFacialValueSuccess(response.data));
      toast(translate('update_success'), {
        variant: 'success',
      });
      onClose();
    }
  } catch (error) {
    const maxTicketValue = error.error.substring(error.error.lastIndexOf(':') + 1).trim(); // Récupère la valeur maximale du ticket restaurant à partir de l'erreur
    toast(translate('errors.cannot_exceed') + maxTicketValue, {
      variant: 'error',
    });
    yield put(updateFacialValueFailure(error));
  }
}
export function* handleGetInfoCompany(action: any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetInfoCompany);
    yield put(getInfoCompanySuccess(response.data));
  } catch (error) {
    yield put(
      getInfoCompanyFailure({
        error,
      })
    );
  }
}

export function* handleForgotPasswordStepOne(action: any): Generator<any, any, any> {
  const { data, translate, navigate, toast } = action.payload;

  try {
    const response = yield call(requestForgotPasswordStepOne, data);
    const { message } = response.data;

    if (response.status === 200) {
      yield put(ForgotPasswordStepOneSuccess(message));
      toast(translate('PageForgetPassword.success_operation'), {
        variant: 'success',
      });
      navigate(PATH_AUTH.newPassword);
    }
  } catch (error) {
    yield put(
      ForgotPasswordStepOneFailure({
        error,
      })
    );
  }
}

export function* handleForgotPasswordStepTwo(action: any): Generator<any, any, any> {
  const { data, translate, navigate, toast } = action.payload;

  try {
    const response = yield call(requestForgotPasswordStepTwo, data);
    if (response.status === 200) {
      yield put(ForgotPasswordStepTwoSuccess(response));
      toast(translate('PageForgetPassword.success_change_password'), {
        variant: 'success',
      });
      setSession(response.data.token);

      yield put(getUserSuccess(response.data));
      navigate(PATH_DASHBOARD.general.homeComany);
    }
  } catch (error) {
    toast(translate(`PageForgetPassword.${error.code}`), {
      variant: 'error',
    });
    yield put(
      ForgotPasswordStepTwoFailure({
        error,
      })
    );
  }
}

export function* handleLoginByTokenBowi(action: any): Generator<any, any, any> {
  try {
    const { token, navigate } = action.payload;
    const response = yield call(requestLoginByTokenBowi, token);
    if (response.status === 200) {
      yield put(getUserByTokenBowiSuccess(response.data));
      setSession(response.data.token);
      navigate(PATH_DASHBOARD.general.homeComany);
    } else {
      yield put(getUserByTokenBowiFailure(null));
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

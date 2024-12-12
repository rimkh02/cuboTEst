import { TLogin, TProfil, TResetPassword } from '../../../@types/auth';
import axios from '../../../utils/axios';
import { axiosConfig } from '../../../config/api-config';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

export function requestLogin(payload: TLogin) {
  const header: any = axiosConfig;
  return axios.post(
    ServicePaths.login,
    { email: payload.email, password: String.raw`${payload.password}` },
    header
  );
}

// login super admin bowi by refresh token of redirection
export function requestLoginByTokenBowi(tokenJwt: TLogin) {
  return axios.post(
    ServicePaths.refreshToken,
    { token: tokenJwt }
    //, header
  );
}

export function requestResetPassword(payload: TResetPassword) {
  const token = getLocalSession();
  return axios.post(ServicePaths.ResetPassword, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestEditProfil(data: TProfil) {
  const token = getLocalSession();
  return axios.put(ServicePaths.updateProfil, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestEditProfilCompany(data: any) {
  const token = getLocalSession();
  return axios.put(ServicePaths.updateProfilCompany, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestUpdateFacialValue(data: any) {
  const token = getLocalSession();
  return axios.put(ServicePaths.updateFacialValue, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestGetInfoCompany() {
  const token = getLocalSession();
  return axios.get(ServicePaths.getInfoCompany, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestForgotPasswordStepOne(data: any) {
  return axios.post(ServicePaths.forgetPasswordStepOn, data);
}

export function requestForgotPasswordStepTwo(data: any) {
  return axios.post(ServicePaths.forgetPasswordStepTwo, data);
}

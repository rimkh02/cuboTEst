import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

export function requestGetAllAccounts() {
  const token = getLocalSession();
  return axios.get(ServicePaths.allAccounts, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function requestCreateAccount(data: any) {
  const token = getLocalSession();
  return axios.post(ServicePaths.createAccounts, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestUpdateAccount(data: any, id: any) {
  const token = getLocalSession();

  return axios.put(ServicePaths.updateAccounts + `/` + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestDeleteAccount(id: string) {
  const token = getLocalSession();
  return axios.delete(ServicePaths.deleteAccounts + `/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function requestDisableAccount(id: string) {
  const token = getLocalSession();
  return axios.post(
    ServicePaths.disableAccount + `/` + id + '/deactivate',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function requestEnableAccount(id: string) {
  const token = getLocalSession();
  return axios.post(
    ServicePaths.disableAccount + `/` + id + '/reactivate',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

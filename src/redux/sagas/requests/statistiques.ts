import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

export function requestGetStatComany() {
  const token = getLocalSession();
  return axios.get(ServicePaths.statCompany, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestGetStatSuperAdmin() {
  const token = getLocalSession();
  return axios.get(ServicePaths.statSuperAdmin, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestGetStatEmployees() {
  const token = getLocalSession();
  return axios.get(ServicePaths.statEmployees, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestGetStatCategory(id: number) {
  const token = getLocalSession();
  return axios.get(ServicePaths.statCatgeory + `/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

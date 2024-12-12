import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';
import { TEmployee } from 'src/@types/employee';
export function requestGetAllEmployee(params: any) {
  const token = getLocalSession();
  return axios.get(ServicePaths.employees, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageSize: params.sizePage,
      page: params.page,
    },
  });
}
export function requestCreateEmployee(data: TEmployee) {
  const token = getLocalSession();
  return axios.post(ServicePaths.createEmployee, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestCreateEmployees(data: any) {
  const token = getLocalSession();
  return axios.post(ServicePaths.importEmployees, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestGetInfoEmployee(id: string) {
  const token = getLocalSession();
  return axios.get(ServicePaths.infoEmployee + `/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestEditEmployee(data: TEmployee, id: string) {
  const token = getLocalSession();
  return axios.put(ServicePaths.editEmployee + `/` + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestDeleteEmployee(id: string) {
  const token = getLocalSession();
  return axios.delete(ServicePaths.deleteEmployee + `/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/* export function requestDisableEmployee(id: string, data: any) {
  const token = getLocalSession();
  return axios.post(ServicePaths.disableEmployee + `/` + id + '/disable-linking', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
} */

export function requestDisableEnableContract(id: string, data: any) {
  const token = getLocalSession();
  return axios.put(ServicePaths.employees + `/` + id + ServicePaths.changeStatusContract, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestEditContract(data: any, idEmployee: string, idContract: string) {
  const token = getLocalSession();
  return axios.put(
    ServicePaths.employees + `/` + idEmployee + ServicePaths.updateContract + `/` + idContract,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function requestReportingEmployees(data: any) {
  const token = getLocalSession();
  return axios.get(ServicePaths.reportingEmployees, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });
}

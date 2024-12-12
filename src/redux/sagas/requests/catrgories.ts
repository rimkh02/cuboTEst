import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

export function requestGetAllCategories() {
  const token = getLocalSession();
  return axios.get(ServicePaths.getAllCategories, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestGetCategory(id: string) {
  const token = getLocalSession();
  return axios.get(ServicePaths.getCategory + `/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestCreateCategory(data: any) {
  const token = getLocalSession();
  return axios.post(ServicePaths.createCategory, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestEditCategory(data: any, id: any) {
  const token = getLocalSession();
  return axios.put(ServicePaths.editCategory + `/` + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestAssignEmployeeToCategory(
  CategoryId: number,
  employeeId: number,
  contractId: number
) {
  const token = getLocalSession();
  return axios.post(
    ServicePaths.assignEmployeeToCategory +
      `/` +
      CategoryId +
      '/employees/' +
      employeeId +
      '/contracts/' +
      contractId +
      '/assign',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function requestAssignEmployeeToCategoryStandard(employeeId: number, contractId: number) {
  const token = getLocalSession();
  return axios.post(
    ServicePaths.assignEmployeeToCategoryStandard +
      `/` +
      employeeId +
      `/contracts/` +
      contractId +
      '/reset',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function requestDeleteCategory(id: any) {
  const token = getLocalSession();
  return axios.delete(ServicePaths.deleteCategory + `/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

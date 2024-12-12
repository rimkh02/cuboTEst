import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

export function requestGetAllTransations(params: any) {
  const token = getLocalSession();
  return axios.get(ServicePaths.getAllTransations, {
    params: {
      pageSize: params.sizePage,
      page: params.page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

export function requestGetAllInvoices() {
  const token = getLocalSession();
  return axios.get(ServicePaths.getAlliInvoices, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

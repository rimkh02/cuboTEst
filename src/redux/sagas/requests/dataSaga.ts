import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

// Existing fetch request
export function requestGetAlldata(startDate: string, endDate: string) {
  const token = getLocalSession();
  return axios.get(ServicePaths.tmp_test, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      startDate,
      endDate,
    },
  });
}

// New update request
export function requestUpdateData(id: number, amountAccepted: number, status: string) {
    const token = getLocalSession();
    const url = `${ServicePaths.tmp_test}/${id}/respond`;
    console.log('Sending PUT request to:', url);
    console.log('Request payload:', { amountAccepted, status });
  
    return axios.post(
      url,
      { amountAccepted, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  

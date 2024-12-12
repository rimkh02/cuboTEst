import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

export function requestReloadTicketResto(data: any) {
  const token = getLocalSession();
  return axios.post(ServicePaths.reloadTicketResto, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestPreReloadTicketResto(data: any) {
  const token = getLocalSession();
  return axios.post(ServicePaths.preReloadTicketResto, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestEncouragementResto(data: any) {
  const token = getLocalSession();
  return axios.post(ServicePaths.reloadEncouragement, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestEvent(data: any) {
  const token = getLocalSession();
  return axios.post(ServicePaths.reloadEvent, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

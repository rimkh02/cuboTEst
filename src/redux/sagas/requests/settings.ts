import axios from '../../../utils/axios';
import { ServicePaths } from '../../../utils/api-paths';
import { getLocalSession } from 'src/utils/local-sesson';

export function requestGetPlafondsAdvantages() {
  const token = getLocalSession();
  return axios.get(ServicePaths.plafondsAdvantages, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function requestGetTextsAdvantages() {
  const token = getLocalSession();
  return axios.get(ServicePaths.textsAdvantages, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

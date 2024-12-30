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
export function requestUpdateData(id: number,status: string) {
    const token = getLocalSession();
    const url = `${ServicePaths.tmp_test}/${id}/respond`;
    console.log('Sending PUT request to:', url);
    console.log('Request payload:',status);
  
    return axios.post(
      url,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  //get data csv
  export function requestGetAlldatacsv(startDate: string, endDate: string) {
    const token = getLocalSession();
    return axios.get(ServicePaths.tmp_testt, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate,
        endDate,
      },
      responseType: 'blob', 
    });
  }
  //notification message 

  export function requestnotificationSend(startDate: string, endDate: string) {
    const token = getLocalSession(); // Assuming this gets the token correctly
    
    // Debugging the token and the data before sending the request
    console.log('Token:', token);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  
    return axios.post(ServicePaths.tmp_notif, 
      {
        startDate, 
        endDate,    
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Bearer token authorization header
        },
      })
      .then(response => {
        console.log('API Response:', response);  // Log the response from the API
        return response;  // You can return the response here if needed
      })
      .catch(error => {
        console.error('API Error:', error);  // Log any errors that occur
        throw error;  // Throwing the error so it can be handled in your saga or component
      });
  }
  
  export function requestSendNotification(startDate: string,endDate: string) {
    const token = getLocalSession();
    const url = `${ServicePaths.tmp_test}/staff/notifications?startDate=${startDate}&endDate=${endDate}`;
    console.log('Sending PUT request to:', url);
    console.log('Request payload:',startDate,endDate);
  
    return axios.post(
      url,
      { startDate , endDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  export function requestGetAlldatapdf() {
    const token = getLocalSession();
    return axios.get(ServicePaths.tmp_pdf, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', 
    });
  }

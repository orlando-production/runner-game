/* eslint-disable no-console */
import { AxiosError, AxiosResponse } from 'axios';
import API from '../api/API';

class RequestService {
    requestPostData = (
      url: string,
      params: Record<string, unknown>,
      cb?: (response?: AxiosResponse) => any,
      errorCb: (reason: AxiosError) => void = (reason: AxiosError) => console.log(`Axios request failed: ${reason}`)
    ) => {
      API.post(url, params)
        .then(cb)
        .catch(errorCb);
    }
}

export const requestService = new RequestService();

/* eslint-disable no-console */
import type { AxiosError, AxiosResponse } from 'axios';
import API from '../api/API';

class RequestService {
    requestPostData = <P, R>(
      url: string,
      params: Record<string, P>,
    ) => API.post<R>(url, params);
}

export const requestService = new RequestService();

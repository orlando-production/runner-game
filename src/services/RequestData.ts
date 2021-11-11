import API from '../api/API';

export const requestPostData = <P, R>(
  url: string,
  params: Record<string, P>
) => API.post<R>(url, params, {withCredentials: true});

export const requestGetData = <P, R>(
    url: string,
) => API.get<R>(url, {withCredentials: true});

export const requestPutData = <P, R>(
    url: string,
    params: Record<string, P>
) => API.put<R>(url, params, {withCredentials: true});

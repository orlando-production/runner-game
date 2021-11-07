import API from '../api/API';

export const requestPostData = <P, R>(
  url: string,
  params: Record<string, P>
) => API.post<R>(url, params);

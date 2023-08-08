import { SearchRequestParams, DetailRequestParams } from '../types';

const apiUrl = import.meta.env.VITE_API_END_POINT;
const apiKey = import.meta.env.VITE_API_KEY;

export const request = async (
  params: SearchRequestParams | DetailRequestParams,
) => {
  const requestParams = { apiKey, ...params };
  const queryString = new URLSearchParams(requestParams).toString();
  return await fetch(`${apiUrl}?${queryString}`).then((res) => res.json());
};

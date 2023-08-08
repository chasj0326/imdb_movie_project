import { SearchRequestParams, DetailRequestParams } from '../types';

export const request = async (
  params: SearchRequestParams | DetailRequestParams,
) => {
  const requestParams = {
    apiKey: import.meta.env.VITE_API_KEY,
    ...params,
  };
  const queryString = new URLSearchParams(requestParams).toString();
  return await fetch(
    `${import.meta.env.VITE_API_END_POINT}?${queryString}`,
  ).then((res) => res.json());
};

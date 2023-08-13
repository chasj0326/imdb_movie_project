import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SearchRequestParams, DetailRequestParams } from '../src/types';
import axios from 'axios';

const apiUrl = 'https://omdbapi.com';
const { API_KEY = '' } = process.env;

export default async function (req: VercelRequest, res: VercelResponse) {
  const params = req.body as SearchRequestParams | DetailRequestParams;
  const { data } = await axios.get(apiUrl, {
    params: { apiKey: API_KEY, ...params },
  });
  res.status(200).json(data);
}

import axios from 'axios';

const KEY_API = '39799120-0adfdb8bf4f296c3a7d41d46c';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const PerPage = 12;

export const fetchPhoto = async (value, page) => {
  const textSearch = value.split('/').slice(-1);
  const resp = await axios.get(
    `?key=${KEY_API}&q=${textSearch}&page=${page}&per_page=${PerPage}&image_type=photo&orientation=horizontal`
  );
  return resp.data;
};

// https://pixabay.com/api/?&q=cat&page=1&per_page=12&image_type=photo&orientation=horizontal

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27785613-3c730127b1356d079421a0eb8';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
});

const fetchImage = ({ query, page, per_page }) => {
  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&${searchParams}&per_page=${per_page}`
  ).then(response => response.json());
};

const imageAPI = {
  fetchImage,
};

export default imageAPI;

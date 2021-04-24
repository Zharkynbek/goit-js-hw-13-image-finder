import axios from 'axios';

export default function sendRequest(query, page) {
  return axios
    .get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=8&key=15900106-2c235e732bb321ca7ec900d93`,
    )
    .then(({ data }) => {
      return data.hits;
    });
}

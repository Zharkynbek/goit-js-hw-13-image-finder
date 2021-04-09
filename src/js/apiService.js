const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;

export default function sendRequest(query, page) {
  return fetch(
    `${BASE_URL}&q=${query}&page=${page}&per_page=12&key=15900106-2c235e732bb321ca7ec900d93`,
  ).then(resp => resp.json());
}

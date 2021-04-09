import './js/search';
import './styles.css';
import './basicLightBox.min.css';
import getData from './js/apiService';
import tmpl from './templates/tmpl.hbs';
import * as basicLightbox from 'basiclightbox';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  load: document.querySelector('.load'),
};

const requestParams = {
  page: 1,
  query: '',
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  if (requestParams.query !== e.target.children[0].value) {
    refs.gallery.innerHTML = '';
  }
  const query = e.target.children[0].value;
  requestParams.query = query;
  getData(requestParams.query, requestParams.page).then(({ hits }) => {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      hits.map(el => tmpl(el)).join(''),
    );
  });
});

refs.gallery.addEventListener('click', e => {
  const instance = basicLightbox.create(`
    <img src=${e.target.dataset.source} width="800" height="600">
`);

  instance.show();
});

refs.load.addEventListener('click', e => {
  requestParams.page += 1;
  getData(requestParams.query, requestParams.page).then(({ hits }) => {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      hits.map(el => tmpl(el)).join(''),
    );
  });
});

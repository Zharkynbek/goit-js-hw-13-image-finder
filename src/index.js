import './js/search';
import './styles.css';
import './basicLightBox.min.css';
import getData from './js/apiService';
import tmpl from './templates/tmpl.hbs';
import * as basicLightbox from 'basiclightbox';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  load: document.querySelector('.load'),
};

const requestParams = {
  query: '',
  page: 1,
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  const query = e.target.children[0].value;
  requestParams.page = 1;
  requestParams.query = query;
  if (requestParams.query === '') {
    error({
      text: 'enter query',
      delay: 2000,
    });
    return;
  }

  getData(requestParams.query, requestParams.page).then(resp => {
    console.log(resp);
    if (resp.length === 0) {
      error({
        text: 'not found',
        delay: 2000,
      });
      return;
    }
    refs.load.classList.add('is-open');
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      resp.map(el => tmpl(el)).join(''),
    );
  });
});

// ================= modal =====================

refs.gallery.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    const instance = basicLightbox.create(
      `<img src=${e.target.dataset.source} width="800" height="600">`,
    );
    instance.show();
  }
});

// ============== load more =====================

function loadMoreImage() {
  requestParams.page += 1;
  getData(requestParams.query, requestParams.page).then(resp => {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      resp.map(el => tmpl(el)).join(''),
    );
    const totalScrollHeight = refs.gallery.clientHeight + 100;
    console.log(refs.gallery.clientHeight);
    window.scrollTo({
      top: totalScrollHeight,
      behavior: 'smooth',
    });
  });
}

const observer = new IntersectionObserver(loadMoreImage, {
  root: null,
  rootMargin: '0px',
  threshold: 0,
});

observer.observe(refs.load);
refs.load.addEventListener('click', loadMoreImage);

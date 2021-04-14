import refs from './js/refs';
import modal from './js/modal.js';
import clearBtn from './js/clear-btn.js';
import './styles.css';
import './basicLightBox.min.css';
import getData from './js/apiService';
import tmpl from './templates/tmpl.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const requestParams = {
  query: '',
  page: 1,
};

function formSearch(e) {
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
    refs.clear.classList.add('is-open');
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      resp.map(el => tmpl(el)).join(''),
    );
  });
}
refs.form.addEventListener('submit', formSearch);
refs.gallery.addEventListener('click', modal);
refs.clear.addEventListener('click', clearBtn);
refs.load.addEventListener('click', loadMoreImage);

// ============== load more =====================

function loadMoreImage() {
  requestParams.page += 1;
  getData(requestParams.query, requestParams.page).then(resp => {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      resp.map(el => tmpl(el)).join(''),
    );
    const totalScrollHeight = refs.gallery.clientHeight + 22;
    console.log(refs.gallery.clientHeight);
    window.scrollTo({
      top: totalScrollHeight,
      behavior: 'smooth',
    });
  });
}
// ================= Observer  =============================

// =====this function is in processing modus (not finished)=========

// const observer = new IntersectionObserver(loadMoreImage, {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0,
// });

// observer.observe(refs.load);

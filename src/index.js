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
// import $ from 'jquery';
import pagination from 'paginationjs';

const requestParams = {
  query: '',
  page: 1,
};

function formSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  const query = e.target.children[0].value.trim();
  requestParams.page = 1;
  requestParams.query = query;
  if (requestParams.query === '') {
    refs.load.classList.remove('is-open');
    refs.clear.classList.remove('is-open');
    refs.iconToTop.classList.remove('show');
    error({
      text: 'Enter something',
      delay: 2000,
    });
    return;
  }

  if (query) {
    getData(requestParams.query, requestParams.page).then(resp => {
      console.log(resp);
      if (resp.length === 0) {
        refs.load.classList.remove('is-open');
        refs.clear.classList.remove('is-open');
        refs.iconToTop.classList.remove('show');
        error({
          text: 'Not found. Try again!',
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
}

function toTop(e) {
  e.preventDefault();
  window.scrollTo({
    top: -100,
    left: 100,
    behavior: 'smooth',
  });
}

refs.iconToTop.addEventListener('click', toTop);
refs.form.addEventListener('submit', formSearch);
refs.gallery.addEventListener('click', modal);
refs.clear.addEventListener('click', clearBtn);
refs.load.addEventListener('click', loadMoreImage);

// ============== load more =====================

function loadMoreImage() {
  requestParams.page += 1;
  refs.iconToTop.classList.add('show');
  getData(requestParams.query, requestParams.page).then(resp => {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      resp.map(el => tmpl(el)).join(''),
    );
    console.log(refs.gallery.clientHeight);
    const totalScrollHeight = refs.gallery.clientHeight;
    // window.scrollTo({
    //   top: totalScrollHeight,
    //   behavior: 'smooth',
    // });
  });
}
// ================= Observer  =============================

const observer = new IntersectionObserver(loadMoreImage, {
  root: null,
  rootMargin: '0px',
  threshold: 0,
});

observer.observe(refs.load);

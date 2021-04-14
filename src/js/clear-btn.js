import refs from './refs.js';

function clearBtn(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.load.classList.remove('is-open');
  refs.input.value = '';
  refs.clear.classList.remove('is-open');
}

export default clearBtn;

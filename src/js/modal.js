import * as basicLightbox from 'basiclightbox';

function modal(e) {
  if (e.target.nodeName === 'IMG') {
    const instance = basicLightbox.create(
      `<img src=${e.target.dataset.source} width="800" height="600">`,
    );
    instance.show();
  }
}

export default modal;

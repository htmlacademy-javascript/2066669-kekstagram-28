const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

// console.log(thumbnailTemplate);

const createThumbnail = (picture) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const thumbnailFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    thumbnailFragment.appendChild(createThumbnail(picture));
  });

  container.appendChild(thumbnailFragment);
};

export {renderThumbnails};

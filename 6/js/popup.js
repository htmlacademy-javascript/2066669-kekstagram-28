import {isEscapeKey} from './util.js';
const createComment = (commentData, element) => {
  const commentTemplate = element.cloneNode(true);

  commentTemplate.querySelector('.social__picture').src = commentData.avatar;
  commentTemplate.querySelector('.social__text').textContent = commentData.message;
  commentTemplate.querySelector('.social__picture').alt = commentData.name;

  return commentTemplate;
};

const renderComments = (comments, element) => {
  const pageComments = element.cloneNode(true);
  pageComments.innerHTML = '';
  comments.forEach((comment) => {
    pageComments.appendChild(createComment(comment, document.querySelector('.social__comment')));
  });

  document.querySelector('.social__comments').innerHTML = pageComments.innerHTML;
};

function openUserModal (modalElement) {
  modalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUserModal(modalElement);
    }
  });
}

function closeUserModal (modalElement) {
  modalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      modalElement.classList.add('hidden');
    }
  });
}

function registerCloseSubscriber (bigPicture) {
  document.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeUserModal(bigPicture);
  });
}

function setOpenSubscribers (picturesAll, bigPicture) {
  const openPictures = document.querySelectorAll('.picture');

  openPictures.forEach((pictureElement) => {
    pictureElement.addEventListener('click', (evt) => {

      const found = picturesAll.find((pictureData) => {
        if (+evt.target.dataset.id === pictureData.id) {
          return true;
        }
      });

      bigPicture.querySelector('.big-picture__img img').src = evt.target.src;
      bigPicture.querySelector('.likes-count').textContent = found.likes;
      bigPicture.querySelector('.social__caption').textContent = found.description;
      renderComments(found.comments, document.querySelector('.social__comments'));
      openUserModal(bigPicture);
    });
  });
}

const setSubscribers = (picturesAll) => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  registerCloseSubscriber(bigPicture);
  setOpenSubscribers(picturesAll, bigPicture);
};

export {setSubscribers};

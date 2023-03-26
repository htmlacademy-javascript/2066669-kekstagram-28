import {isEscapeKey} from './util.js';

const BreakException = {};

const createComment = (commentData, element, hidden = false) => {
  const commentTemplate = element.cloneNode(true);

  if (hidden) {
    commentTemplate.classList.add('hidden');
  }
  commentTemplate.querySelector('.social__picture').src = commentData.avatar;
  commentTemplate.querySelector('.social__text').textContent = commentData.message;
  commentTemplate.querySelector('.social__picture').alt = commentData.name;

  return commentTemplate;
};

function countVisible(elements) {

  let l = 0;
  for (const comment of elements) {
    if (!comment.classList.contains('hidden')) {
      l++;
    }
  }
  return l;
}

function counterLine(comments) {
  return `${countVisible(comments)} из <span class="comments-count">${comments.length}</span> комментариев`;
}

function nextFive() {

  const comments = [].slice.call(document.querySelector('.social__comments').children);
  let cnt = 0;
  try {
    for (const comment of comments) {
      if (cnt === 5) {
        throw BreakException;
      }
      if (comment.classList.contains('hidden')) {
        cnt++;
        comment.classList.remove('hidden');
      }
    }
  } catch (e) { /* empty */ }
  document.querySelector('.social__comment-count').innerHTML = counterLine(document.querySelector('.social__comments').children);
}

const renderComments = (comments, element) => {
  const pageComments = element.cloneNode(true);
  pageComments.innerHTML = '';

  for (let n = 0; n < comments.length; n++) {
    pageComments.appendChild(createComment(comments[n], document.querySelector('.social__comment'), n > 4));
  }

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
      document.querySelector('.social__comments-loader').addEventListener('click', nextFive, false);
      renderComments(found.comments, document.querySelector('.social__comments'));
      document.querySelector('.social__comment-count').innerHTML = counterLine(document.querySelector('.social__comments').children);
      openUserModal(bigPicture);
    });
  });
}

const setSubscribers = (picturesAll) => {
  const bigPicture = document.querySelector('.big-picture');
  registerCloseSubscriber(bigPicture);
  setOpenSubscribers(picturesAll, bigPicture);
};

export {setSubscribers};

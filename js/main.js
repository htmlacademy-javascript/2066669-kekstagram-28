import {createPictures} from './data.js';
import {renderThumbnails} from './thumbnail.js';
import {setSubscribers} from './popup.js';
import {manageUploads} from './form.js';
const picturesAll = createPictures();

renderThumbnails(picturesAll);
setSubscribers(picturesAll);
manageUploads();

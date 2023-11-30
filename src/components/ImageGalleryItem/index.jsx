import React from 'react';
import style from './style.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onClickImage }) => {
  return (
    <li className={style.imageGalleryItem} onClick={onClickImage}>
      <img
        className={style.imageGalleryItem__image}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;

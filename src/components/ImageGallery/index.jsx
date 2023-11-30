import React from 'react';
import style from './style.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, onClickImage }) => {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClickImage={() => onClickImage(largeImageURL, tags)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

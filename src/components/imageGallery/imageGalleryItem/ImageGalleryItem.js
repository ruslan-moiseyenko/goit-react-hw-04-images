import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './galleryItem.styled';

export default function ImageGalleryItem({ image, onImageClick }) {
  return (
    <GalleryItem>
      <Image
        alt={image.tags}
        src={image.webformatURL}
        onClick={event => onImageClick(image.largeImageURL)}
        loading="lazy"
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './galleryItem.styled';

export default class ImageGalleryItem extends Component {
  onImageClick = (event, imageURL) => {
    this.props.onImageClick(imageURL);
  };

  render() {
    const { image } = this.props;
    return (
      <GalleryItem>
        <Image
          alt={image.tags}
          src={image.webformatURL}
          onClick={event => this.onImageClick(event, image.largeImageURL)}
          loading="lazy"
        />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

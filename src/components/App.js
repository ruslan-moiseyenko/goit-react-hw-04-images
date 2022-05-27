import React, { useState, useEffect, useRef } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import SearchBar from './searchbar/Searchbar.js';
import ImageGallery from './imageGallery/Imagegallery.js';
import Modal from './modal/Modal.js';
import MoreImagesButton from './button/Button.js';
import { ModalImage } from './imageGallery/imageGalleryItem/galleryItem.styled';

export default function App() {
  const [idle, setIdle] = useState(true);
  const [pending, setPendidng] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const firstRender = useRef(true);

  const onSearchSubmit = (newUrl, newQuery) => {
    if (query !== newQuery) {
      setImages([]);
      setQuery(newQuery);
      setUrl(newUrl + 'q=' + newQuery);
      setPage(1);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    async function fetchImages(url) {
      setIdle(false);
      setPendidng(true);
      setRejected(false);

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.hits.length === 0) {
            setPendidng(false);
            setRejected(true);
            setResolved(false);
            setError('No images were found');
          } else {
            // setImages(images => [...images, ...data.hits]);
            setImages(images => images.concat(data.hits));
            setPendidng(false);
            setResolved(true);
            if (data.hits.length === 20) {
              setShowMoreBtn(true);
            } else if (data.hits.length < 20) {
              setShowMoreBtn(false);
            }
          }
        } else {
          setError('Something went wrong');
          setPendidng(false);
          setRejected(true);
        }
      } catch (err) {
        console.log(err.message);
        setRejected(true);
        setError(err);
        setShowMoreBtn(false);
      }
    }
    fetchImages(url + `&page=${page}`);
  }, [url, page]);

  const onButtonClick = () => {
    setPage(page + 1);
  };

  const onImageClick = imageURL => {
    setShowModal(true);
    setModalContent(imageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <SearchBar onSubmit={onSearchSubmit} />
      {idle && <h3>Enter what do you want to find</h3>}
      {resolved && (
        <ImageGallery
          images={images}
          showModal={toggleModal}
          onImageClick={onImageClick}
        />
      )}
      {pending && (
        <Modal onClose={toggleModal}>
          <RotatingLines width="100" />
        </Modal>
      )}
      {showMoreBtn && <MoreImagesButton onClick={onButtonClick} />}
      {rejected && <h3>{error}</h3>}
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalImage src={modalContent} alt="bigImage" />
        </Modal>
      )}
    </>
  );
}

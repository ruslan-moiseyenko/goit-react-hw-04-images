import React, { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner'
import SearchBar from './searchbar/Searchbar.js';
import ImageGallery from './imageGallery/Imagegallery.js';
import Modal from './modal/Modal.js';
import MoreImagesButton from './button/Button.js';
import { ModalImage } from './imageGallery/imageGalleryItem/galleryItem.styled';

export default function App() {

  const [idle, setIdle] = useState(true);
  const [panding, setPandidng] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [firstRender, setFirstRender] = useState(true);

  const onSearchSubmit = (newURL) => {
    setUrl(newURL);
    setPage(1);
    // setTimeout(() => {
    //   fetchImages(url + `&page=${page}`);
    // });

  }

  // const fetchImages1 = (url) => {
  //   setIdle(false);
  //   setPandidng(true);
  //   setRejected(false);

  //   fetch(url)
  //     .then((response) => {
  //       console.log(response);
  //       if (!response.ok) {
  //         console.log("SOME ERROR");
  //         setError('Something went wrong');
  //         setPandidng(false);
  //         setRejected(true);
  //         throw new Error(response.statusText);
  //       }
  //       console.log(response.json());
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('logging data from second THEN ', data);
  //       if (data.hits.length === 0) {
  //         setPandidng(false);
  //         setRejected(true);
  //         setResolved(false);
  //         setError('No images were found');

  //       } else {
  //         setImages((images) => [...images, ...data.hits]);
  //         setPandidng(false);
  //         setResolved(true);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setRejected(true);
  //       setError(err);
  //     });
  // }

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    async function fetchImages(url) {
      setIdle(false);
      setPandidng(true);
      setRejected(false);

      try {
        const response = await fetch(url);
        console.log('this is response: ', response);
        if (response.ok) {
          const data = await response.json();
          console.log('data is: ', data);
          if (data.hits.length === 0) {
            setPandidng(false);
            setRejected(true);
            setResolved(false);
            setError('No images were found');

          } else {
            setImages((images) => [...images, ...data.hits]);
            setPandidng(false);
            setResolved(true);

          }
        } else {
          setError('Something went wrong');
          setPandidng(false);
          setRejected(true);
        }

      } catch (err) {
        console.log(err.message);
        setRejected(true);
        setError(err);
      }
    }
    fetchImages(url);
  }, [url, page]);

  const onButtonClick = () => {
    setPage(page + 1);
    // setTimeout(() => {
    //   fetchImages(url + `&page=${page}`);
    // });
  }

  const onImageClick = (imageURL) => {
    setShowModal(true);
    setModalContent(imageURL);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  }



  return (
    <>
      <SearchBar onSubmit={onSearchSubmit} />
      {idle && <h3>Enter what you want to find</h3>}
      {resolved && <ImageGallery images={images} showModal={toggleModal} onImageClick={onImageClick} />}
      {panding && <Modal onClose={toggleModal} >
        <RotatingLines width="100" />
      </Modal>}
      {images.length ? <MoreImagesButton onClick={onButtonClick} /> : null}
      {rejected && <h3>{error}</h3>}
      {showModal && <Modal onClose={toggleModal}>
        <ModalImage src={modalContent} alt="bigImage" />
      </Modal>}
    </>
  );

}

// class App1 {
//   state = {
//     idle: true,
//     panding: false,
//     rejected: false,
//     resolved: false,
//     error: null,

//     images: [],
//     url: '',
//     page: 1,
//     showModal: false,
//     modalContent: '',

//   };

//   onSearchSubmit = (newURL) => {
//     this.setState({
//       url: (newURL),
//       images: []
//     });
//     setTimeout(() => {
//       this.fetchImages(this.state.url + `&page=${this.state.page}`);
//     });
//   }

//   async fetchImages(url) {
//     this.setState({
//       idle: false,
//       panding: true,
//       rejected: false,
//     });
//     try {
//       const response = await fetch(url);
//       if (response.ok) {
//         const data = await response.json();
//         if (data.hits.length === 0) {
//           this.setState({
//             panding: false,
//             rejected: true,
//             resolved: false,
//             error: 'No images were found',
//           });
//         } else {
//           this.setState((prevState) => ({
//             images: [...prevState.images, ...data.hits],
//             panding: false,
//             resolved: true
//           }));
//         }
//       } else {
//         this.setState({
//           error: 'Something went wrong',
//           panding: false,
//           rejected: true,
//         });
//       }

//     } catch (err) {
//       console.log(err.message);
//       this.setState({ rejected: true, error: err });
//     }
//   }

//   onButtonClick = () => {
//     const newPage = this.state.page + 1;
//     this.setState({ page: newPage });
//     setTimeout(() => {
//       this.fetchImages(this.state.url + `&page=${this.state.page}`);
//     });
//   }

//   onImageClick = (imageURL) => {
//     this.setState({
//       showModal: true,
//       modalContent: imageURL
//     });
//   }


//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   }


//   render() {
//     const { idle, panding, rejected, resolved, error, images, showModal, modalContent } = this.state;

//     return (
//       <>
//         <SearchBar onSubmit={this.onSearchSubmit} />
//         {idle && <h3>Enter what you want to find</h3>}
//         {resolved && <ImageGallery images={this.state.images} showModal={this.toggleModal} onImageClick={this.onImageClick} />}
//         {panding && <Modal Modal onClose={this.toggleModal} >
//           <RotatingLines width="100" />
//         </Modal>}
//         {images.length ? <MoreImagesButton onClick={this.onButtonClick} /> : null}
//         {rejected && <h3>{error}</h3>}
//         {showModal && <Modal onClose={this.toggleModal}>
//           <ModalImage src={modalContent} alt="bigImage" />
//         </Modal>}
//       </>
//     );
//   }
// }

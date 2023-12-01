import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import SearchBar from './SearchBar';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27785613-3c730127b1356d079421a0eb8';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
});

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isVisible: false,
    error: null,
    isLoading: false,
    per_page: 12,
    isModalOpen: false,
    modalImage: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page, per_page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      fetch(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&${searchParams}&per_page=${per_page}`
      )
        .then(response => response.json())
        .then(images => {
          if (images.hits.length === 0) {
            toast.error('There are no images');
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            isVisible: page < Math.ceil(images.totalHits / per_page),
          }));
        })
        .catch(error => error)
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSearchSubmit = query => {
    if (this.state.query === query) {
      toast.error(`You already find ${query}`);
      return;
    }

    this.setState({
      query,
      page: 1,
      images: [],
      isVisible: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onClickImage = url => {
    this.setState({
      modalImage: url,
      isModalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, isVisible, isLoading, isModalOpen, modalImage } =
      this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {isVisible && (
          <Button isLoading={isLoading} onClick={this.handleLoadMore} />
        )}
        {isModalOpen && (
          <Modal modalImage={modalImage} onModalClose={this.handleModalClose} />
        )}

        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import Modal from './Modal';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '27785613-3c730127b1356d079421a0eb8';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
});

export class App extends Component {
  state = {
    query: '',
    isLoading: false,
    page: '1',
    per_page: '12',
    error: null,
    images: [],
    isVisible: false,
    isModalOpen: false,
    modalImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, per_page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      fetch(
        `${API_URL}?q=${query}&page=${page}&key=${API_KEY}&${searchParams}&per_page=${per_page}`
      )
        .then(response => response.json())
        .then(images => {
          if (images.hits.length === 0) {
            toast.error('There are no photos');
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
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {isVisible && (
          <LoadMoreBtn isLoading={isLoading} onClick={this.handleLoadMore} />
        )}
        {isModalOpen && (
          <Modal modalImage={modalImage} onModalClose={this.handleModalClose} />
        )}

        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

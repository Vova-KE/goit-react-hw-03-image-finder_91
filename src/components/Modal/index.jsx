import React, { Component } from 'react';
import style from './style.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeCloseModal);
  }

  handleEscapeCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    const { modalImage, tags } = this.props;

    return (
      <div className={style.overlay} onClick={this.handleBackDropClick}>
        <div className={style.modal}>
          <img src={modalImage} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;

import React, { Component } from 'react';
import { toast } from 'react-toastify';
import style from './style.module.css';

class Searchbar extends Component {
  state = {
    inputQuery: '',
  };

  handleInput = event => {
    this.setState({
      inputQuery: event.currentTarget.value.trim().toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputQuery.trim() === '') {
      toast.error('Enter a request');
      return;
    }

    this.props.onSubmit(this.state.inputQuery);
    this.setState({ inputQuery: '' });
  };

  render() {
    const { inputQuery } = this.state;

    return (
      <header className={style.searchBar}>
        <form className={style.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.searchFormButton}>
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              aria-labelledby="searchIconTitle"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
              color="#000"
            >
              <path d="M14.4121122,14.4121122 L20,20" />
              <circle cx="10" cy="10" r="6" />
            </svg>

            <span className={style.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputQuery}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

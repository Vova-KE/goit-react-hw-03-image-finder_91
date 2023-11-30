import React from 'react';
import style from './style.module.css';

const LoadMoreBtn = ({ onClick, isLoading }) => {
  return (
    <div className={style.buttonWrap}>
      <button type="button" className={style.button} onClick={onClick}>
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
};

export default LoadMoreBtn;

import React, { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, data, isLargeRow, isContinueWatching }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 1.5 
        : scrollLeft + clientWidth / 1.5;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      
      <div className="movie-row__container">
        <button className="movie-row__arrow movie-row__arrow--left" onClick={() => handleScroll('left')}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/></svg>
        </button>
        
        <div className="movie-row__posters" ref={rowRef}>
          {data?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isLargeRow={isLargeRow} isContinueWatching={isContinueWatching} />
          ))}
        </div>
        
        <button className="movie-row__arrow movie-row__arrow--right" onClick={() => handleScroll('right')}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;

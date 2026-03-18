import React, { useState } from 'react';
import './MovieCard.css';
import { useAuth } from '../../context/AuthContext';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const MovieCard = ({ movie, isLargeRow, isContinueWatching }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const { user, addToMyList, removeFromMyList } = useAuth();
  
  const isInList = user?.myList?.some(m => m.id === movie.id);

  const handlePlay = () => {
    if (!user) {
      alert("Please sign in to watch!");
      return;
    }
    setShowPlayer(true);
  };

  const handleAddRemove = () => {
    if (!user) {
      alert("Please sign in to add to your list!");
      return;
    }
    if (isInList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  return (
    <div className={`movie-card ${isLargeRow ? 'movie-card--large' : ''} ${isContinueWatching ? 'movie-card--continue' : ''}`}>
      {isLargeRow && (
        <div className="movie-card__n-badge">N</div>
      )}
      <img 
        className="movie-card__image" 
        src={movie.img} 
        alt={movie.title} 
      />
      
      {isContinueWatching && (
        <>
          <div className="movie-card__progress-container">
            <div className="movie-card__progress-bar" style={{ width: `${movie.progress}%` }}></div>
          </div>
          <div className="movie-card__always-visible">
            <h4 className="movie-card__title--small">{movie.title}</h4>
          </div>
        </>
      )}

      <div className="movie-card__overlay">
        {isContinueWatching ? (
          <>
            <h4 className="movie-card__title">{movie.title}</h4>
            <div className="movie-card__meta">
              <span className="movie-card__time-remaining">{movie.timeRemaining || (movie.progress ? `${Math.floor(100 - movie.progress)} min left` : '')}</span>
            </div>
            <div className="movie-card__buttons" style={{ marginTop: 'auto' }}>
              <button className="movie-card__btn movie-card__btn--play movie-card__btn--resume" onClick={handlePlay}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Resume
              </button>
            </div>
          </>
        ) : (
          <>
            <h4 className="movie-card__title">{movie.title}</h4>
            <div className="movie-card__meta">
              {isLargeRow ? (
                <>
                  <span className="movie-card__rating">{movie.rating} Match</span>
                  <span className="movie-card__genre">{movie.genre}</span>
                </>
              ) : (
                <>
                  <span className="movie-card__stars">★★★★★</span>
                  <span className="movie-card__rating">{movie.rating} Match</span>
                </>
              )}
            </div>
            <div className="movie-card__buttons">
              <button className="movie-card__btn movie-card__btn--play" onClick={handlePlay}>
                 <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <button 
                className={`movie-card__btn movie-card__btn--add ${isInList ? 'movie-card__btn--added' : ''}`}
                onClick={handleAddRemove}
              >
                {isInList ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                )}
              </button>
              <button className="movie-card__btn movie-card__btn--like">
                👍
              </button>
            </div>
          </>
        )}
      </div>

      {showPlayer && (
        <VideoPlayer movie={movie} onClose={() => setShowPlayer(false)} />
      )}
    </div>
  );
};

export default MovieCard;

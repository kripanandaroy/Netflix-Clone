import React, { useEffect } from 'react';
import './VideoPlayer.css';

const trailerMap = {
  Mirzapur: 'Wfkt9Di2Cro',
  'Sacred Games': 'zBvJIZBQlEQ',
  Panchayat: 'wzizPLsXA0I',
  'Scam 1992': '4Gm7k3LV0ew',
  'The Family Man': 'n1LMogBm3Hg',
  RRR: 'f_vbAtFSEc0',
  Pathaan: 'vqu4z19F0gY',
  'KGF Chapter 2': 'AhFTRjLiNfo',
  Jawan: 'Zx_2OJOT4DM',
  Animal: 'DPcDuwmxCmg',
  'Stree 2': 'LmfnKjj-rOU',
  Vikram: 'OKBMVP_IgkA',
  Pushpa: '3KCsXnKh7_4',
  Jailer: 'G3Q5KQYlRBo'
};

const VideoPlayer = ({ movie, onClose }) => {
  const videoId = trailerMap[movie.title] || 'dQw4w9WgXcQ';

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className="video-player">
      <div className="video-player__backdrop" onClick={onClose}></div>
      
      <div className="video-player__content">
        <div className="video-player__top-bar">
          <button className="video-player__back-btn" onClick={onClose}>
            <span>←</span> Back
          </button>
          
          <div className="video-player__info-badge">
            <span className="n-logo">N</span>
            <span className="movie-title">{movie.title}</span>
          </div>

          <button className="video-player__fullscreen-btn">
             ⛶
          </button>
        </div>

        <div className="video-player__video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-player__footer">
          <div className="video-player__meta">
            <h2 className="video-player__title">{movie.title}</h2>
            <div className="video-player__stats">
              <span className="match-score">98% Match</span>
              <span className="year">2024</span>
              <span className="maturity-rating">18+</span>
              <span className="quality-badge">HD</span>
            </div>
            <p className="video-player__note">Playing official trailer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

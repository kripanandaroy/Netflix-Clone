import React, { useState, useEffect } from 'react';
import './Hero.css';

import { heroContent } from '../../data/mockData';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (!isHovered) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === heroContent.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered]);

  const activeContent = heroContent[currentIndex];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <header 
      className="hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background images mapped for crossfade effect */}
      {heroContent.map((item, index) => (
        <div 
          key={item.id}
          className={`hero__background ${index === currentIndex ? 'hero__background--active' : ''}`}
        >
          <img src={item.bg} alt={item.title} />
          <div className="hero__gradient"></div>
        </div>
      ))}

      <div className="hero__content" key={activeContent.id}>
        <h1 className="hero__title">{activeContent.title}</h1>
        
        <div className="hero__meta">
          <span className="hero__match">{activeContent.match} Match</span>
          <span className="hero__rating">{activeContent.rating}</span>
          <span className="hero__year">{activeContent.year}</span>
        </div>

        <p className="hero__description">{activeContent.description}</p>

        <div className="hero__buttons">
          <button className="hero__button hero__button--play">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
          <button className="hero__button hero__button--more">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            More Info
          </button>
        </div>
      </div>

      <div className="hero__indicators">
        {heroContent.map((_, index) => (
          <button 
            key={index} 
            className={`hero__dot ${index === currentIndex ? 'hero__dot--active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
};

export default Hero;

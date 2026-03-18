import React from 'react';
import './Card.css';

const Card = ({ item, isLargeRow }) => {
  return (
    <div className={`card ${isLargeRow ? 'card--large' : ''}`}>
      <img 
        className="card__image" 
        src={item.image} 
        alt={item.title} 
      />
      <div className="card__overlay">
        <h4 className="card__title">{item.title}</h4>
        <div className="card__meta">
          <span className="card__match">{item.match}</span>
          <span className="card__rating">{item.rating}</span>
        </div>
        <div className="card__buttons">
          <button className="card__btn card__btn--play">▶</button>
          <button className="card__btn card__btn--add">+</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React, { useRef } from 'react';
import Card from '../Card/Card';
import './Row.css';

const Row = ({ title, data, isLargeRow }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      
      <div className="row__container">
        <button className="row__arrow row__arrow--left" onClick={() => handleScroll('left')}>
          ‹
        </button>
        
        <div className="row__posters" ref={rowRef}>
          {data.map((item) => (
            <Card key={item.id} item={item} isLargeRow={isLargeRow} />
          ))}
        </div>
        
        <button className="row__arrow row__arrow--right" onClick={() => handleScroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
};

export default Row;

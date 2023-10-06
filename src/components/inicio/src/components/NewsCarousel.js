import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import NewsCard from './NewsCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const NewsCarousel = ({ newsList }) => {
  const [index, setIndex] = useState(0);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.stiff,
    onRest: () => {
      // Callback when animation is complete
      // Check if the index is at the end and reset to the beginning
      if (index === newsList.length - 1) {
        setIndex(0);
      }
    },
  });

  const handleNext = () => setIndex((prev) => (prev === newsList.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setIndex((prev) => (prev === 0 ? newsList.length - 1 : prev - 1));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
        <animated.div style={{ ...props, maxWidth: '600px', width: '100%', margin: '0 auto' }}>
          <NewsCard news={newsList[index]} />
        </animated.div>
        <button onClick={handlePrev} style={{ ...arrowStyle, left: -30 }}>
          <FiChevronLeft size={32} />
        </button>
        <button onClick={handleNext} style={{ ...arrowStyle, right: -30 }}>
          <FiChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

const arrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

export default NewsCarousel;

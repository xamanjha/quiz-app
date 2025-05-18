import React from 'react';
import Lottie from 'lottie-react';
import highfiveAnimation from '../animations/highfive.json';
import oopsAnimation from '../animations/oops.json';

const AnimatedCharacter = ({ type }) => {
  const animationData = type === 'success' ? highfiveAnimation : oopsAnimation;
  
  return (
    <div className="w-64 h-64 mx-auto">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
        className="w-full h-full"
      />
    </div>
  );
};

export default AnimatedCharacter; 
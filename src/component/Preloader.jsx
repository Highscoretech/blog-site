import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

const Preloader = () => {
  const theme = useTheme();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: theme.colors.background.main }}
    >
      <div className="relative">
        {/* Outer rotating circle */}
        <div 
          className="w-16 h-16 rounded-full absolute animate-spin"
          style={{ 
            border: `4px solid ${theme.colors.background.main}`,
            borderTopColor: theme.colors.primary,
            animationDuration: '1s'
          }}
        />
        
        {/* Middle pulsing circle */}
        <div 
          className="w-12 h-12 rounded-full absolute animate-pulse"
          style={{ 
            backgroundColor: theme.colors.secondary,
            opacity: 0.7,
            left: '8px',
            top: '8px'
          }}
        />
        
        {/* Inner rotating square */}
        <div 
          className="w-8 h-8 absolute animate-spin"
          style={{ 
            border: `3px solid ${theme.colors.primary}`,
            left: '16px',
            top: '16px',
            animationDuration: '0.5s',
            animationDirection: 'reverse'
          }}
        />
      </div>
      
      {/* Loading text */}
      <div 
        className="absolute mt-24 font-semibold tracking-wider"
        style={{ color: theme.colors.text.primary }}
      >
        <span className="animate-pulse"></span>
      </div>
    </div>
  );
};

export default Preloader;
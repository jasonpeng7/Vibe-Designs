import React from 'react';

const SectionSeparator = () => {
  return (
    <div className="relative w-full h-32 bg-black overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-8">
          <div className="relative">
            {/* Main gradient line */}
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
            
            {/* Animated dots */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-1/4 w-10 h-10 border border-white/40 rotate-45 animate-float"></div>
         <div className="absolute top-8 right-1/4 w-12 h-12 border border-blue-300/40 rotate-45 animate-float" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-6 left-1/3 w-8 h-8 border border-blue-500/40 rotate-12 animate-float" style={{ animationDelay: '1.9s' }}></div>
        <div className="absolute bottom-4 right-1/3 w-10 h-10 border border-purple-500/40 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`,
        }}></div>
      </div>
    </div>
  );
};

export default SectionSeparator;

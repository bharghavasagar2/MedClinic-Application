import React from 'react';

const VideoSection = ({ videoSrc, buttonText, buttonOnClick }) => {
  return (
    <div className="mt-8 relative">
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        className="w-full h-auto rounded-lg"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: '50vh' }}
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded bg-opacity-90" onClick={buttonOnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default VideoSection;

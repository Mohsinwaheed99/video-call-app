const VideoPlayer = ({ videoRef, title, isLocal, isActive }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
        <span className={`w-2 h-2 rounded-full mr-2 ${
          isActive ? 'bg-green-500' : 'bg-gray-400'
        }`}></span>
        {title}
      </h3>
      <div className="aspect-video bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden">
        <video 
          ref={videoRef} 
          muted={isLocal}
          className="w-full h-full object-cover"
        />
        {!isActive && !isLocal && (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <p className="text-xs sm:text-sm">No active call</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
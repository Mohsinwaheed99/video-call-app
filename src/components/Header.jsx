const Header = ({ isConnected }) => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">
        Video Call App
      </h1>
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-3">
        <div className={`flex items-center ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs sm:text-sm font-medium">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <span className="text-gray-600 hidden sm:block">•</span>
        <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
          PeerJS: Video, Audio & Messaging
        </span>
      </div>
      
      {/* GitHub Repository Link */}
      <div className="flex justify-center space-x-4">
        <a 
          href="https://peer-js-video-call.netlify.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm rounded-lg transition duration-200"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          Live Demo
        </a>
        
        <a 
          href="https://github.com/Mohsinwaheed99/video-call-app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-gray-800 hover:bg-gray-900 text-white text-xs sm:text-sm rounded-lg transition duration-200"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
          </svg>
          GitHub Repo
        </a>
      </div>
    </div>
  );
};

export default Header;
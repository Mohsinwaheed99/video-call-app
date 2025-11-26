const Header = ({ isConnected }) => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">
        Video Call App
      </h1>
      <div className="flex items-center justify-center space-x-2 sm:space-x-4">
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
    </div>
  );
};

export default Header;
const CallControls = ({
  call,
  endCall,
  disconnectAll,
  remotePeerIdValue,
  isLoading,
  isCallActive
}) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Call Controls</h2>
      <div className="space-y-3">
        <button 
          onClick={() => call(remotePeerIdValue)}
          disabled={isLoading || isCallActive}
          className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium transition duration-200 text-sm ${
            isLoading || isCallActive
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calling...
            </span>
          ) : 'Start Video Call'}
        </button>

        {isCallActive && (
          <button 
            onClick={endCall}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium transition duration-200 text-sm"
          >
            End Call
          </button>
        )}

        <button 
          onClick={disconnectAll}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-200 text-sm"
        >
          Disconnect All
        </button>
      </div>
    </div>
  );
};

export default CallControls;
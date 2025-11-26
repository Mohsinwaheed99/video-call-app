const ConnectionPanel = ({
  peerId,
  remotePeerIdValue,
  setRemotePeerIdValue,
  connectToPeer,
  copyToClipboard
}) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Connection</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Peer ID
          </label>
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={peerId} 
              readOnly 
              className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-600"
            />
            <button 
              onClick={copyToClipboard}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition duration-200 text-sm"
            >
              Copy
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Connect to Peer
          </label>
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={remotePeerIdValue} 
              onChange={e => setRemotePeerIdValue(e.target.value)}
              placeholder="Enter peer ID..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              onClick={() => connectToPeer(remotePeerIdValue)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg transition duration-200 text-sm"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPanel;
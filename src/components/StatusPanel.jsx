const StatusPanel = ({ isConnected, callStatus, connections, activeCalls }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Status</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Connection:</span>
          <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Call Status:</span>
          <span className="text-sm font-medium text-blue-600">{callStatus}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Active Connections:</span>
          <span className="text-sm font-medium text-gray-600">{connections.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Active Calls:</span>
          <span className="text-sm font-medium text-gray-600">{activeCalls.length}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
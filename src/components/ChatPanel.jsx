const ChatPanel = ({
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  dataConnection,
  messagesEndRef
}) => {
  return (
    <div className="lg:col-span-1 bg-white rounded-xl sm:rounded-2xl shadow-lg flex flex-col h-[400px] sm:h-auto">
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Chat Messages</h3>
        <p className="text-xs sm:text-sm text-gray-600 truncate">
          {dataConnection ? `Connected to: ${dataConnection.peer}` : 'Not connected'}
        </p>
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 sm:p-3 rounded-lg ${
                message.type === 'local'
                  ? 'bg-blue-500 text-white ml-6 sm:ml-8'
                  : message.type === 'remote'
                  ? 'bg-gray-200 text-gray-800 mr-6 sm:mr-8'
                  : 'bg-yellow-100 text-yellow-800 text-center'
              }`}
            >
              {message.type !== 'system' && (
                <div className="text-xs opacity-75 mb-1 truncate">
                  {message.type === 'local' ? 'You' : message.sender}
                </div>
              )}
              <div className="text-xs sm:text-sm break-words">{message.content}</div>
              <div className="text-xs opacity-75 mt-1">{message.timestamp}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-3 sm:p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            disabled={!dataConnection}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            onClick={sendMessage}
            disabled={!dataConnection || !newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
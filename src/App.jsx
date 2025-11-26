import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import ConnectionPanel from './components/ConnectionPanel';
import CallControls from './components/CallControls';
import StatusPanel from './components/StatusPanel';
import VideoFeeds from './components/VideoFeeds';
import ChatPanel from './components/ChatPanel';

function App() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState('Disconnected');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connections, setConnections] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [dataConnection, setDataConnection] = useState(null);
  const [activeCalls, setActiveCalls] = useState([]);

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const messagesEndRef = useRef(null);

  const addMessage = (type, content, sender = '') => {
    const message = {
      id: Date.now(),
      type,
      content,
      sender,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, message]);
  };

  const endCall = () => {
    if (currentUserVideoRef.current?.srcObject) {
      currentUserVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }

    activeCalls.forEach(call => call.close());
    setActiveCalls([]);

    setIsCallActive(false);
    setCallStatus('Call Ended');
  };

  const disconnectAll = () => {
    endCall();
    connections.forEach(conn => conn.close());
    setConnections([]);
    setDataConnection(null);
    setMessages([]);
  };

  const handleIncomingCall = (call) => {
    const getUserMedia = navigator.mediaDevices.getUserMedia || 
      navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        
        call.answer(mediaStream);
        setActiveCalls(prev => [...prev, call]);
        
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
          setIsCallActive(true);
          setCallStatus('Call Connected');
        });

        call.on('close', () => {
          endCall();
        });

        call.on('error', (err) => {
          console.error('Call error:', err);
          setCallStatus('Call Error');
        });
      })
      .catch((err) => {
        console.error('Media error:', err);
        setCallStatus('Media Access Denied');
      });
  };

  const handleIncomingData = (data, fromPeer) => {
    if (data.type === 'message') {
      addMessage('remote', data.content, fromPeer);
    }
  };

  const handleDataConnection = (conn) => {
    conn.on('open', () => {
      setConnections(prev => [...prev, conn]);
      setDataConnection(conn);
      addMessage('system', `Connected to ${conn.peer}`);
    });

    conn.on('data', (data) => {
      handleIncomingData(data, conn.peer);
    });

    conn.on('close', () => {
      setConnections(prev => prev.filter(c => c !== conn));
      addMessage('system', `Disconnected from ${conn.peer}`);
    });

    conn.on('error', (err) => {
      console.error('Data connection error:', err);
    });
  };

  useEffect(() => {
    const initializePeer = () => {
      const groupName = uuidv4();
      
      const peer = new Peer(groupName, {
        debug: 2,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      peer.on('open', () => {
        setPeerId(groupName);
        setCallStatus('Ready');
        setIsConnected(true);
      });

      peer.on('call', (call) => {
        setCallStatus('Incoming call...');
        handleIncomingCall(call);
      });

      peer.on('connection', (conn) => {
        handleDataConnection(conn);
      });

      peer.on('error', (err) => {
        console.error('PeerJS error:', err);
        setCallStatus('Connection Error');
        setIsConnected(false);
      });

      peer.on('disconnected', () => {
        setIsConnected(false);
        setCallStatus('Disconnected');
      });

      peerInstance.current = peer;
    };

    initializePeer();

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
    };
  }, []);
  
  const connectToPeer = (remotePeerId) => {
    if (!remotePeerId || remotePeerId === peerId) {
      alert('Please enter a valid peer ID');
      return;
    }

    try {
      const conn = peerInstance.current.connect(remotePeerId, {
        reliable: true,
        serialization: 'json'
      });
      handleDataConnection(conn);
    } catch (err) {
      console.error('Connection error:', err);
      alert('Failed to connect to peer');
    }
  };

  const call = (remotePeerId) => {
    if (!remotePeerId) {
      alert('Please enter a peer ID');
      return;
    }

    setIsLoading(true);
    setCallStatus('Calling...');

    const getUserMedia = navigator.mediaDevices.getUserMedia || 
      navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);
        setActiveCalls(prev => [...prev, call]);

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
          setIsCallActive(true);
          setIsLoading(false);
          setCallStatus('Call Connected');
        });

        call.on('close', () => {
          endCall();
        });

        call.on('error', (err) => {
          console.error('Call error:', err);
          setCallStatus('Call Failed');
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.error('Media error:', err);
        setCallStatus('Media Access Denied');
        setIsLoading(false);
      });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !dataConnection) return;

    const messageData = {
      type: 'message',
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: peerId
    };

    dataConnection.send(messageData);
    addMessage('local', newMessage);
    setNewMessage('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(peerId);
    alert('Peer ID copied to clipboard!');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-2 sm:py-8 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <Header isConnected={isConnected} />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            <ConnectionPanel
              peerId={peerId}
              remotePeerIdValue={remotePeerIdValue}
              setRemotePeerIdValue={setRemotePeerIdValue}
              connectToPeer={connectToPeer}
              copyToClipboard={copyToClipboard}
            />
            
            <CallControls
              call={call}
              endCall={endCall}
              disconnectAll={disconnectAll}
              remotePeerIdValue={remotePeerIdValue}
              isLoading={isLoading}
              isCallActive={isCallActive}
            />
            
            <StatusPanel
              isConnected={isConnected}
              callStatus={callStatus}
              connections={connections}
              activeCalls={activeCalls}
            />
          </div>

          <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <VideoFeeds
              currentUserVideoRef={currentUserVideoRef}
              remoteVideoRef={remoteVideoRef}
              isCallActive={isCallActive}
            />
            
            <ChatPanel
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              dataConnection={dataConnection}
              messagesEndRef={messagesEndRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
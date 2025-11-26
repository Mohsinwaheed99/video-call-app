import VideoPlayer from './VideoPlayer';

const VideoFeeds = ({ currentUserVideoRef, remoteVideoRef, isCallActive }) => {
  return (
    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
      <VideoPlayer
        videoRef={currentUserVideoRef}
        title="Your Camera"
        isLocal={true}
        isActive={true}
      />
      
      <VideoPlayer
        videoRef={remoteVideoRef}
        title={isCallActive ? 'Remote User' : 'Waiting for connection...'}
        isLocal={false}
        isActive={isCallActive}
      />
    </div>
  );
};

export default VideoFeeds;
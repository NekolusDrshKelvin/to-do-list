import { useEffect, useState } from 'react';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatFullDateTime = () => {
    return currentTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center">
      <div className="text-5xl font-mono font-bold mb-2 tracking-wider">
        {formatTime()}
      </div>
      <div className="text-lg text-gray-300 font-medium">
        {formatFullDateTime()}
      </div>
    </div>
  );
}

export default Clock;
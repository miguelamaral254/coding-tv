import React, { useEffect, useState } from 'react';

interface Channel {
  id: number;
  name: string;
  path: string;
}

interface TVScreenProps {
  channel: number;
  isOn: boolean;
}

const TVScreen: React.FC<TVScreenProps> = ({ channel, isOn }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | undefined>(undefined);

  useEffect(() => {
    const fetchChannels = async () => {
      const data: Channel[] = [
        { id: 1, name: "Globo", path: "images/globo.jpeg" },
        { id: 2, name: "Record TV", path: "images/record.jpeg" },
        { id: 3, name: "Tv Band", path: "images/band.jpeg" }
      ];
      setChannels(data);
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    setCurrentChannel(channels.find((ch) => ch.id === channel));
  }, [channel, channels]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {isOn ? (
        currentChannel ? (
          <img
            src={currentChannel.path}
            alt={currentChannel.name}
            className="max-w-full max-h-full"
          />
        ) : (
          <div className="text-white">Loading...</div>
        )
      ) : (
        <div className="text-white">No Signal</div>
      )}
    </div>
  );
};

export default TVScreen;

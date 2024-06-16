import React, { useState } from 'react';
import TV from '../types/tv';
import TVScreen from './TvScreen';

const tv = new TV();

const RemoteControl: React.FC = () => {
  const [status, setStatus] = useState(tv.getStatus());
  const [inputChannel, setInputChannel] = useState<number | null>(null);

  const handleTurnOnOff = () => {
    tv.turnOnOff();
    setStatus(tv.getStatus());
  };

  const handleIncreaseVolume = () => {
    tv.increaseVolume();
    setStatus(tv.getStatus());
  };

  const handleDecreaseVolume = () => {
    tv.decreaseVolume();
    setStatus(tv.getStatus());
  };

  const handleNextChannel = () => {
    tv.setChannel(status.channel + 1);
    setStatus(tv.getStatus());
  };

  const handlePrevChannel = () => {
    tv.setChannel(status.channel - 1);
    setStatus(tv.getStatus());
  };

  const handleSetChannel = () => {
    if (inputChannel !== null) {
      tv.setChannel(inputChannel);
      setStatus(tv.getStatus());
      setInputChannel(null);
    }
  };

  const handleNumericInput = (num: number) => {
    setInputChannel((prev) => (prev !== null ? Number(`${prev}${num}`) : num));
  };

  const handleBackspace = () => {
    setInputChannel((prev) => {
      if (prev === null) return null;
      const str = prev.toString();
      const newStr = str.slice(0, -1);
      return newStr ? Number(newStr) : null;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 h-64 bg-gray-900 rounded-md overflow-hidden mb-4">
        <TVScreen channel={status.channel} isOn={status.isOn} />
      </div>
      <div className="p-4 bg-gray-800 text-white rounded-md w-48">
        <h2 className="text-xl mb-4">Remote Control</h2>
        <div className="mb-2">TV is {status.isOn ? "ON" : "OFF"}</div>
        <div className="mb-2">Channel: {status.channel}</div>
        <div className="mb-4">Volume: {status.volume}</div>
        <button className="px-2 py-1 bg-blue-500 rounded mr-2 mb-2" onClick={handleTurnOnOff}>
          Turn {status.isOn ? "Off" : "On"}
        </button>
        <button className="px-2 py-1 bg-blue-500 rounded mr-2 mb-2" onClick={handleIncreaseVolume}>
          Vol +
        </button>
        <button className="px-2 py-1 bg-blue-500 rounded mr-2 mb-2" onClick={handleDecreaseVolume}>
          Vol -
        </button>
        <button className="px-2 py-1 bg-blue-500 rounded mr-2 mb-2" onClick={handlePrevChannel}>
          Prev
        </button>
        <button className="px-2 py-1 bg-blue-500 rounded mr-2 mb-2" onClick={handleNextChannel}>
          Next
        </button>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              className="px-2 py-1 bg-blue-500 rounded"
              onClick={() => handleNumericInput(num)}
            >
              {num}
            </button>
          ))}
        </div>
        <button className="px-2 py-1 bg-blue-500 rounded mt-4" onClick={handleBackspace}>
          Backspace
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded mt-4" onClick={handleSetChannel}>
          Set Channel
        </button>
        <input
          type="number"
          placeholder="Channel"
          className="px-2 py-1 rounded mr-2 text-black mt-4 w-full"
          value={inputChannel !== null ? inputChannel : ""}
          onChange={(e) => setInputChannel(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default RemoteControl;

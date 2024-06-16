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
      <div className={`w-64 h-64 bg-gray-900 rounded-md overflow-hidden mb-4 relative ${status.isOn ? 'bg-green-500' : 'bg-red-500'}`}>
        <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
        <TVScreen channel={status.channel} isOn={status.isOn} />
      </div>
            <h2 className="text-xl mb-4">Remote Control</h2>
      <div className="p-4 bg-gray-800 text-white rounded-md w-48 relative">
            <button className="flex py-2 px-3" onClick={handleTurnOnOff}>
      <img src="/btns/controlbtn.svg" className="h-6 w-6 mr-2" alt="Control Button" />
      
    </button>



        <div className='bg-black p-2'>
        <div className={`mb-2 ${status.isOn ? 'bg-green-500' : 'bg-red-500'} p-2 text-white rounded-md`}>
  TV is {status.isOn ? "ON" : "OFF"}
</div>

            <div className="mb-2">Channel: {status.channel}</div>
            <div className="mb-4">Volume: {status.volume}</div>
                <input
                  type="number"
                  placeholder="Channel"
                  className="px-2 py-1 rounded mr-2 text-black mt-4 w-full"
                  value={inputChannel !== null ? inputChannel : ""}
                  onChange={(e) => setInputChannel(Number(e.target.value))}
                />
        </div>
        <div className="flex justify-between p-3">
          <button className="p-2 bg-blue-500 rounded  w-ful" onClick={handleSetChannel}>
            Set Channel
          </button>
          <button className="p-2 bg-blue-500 rounded" onClick={handleBackspace}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Backspace
          </button>
        </div>
        <div className='flex w-full justify-between'>
            <div className='flex flex-col items-center py-5'>
                <button className="control-button" onClick={handleIncreaseVolume}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <h2>Vol</h2>
                <button  className="pt-2" onClick={handleDecreaseVolume}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
            </div>
            <div className='flex flex-col items-center py-5'>
                <button className="control-button" onClick={handleNextChannel}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <h2>Channel</h2>
                <button className="pt-2" onClick={handlePrevChannel}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
    <button
      key={num}
      className={`px-2 py-1 bg-blue-500 rounded control-button ${num === 0 ? 'col-span-3' : ''}`}
      onClick={() => handleNumericInput(num)}
    >
      {num}
    </button>
  ))}
</div>

      </div>
    </div>
  );
};

export default RemoteControl;

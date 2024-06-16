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
      <div className="q-full p-4 bg-gray-800 text-white rounded-md w-48 relative">
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
        <div className="flex w-full justify-between py-4 gap-1">
          <button className="p-2 bg-blue-500 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
              <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h18v-10h3zm-5 8h-14v-10.26l7-6.912 7 6.99v10.182zm-5-1h-4v-6h4v6z" />
            </svg>
          </button>
          <button className="p-2 bg-blue-500 rounded" onClick={handleBackspace}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
              <path d="m22 6c0-.552-.448-1-1-1h-12.628c-.437 0-.853.191-1.138.523-1.078 1.256-3.811 4.439-4.993 5.815-.16.187-.241.419-.241.651 0 .231.08.463.24.651 1.181 1.38 3.915 4.575 4.994 5.835.285.333.701.525 1.14.525h12.626c.552 0 1-.448 1-1 0-2.577 0-9.423 0-12zm-13.628.5h12.128v11h-12.126l-4.715-5.51zm5.637 4.427 1.71-1.71c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.384-.219.531l-1.711 1.711 1.728 1.728c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.384-.073-.531-.219l-1.728-1.729-1.728 1.729c-.146.146-.339.219-.531.219-.401 0-.75-.324-.75-.751 0-.191.073-.383.22-.53l1.728-1.728-1.788-1.787c-.146-.148-.219-.339-.219-.532 0-.425.346-.749.751-.749.192 0 .384.073.53.219z" />
            </svg>
          </button>
        </div>

        <div className='flex w-full flex-col items-center justify-center'>
          <button className="bg-blue-500 rounded-full mb-1" onClick={handleIncreaseVolume}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <div className='flex'>
            <button className="bg-blue-500 rounded-full mr-1" onClick={handlePrevChannel}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 bg-blue-500 rounded-full h-full  w-ful" onClick={handleSetChannel}>
              O
            </button>
            <button className="bg-blue-500 rounded-full ml-1" onClick={handleNextChannel}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <button className="bg-blue-500 rounded-full mt-1" onClick={handleDecreaseVolume}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex px-3 flex-col items-center bg-blue-500 rounded py-5'>
            <button className="" onClick={handleIncreaseVolume}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <h2>Vol</h2>
            <button className="pt-2" onClick={handleDecreaseVolume}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className='flex flex-col items-center bg-blue-500 rounded py-5'>
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
          <div className='flex w-full h-20 items-center justify-center'>
            <h3>Senac control</h3>
          </div>
      </div>
    </div>
  );
};

export default RemoteControl;
